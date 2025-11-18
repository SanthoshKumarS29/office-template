import mongoose from "mongoose";

const connectDb = async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/office_site')
        console.log('db has succussfully connected');
    } catch (err) {
        console.error("have a error check you code: ", err.message);
        process.exit(1);
    }
};

export default connectDb;