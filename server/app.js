const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const categoryRoutes = require("./routes/category");   
const brandRoutes = require("./routes/brand");   
const productRoutes = require("./routes/product");      
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const { verifyToken } = require("./middlewares/auth-middleware");
const { isAdmin } = require("./middlewares/auth-middleware");

require('dotenv').config({ quiet: true });

const app = express();
app.use(express.json());
app.use(cors());

app.use("/category", verifyToken ,isAdmin , categoryRoutes);
app.use("/brand", verifyToken ,isAdmin , brandRoutes);
app.use("/product", verifyToken ,isAdmin , productRoutes);
app.use("/customer", verifyToken ,customerRoutes);
app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => {
  console.log("MongoDB connected");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
