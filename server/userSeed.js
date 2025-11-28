import { connect } from 'mongoose';
import Admin from './models/admin.model.js';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const userRegister = async () => {
    try {
        await connectDB();
        const hashedPassword = await bcrypt.hash("kagawa2020", 10);
        const newUser = new Admin({
            name: "admin",
            email: "chirwajj@gmail.com",
            password: hashedPassword,
            role: "admin",
        });
        await newUser.save();
        console.log("User registered successfully");
        process.exit(0);
    } catch (error) {
        console.log("User registration failed:", error);
        process.exit(1);
    }
}

userRegister();