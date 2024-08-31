import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        email: {
            required: true,
            type: String
        },
        password: {
            required: true,
            type: String
        },
        Name:{
            required: true,
            type: String
        },
    },
    {
        timestamps:true
    }
)

const userModel = new mongoose.model("user", userSchema);
export default userModel