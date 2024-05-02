import mongoose from "mongoose";

const DBConnection = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URI as string).catch((err) => {
        throw new Error(`MongoDB connection error: ${err}`);
    })
    console.log(`MongoDB connected: ${connection.connection.host}`);
}

export default DBConnection;
