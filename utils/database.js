import mongoose from "mongoose";

// to check the connection status
let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("mongoDb is connected");
        return;
    }
    
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log("mongodb connected")
        console.log("MongoDB connected to:", process.env.MONGODB_URI);
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}