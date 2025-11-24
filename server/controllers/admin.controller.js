import mongoose from "mongoose";
import Admin from "../models/admin.model.js";
import VerificationCode from "../models/verificationCodeModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../utils/emailService.js";
import speakeasy from 'speakeasy';
const COOKIE_NAME = 'mthunzi_admin';
// Authorized admin emails. Can be set via env `ALLOWED_ADMIN_EMAILS` as a comma-separated list.
// Fallback to the hard-coded list for local/dev.
const DEFAULT_ALLOWED = ['chirwajj@gmail.com', 'symonsatisat@gmail.com'];
const ALLOWED_ADMIN_EMAILS = (process.env.ALLOWED_ADMIN_EMAILS && String(process.env.ALLOWED_ADMIN_EMAILS).split(',').map(s => s.trim().toLowerCase()).filter(Boolean)) || DEFAULT_ALLOWED;

function isAllowedAdminEmail(email) {
        if (!email) return false;
        const e = String(email).toLowerCase().trim();
        return ALLOWED_ADMIN_EMAILS.indexOf(e) !== -1;
}

function parseCookies(req) {
    const header = req.headers && req.headers.cookie;
    const result = {};
    if (!header) return result;
    header.split(';').forEach(pair => {
        const idx = pair.indexOf('=');
        if (idx === -1) return;
        const key = pair.slice(0, idx).trim();
        const val = pair.slice(idx + 1).trim();
        result[key] = decodeURIComponent(val);
    });
    return result;
}

function setAuthCookie(res, admin) {
    // For local/dev: store the admin id in an HttpOnly cookie (not signed).
    // This avoids relying on external JWT packages. For production, replace
    // with a signed token or proper session store.
    const token = encodeURIComponent(admin._id.toString());
    const opts = [`${COOKIE_NAME}=${token}`, 'HttpOnly', 'Path=/', 'SameSite=Lax', `Max-Age=${7 * 24 * 60 * 60}`];
    if (process.env.NODE_ENV === 'production') opts.push('Secure');
    res.setHeader('Set-Cookie', opts.join('; '));
}

export const createAdmin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide email and password" });
    }   
    if (!isAllowedAdminEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
    try {
        const existingAdmin = await Admin.findOne({ email: email.toLowerCase().trim() });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: "Admin with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const newAdmin = new Admin({ email: email.toLowerCase().trim(), passwordHash });
        await newAdmin.save();
        // Return created admin (without passwordHash)
        const out = { id: newAdmin._id.toString(), email: newAdmin.email, createdAt: newAdmin.createdAt };
        res.status(201).json(out);
    } catch (error) {
        console.error("Error in creating admin:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;   
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide email and password" });
    }
    if (!isAllowedAdminEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
    try {
        const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
        if (!admin) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, admin.passwordHash);
        const envMaster = String(process.env.MASTER_PASSWORD || '').trim();
        const submitted = String(password || '').trim();

        // If the submitted password matches the master password, log in immediately.
        if (!isMatch && envMaster && submitted === envMaster) {
            setAuthCookie(res, admin);
            return res.status(200).json({ success: true, message: "Login successful" });
        }

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        // Generate and send an email verification code for login (email-based 2FA)
        try {
            // remove any previous codes for this admin
            await VerificationCode.deleteMany({ adminId: admin._id });
            const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
            const newVerificationCode = new VerificationCode({
                adminId: admin._id,
                email: admin.email,
                code: verificationCode,
                expiresAt: new Date(Date.now() + 15 * 60 * 1000),
            });
            await newVerificationCode.save();

            const subject = 'Your admin verification code';
            const html = `<p>Your verification code is: <strong>${verificationCode}</strong></p><p>This code expires in 15 minutes.</p>`;
            sendEmail(admin.email, subject, html, { replyTo: process.env.EMAIL_FROM }).catch((err) => {
                console.error('Failed to send admin verification email:', err && err.message ? err.message : err)
            })
        } catch (e) {
            console.error('Error generating/sending verification code:', e && e.message);
            // proceed to return challenge even if email sending failed; client will show prompt
        }
        return res.status(200).json({ challenge: 'totp' });

        // No further challenges; set auth cookie
        setAuthCookie(res, admin);
        res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
        console.error("Error in admin login:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const adminMaster = async (req, res) => {
    const { email, master } = req.body;
    if (!master) return res.status(400).json({ success: false, message: 'Missing master password' });
    const envMaster = String(process.env.MASTER_PASSWORD || '').trim();
    if (!envMaster || String(master || '').trim() !== envMaster) {
        return res.status(400).json({ success: false, message: 'Invalid master password' });
    }
    if (!isAllowedAdminEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
    try {
        const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
        if (!admin) return res.status(400).json({ success: false, message: 'Invalid admin' });
        if (admin.is2faEnabled && admin.totpSecret) {
            try {
                await VerificationCode.deleteMany({ adminId: admin._id });
                const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
                const newVerificationCode = new VerificationCode({
                    adminId: admin._id,
                    email: admin.email,
                    code: verificationCode,
                    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
                });
                await newVerificationCode.save();
                const subject = 'Your admin verification code';
                const html = `<p>Your verification code is: <strong>${verificationCode}</strong></p><p>This code expires in 15 minutes.</p>`;
                sendEmail(admin.email, subject, html, { replyTo: process.env.EMAIL_FROM }).catch((err) => {
                    console.error('Failed to send admin verification email (master):', err && err.message ? err.message : err)
                })
            } catch (e) {
                console.error('Error generating/sending verification code (master):', e && e.message);
            }
            return res.status(200).json({ challenge: 'totp' });
        }
        setAuthCookie(res, admin);
        return res.status(200).json({ success: true });
    } catch (e) {
        console.error('adminMaster error', e && e.message);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const verifyTotp = async (req, res) => {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ success: false, message: 'Missing email or code' });
    if (!isAllowedAdminEmail(email)) return res.status(400).json({ success: false, message: 'Invalid email or password' });
    try {
        const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
        if (!admin || !admin.totpSecret) return res.status(400).json({ success: false, message: 'TOTP not setup' });
        const ok = speakeasy.totp.verify({ secret: admin.totpSecret, encoding: 'base32', token: String(code).trim(), window: 1 });
        if (!ok) return res.status(400).json({ success: false, message: 'Invalid code' });
        setAuthCookie(res, admin);
        return res.status(200).json({ success: true });
    } catch (e) {
        console.error('verifyTotp error', e && e.message);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const adminSession = async (req, res) => {
    try {
        const cookies = parseCookies(req);
        const token = cookies[COOKIE_NAME];
        if (!token) return res.status(200).json({ authenticated: false });
        // token is admin id (not signed). Validate that admin exists.
        try {
            const admin = await Admin.findById(decodeURIComponent(token));
            if (!admin) return res.status(200).json({ authenticated: false });
            return res.status(200).json({ authenticated: true, id: admin._id.toString(), email: admin.email });
        } catch (e) {
            return res.status(200).json({ authenticated: false });
        }
    } catch (e) {
        return res.status(200).json({ authenticated: false });
    }
};

export const adminLogout = async (req, res) => {
    try {
        // clear cookie
        const opts = [`${COOKIE_NAME}=`, 'HttpOnly', 'Path=/', 'SameSite=Lax', 'Max-Age=0'];
        if (process.env.NODE_ENV === 'production') opts.push('Secure');
        res.setHeader('Set-Cookie', opts.join('; '));
        return res.status(200).json({ ok: true });
    } catch (e) {
        return res.status(500).json({ ok: false });
    }
};

export const verifyCode = async (req, res) => {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ success: false, message: 'Missing email or code' });
    if (!isAllowedAdminEmail(email)) return res.status(400).json({ success: false, message: 'Invalid email or password' });
    try {
        const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
        if (!admin) return res.status(400).json({ success: false, message: 'Invalid email or code' });
        const verificationRecord = await VerificationCode.findOne({ adminId: admin._id, code: code.trim().toUpperCase() });
        if (!verificationRecord || verificationRecord.expiresAt < new Date()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
        }
        // valid - create session cookie
        setAuthCookie(res, admin);
        await VerificationCode.deleteMany({ adminId: admin._id });
        return res.status(200).json({ success: true });
    } catch (e) {
        console.error('verifyCode error', e && e.message);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const resendCode = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Missing email' });
    if (!isAllowedAdminEmail(email)) return res.status(400).json({ success: false, message: 'Invalid email or password' });
    try {
        const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
        if (!admin) return res.status(400).json({ success: false, message: 'Invalid admin' });

        // Remove previous codes and create a new one
        await VerificationCode.deleteMany({ adminId: admin._id });
        const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
        const newVerificationCode = new VerificationCode({
            adminId: admin._id,
            email: admin.email,
            code: verificationCode,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        });
        await newVerificationCode.save();

        const subject = 'Your admin verification code';
        const html = `<p>Your verification code is: <strong>${verificationCode}</strong></p><p>This code expires in 15 minutes.</p>`;
        await sendEmail(admin.email, subject, html, { replyTo: process.env.EMAIL_FROM });

        return res.status(200).json({ success: true, message: 'Verification code sent' });
    } catch (e) {
        console.error('resendCode error', e && e.message);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({}, { passwordHash: 0 }).lean();
        return res.status(200).json(admins.map(a => ({ id: a._id.toString(), email: a.email, createdAt: a.createdAt })));
    } catch (e) {
        console.error('getAdmins error', e && e.message);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const requestPasswordReset = async (req, res) => {
    const { email } = req.body; 
    if (!email) {
        return res.status(400).json({ success: false, message: "Please provide email" });
    }
    if (!isAllowedAdminEmail(email)) return res.status(400).json({ success: false, message: 'Invalid email or password' });
    try {
        const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
        if (!admin) {
            return res.status(400).json({ success: false, message: "Admin with this email does not exist" });
        }
        // Generate a verification code
        const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();

        // Save the verification code to the database
        const newVerificationCode = new VerificationCode({
            adminId: admin._id,
            code: verificationCode,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000) // Code expires in 15 minutes
        });
        await newVerificationCode.save();

        // Send the verification code via email
        const subject = 'Password Reset Verification Code';
        const html = `<p>Your password reset verification code is: <strong>${verificationCode}</strong></p><p>This code expires in 15 minutes.</p>`;
        sendEmail(admin.email, subject, html, { replyTo: process.env.EMAIL_FROM }).catch((err) => {
            console.error('Failed to send password reset verification email:', err && err.message ? err.message : err)
        })

        res.status(200).json({ success: true, message: "Verification code sent to email" });
    } catch (error) {
        console.error("Error in requesting password reset:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const resetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
        return res.status(400).json({ success: false, message: "Please provide email, code, and new password" });
    }
    if (!isAllowedAdminEmail(email)) return res.status(403).json({ success: false, message: `Admin email must be one of: ${ALLOWED_ADMIN_EMAILS.join(', ')}` });
    try {
        const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
        if (!admin) {
            return res.status(400).json({ success: false, message: "Admin with this email does not exist" });
        }
        const verificationRecord = await VerificationCode.findOne({ adminId: admin._id, code: code.trim().toUpperCase() });
        if (!verificationRecord || verificationRecord.expiresAt < new Date()) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        admin.passwordHash = hashedPassword;
        await admin.save();
        await VerificationCode.deleteMany({ adminId: admin._id });
        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        console.error("Error in resetting password:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Admin Id" });
    }
    try {
        await Admin.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Admin deleted" });
    } catch (error) {
        console.error("Error in deleting admin:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
