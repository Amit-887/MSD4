import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/userModel.js";
import bcrypt from "bcryptjs";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Successfully connected to MongoDB 👍`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";
    const adminUsername = "Admin";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      // Update existing user to admin if not already
      if (!existingAdmin.isAdmin) {
        existingAdmin.isAdmin = true;
        await existingAdmin.save();
        console.log(`✅ Updated existing user to admin`);
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
      } else {
        console.log(`✅ Admin user already exists`);
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
      }
    } else {
      // Create new admin user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);
      
      const adminUser = await User.create({
        username: adminUsername,
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true,
      });

      console.log("✅ Admin user created successfully!");
      console.log(`Email: ${adminEmail}`);
      console.log(`Password: ${adminPassword}`);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }
};

seedAdmin();

