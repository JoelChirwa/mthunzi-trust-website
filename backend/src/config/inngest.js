import { Inngest } from "inngest";
import connectDB from "./db.js";
import User from "../models/userModel.js";
import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import { Resend } from "resend";
import { env } from "./env.js";

export const inngest = new Inngest({
  id: "mthunzi-trust",
  eventKey: env.INNGEST_EVENT_KEY,
});

// Initialize Resend with API Key from environment variables
const resend = new Resend(env.RESEND_API_KEY);

// For testing on unverified domains, Resend requires 'onboarding@resend.dev'
const FROM_EMAIL = env.FROM_EMAIL || "onboarding@resend.dev";
const FROM_NAME = "Mthunzi Trust";

if (!env.RESEND_API_KEY) {
  console.warn("⚠️ Warning: RESEND_API_KEY is missing in .env");
}

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0].email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
      imageUrl: image_url,
    };

    await User.findOneAndUpdate({ clerkId: id }, newUser, { upsert: true });
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;

    await User.deleteOne({ clerkId: id });
  }
);

// Email Template Wrapper
const emailLayout = (content) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #1e3a8a; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">Mthunzi Trust</h1>
      <p style="color: #10b981; font-weight: bold; margin: 5px 0 0 0; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">The Umbrella of Hope</p>
    </div>
    <div style="line-height: 1.6;">
      ${content}
    </div>
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
      <p>This is an automated message from the Mthunzi Trust Recruitment Portal.</p>
      <p>&copy; ${new Date().getFullYear()} Mthunzi Trust. All rights reserved.</p>
    </div>
  </div>
`;

// Send confirmation email when application is submitted
const sendApplicationConfirmation = inngest.createFunction(
  { id: "send-application-confirmation" },
  { event: "application/submitted" },
  async ({ event }) => {
    const { applicationId } = event.data;
    console.log(`[Inngest] 📩 Triggered confirmation for: ${applicationId}`);

    await connectDB();
    const application = await Application.findById(applicationId).populate(
      "jobId"
    );

    if (!application) {
      console.error("[Inngest] ❌ Application not found:", applicationId);
      return;
    }

    try {
      console.log(
        `[Inngest] 📤 Attempting to send email to: ${application.email}`
      );
      const data = await resend.emails.send({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: application.email,
        subject: `Application Received - ${application.jobId.title}`,
        html: emailLayout(`
          <h2 style="color: #1e3a8a;">Dear ${application.fullName},</h2>
          <p>Thank you for applying for the position of <strong>${
            application.jobId.title
          }</strong> at Mthunzi Trust.</p>
          <p>We have received your application materials and our recruitment team will review them carefully. We appreciate your interest in joining our mission.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #64748b;">Application Summary</h3>
            <p style="margin: 5px 0;"><strong>Position:</strong> ${
              application.jobId.title
            }</p>
            <p style="margin: 5px 0;"><strong>Submitted:</strong> ${new Date(
              application.createdAt
            ).toLocaleDateString()}</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> Pending Review</p>
          </div>

          <p>You can expect to hear from us within 5-7 working days regarding the next steps in the selection process.</p>
          <p>Best regards,<br/><strong>Mthunzi Trust Team</strong></p>
        `),
      });
      console.log("[Inngest] ✅ Resend response:", data);
    } catch (error) {
      console.error("[Inngest] ❌ Failed to send confirmation email:", error);
    }
  }
);

// Notify applicant when status changes
const sendStatusUpdateEmail = inngest.createFunction(
  { id: "send-status-update" },
  { event: "application/status-updated" },
  async ({ event }) => {
    const { applicationId, newStatus } = event.data;
    console.log(
      `[Inngest] 📩 Triggered status update (${newStatus}) for: ${applicationId}`
    );

    await connectDB();
    const application = await Application.findById(applicationId).populate(
      "jobId"
    );

    if (!application) {
      console.error("[Inngest] ❌ Application not found:", applicationId);
      return;
    }

    // Only send emails for significant status changes
    if (["shortlisted", "accepted", "rejected"].includes(newStatus)) {
      let subject = `Application Update - ${application.jobId.title}`;
      let content = "";

      if (newStatus === "shortlisted") {
        subject = `Great News! You've been Shortlisted - ${application.jobId.title}`;
        content = `
          <h2 style="color: #1e3a8a;">Dear ${application.fullName},</h2>
          <p><strong>Great news!</strong> We are pleased to inform you that your application for the position of <strong>${application.jobId.title}</strong> has been shortlisted.</p>
          <p>Your qualifications and experience stand out, and we would like to move forward with the next stage of the selection process.</p>
          <p>Our HR team will contact you shortly to schedule an interview and provide further details.</p>
          <p>Congratulations and we look forward to speaking with you!</p>
        `;
      } else if (newStatus === "accepted") {
        subject = `Job Offer: ${application.jobId.title} - Mthunzi Trust`;
        content = `
          <h2 style="color: #1e3a8a;">Dear ${application.fullName},</h2>
          <p><strong>Congratulations!</strong> We are delighted to offer you the position of <strong>${application.jobId.title}</strong> at Mthunzi Trust.</p>
          <p>We were very impressed with your performance during the interview process and believe you will be a valuable addition to our team.</p>
          <p>You will receive a separate email shortly with your formal offer letter and onboarding instructions. We look forward to working with you!</p>
        `;
      } else if (newStatus === "rejected") {
        content = `
          <h2 style="color: #1e3a8a;">Dear ${application.fullName},</h2>
          <p>Thank you for your interest in the position of <strong>${application.jobId.title}</strong> at Mthunzi Trust and for the time you invested in the application process.</p>
          <p>After careful consideration of all applications, we regret to inform you that we have decided to move forward with other candidates whose backgrounds more closely match our current requirements.</p>
          <p>We appreciate your interest in Mthunzi Trust and wish you the very best in your future career endeavors.</p>
        `;
      }

      try {
        console.log(
          `[Inngest] 📤 Attempting to send status email to: ${application.email}`
        );
        const data = await resend.emails.send({
          from: `${FROM_NAME} <${FROM_EMAIL}>`,
          to: application.email,
          subject: subject,
          html: emailLayout(
            content +
              `<p>Best regards,<br/><strong>Mthunzi Trust Team</strong></p>`
          ),
        });
        console.log("[Inngest] ✅ Resend response:", data);
      } catch (error) {
        console.error(`[Inngest] ❌ Failed to send ${newStatus} email:`, error);
      }
    } else {
      console.log(
        `[Inngest] ℹ️ Skipping email for minor status change: ${newStatus}`
      );
    }
  }
);

export const functions = [
  syncUser,
  deleteUserFromDB,
  sendApplicationConfirmation,
  sendStatusUpdateEmail,
];
