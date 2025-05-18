import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('✅ mongoDB connected sucessfully')
    } catch (error) {
        console.error(error.message)
        console.log('❌ mongoDB connection failed !')
        
    }
}

export default connectDB