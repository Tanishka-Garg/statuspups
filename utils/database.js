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
            dbName: "share prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log("mongodb connected")
    } catch (error) {
        console.log(error)
    }
}