import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected successfully");
    } catch (err) {
        console.error("Database connection error:", err.message);
        process.exit(1);
    }
};

export default connectDb;