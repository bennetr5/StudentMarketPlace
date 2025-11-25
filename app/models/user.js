import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const userSchema = new Schema ({
    username: {
        type: String, required: true, unique: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    listings: {
        type: [{ type: Types.ObjectId, ref: "Product" }], 
        default: []
    }
})

export default mongoose.model("User", userSchema);