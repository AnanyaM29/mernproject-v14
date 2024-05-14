import mongoose from 'mongoose';

//connection function
const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://ananyamathuremail:ananmath@cluster0.hqmn1kx.mongodb.net/ePostDB",{ useNewUrlParser:true});
        console.log(`Connected to Mongodb Database`);
    }
    catch(error)
    {
        console.log(`Error in mongodb ${error}`)
    }
}

export default connectDB;