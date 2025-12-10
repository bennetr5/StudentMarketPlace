import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const productSchema = new Schema ({
    title: {
        type: String, required: true
    },
    images: {
        type: [String], required: true
    },
    description: {
        type: String, default: ""
    },
    type: {
        type: String, required: true
    },
    price: {
        type: Number, min: 0.01, required: true
    },
    seller: {
        type: Types.ObjectId, required: true, ref: 'User'
    }
})

export default mongoose.models.Product || mongoose.model("Product", productSchema);
