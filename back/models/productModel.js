import mongoose from "mongoose";

const subCategory = new mongoose.Schema({
  name: { type: String, required: true },
});
const reviewSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    comment: { type: String, required: true },
    note: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: [subCategory],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    note: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
