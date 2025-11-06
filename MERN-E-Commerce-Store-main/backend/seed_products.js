// Seed categories and products into the amitproject database
// Run with: mongosh "mongodb://localhost:27017/amitproject" --quiet --file backend/seed_products.js

(function () {
  const categoryNames = ["Electronics", "Fashion", "Home & Kitchen"];
  const catIds = {};

  categoryNames.forEach((name) => {
    const existing = db.categories.findOne({ name });
    if (existing) {
      catIds[name] = existing._id;
    } else {
      const res = db.categories.insertOne({ name });
      catIds[name] = res.insertedId;
    }
  });

  const upsertProductByName = (doc) => {
    const existing = db.products.findOne({ name: doc.name });
    if (!existing) {
      db.products.insertOne(doc);
    }
  };

  upsertProductByName({
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
  });

  upsertProductByName({
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
  });

  upsertProductByName({
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
  });

  upsertProductByName({
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
  });

  upsertProductByName({
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
  });

  printjson({ status: "ok", categoriesSeeded: categoryNames, productsSampled: 5 });
})();
