import dotenv from "dotenv";
import mongoose from "mongoose";
import Category from "./models/categoryModel.js";
import Product from "./models/productModel.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Successfully connected to MongoDB 👍`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await Product.deleteMany({});
    // await Category.deleteMany({});

    // Create or get categories
    const categoryNames = ["Electronics", "Fashion", "Home & Kitchen"];
    const catIds = {};

    for (const name of categoryNames) {
      let category = await Category.findOne({ name });
      if (!category) {
        category = await Category.create({ name });
        console.log(`Created category: ${name}`);
      } else {
        console.log(`Category already exists: ${name}`);
      }
      catIds[name] = category._id;
    }

    // Seed products
    const products = [
      {
        name: "Wireless Headphones",
        image: "https://via.placeholder.com/600x400?text=Headphones",
        brand: "SoundMax",
        quantity: 100,
        category: catIds["Electronics"],
        description: "Comfortable over-ear wireless headphones with noise cancellation.",
        price: 99.99,
        countInStock: 50,
        rating: 0,
        numReviews: 0,
      },
      {
        name: "Smartphone X",
        image: "https://via.placeholder.com/600x400?text=Smartphone",
        brand: "TechNova",
        quantity: 200,
        category: catIds["Electronics"],
        description: "6.5-inch display, 128GB storage, dual camera.",
        price: 499.0,
        countInStock: 120,
        rating: 0,
        numReviews: 0,
      },
      {
        name: "Mens Running Shoes",
        image: "https://via.placeholder.com/600x400?text=Running+Shoes",
        brand: "FitForce",
        quantity: 80,
        category: catIds["Fashion"],
        description: "Lightweight and breathable running shoes for daily use.",
        price: 59.5,
        countInStock: 40,
        rating: 0,
        numReviews: 0,
      },
      {
        name: "Blender Pro 900W",
        image: "https://via.placeholder.com/600x400?text=Blender",
        brand: "HomeChef",
        quantity: 60,
        category: catIds["Home & Kitchen"],
        description: "Powerful blender ideal for smoothies and sauces.",
        price: 79.0,
        countInStock: 30,
        rating: 0,
        numReviews: 0,
      },
      {
        name: "Nonstick Cookware Set",
        image: "https://via.placeholder.com/600x400?text=Cookware",
        brand: "KitchenPlus",
        quantity: 40,
        category: catIds["Home & Kitchen"],
        description: "5-piece nonstick cookware set with glass lids.",
        price: 129.0,
        countInStock: 20,
        rating: 0,
        numReviews: 0,
      },
    ];

    for (const productData of products) {
      const existing = await Product.findOne({ name: productData.name });
      if (!existing) {
        await Product.create(productData);
        console.log(`Created product: ${productData.name}`);
      } else {
        console.log(`Product already exists: ${productData.name}`);
      }
    }

    console.log("✅ Products seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();

