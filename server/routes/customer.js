const express = require("express");
const router = express.Router();
const {getNewProducts, getFeaturedProducts ,getProductForListing, getProductById} = require("../handlers/product-handler");
const {getCategories} = require("../handlers/category-handler");
const {getWishList, addToWishList , removeFromWishList} = require("../handlers/wishlist-handler");
const User = require("../db/user");

router.get("/new-products", getNewProducts);

router.get("/featured-products", getFeaturedProducts);

router.get("/categories", getCategories);

router.get("/products", async (req, res) => {
    try {
        const { searchTerm, categoryId, brandId, page = 1, pageSize = 10, sortBy = 'price', sortOrder = 'desc' } = req.query;
        console.log(categoryId);
        const products = await getProductForListing(searchTerm, categoryId, brandId, page, pageSize, sortBy, sortOrder);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

router.get("/product/:id" , getProductById);

router.get("/wishlists", async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have user ID from authentication
        const wishList = await getWishList(userId);
        res.status(200).json(wishList);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlist', error });
    }
});

router.post("/wishlists/:id" , async(req ,res) =>{
    try{
        console.log("Request  user :" , req.user);
    const userId = req.user.id;
    const productId = req.params.id;
    const items = await addToWishList(userId , productId);
    res.status(200).json(items);
    }catch(error){
        res.status(500).json({ message: 'Error in adding to wishList', error });
    }
})

router.delete("/wishlists/:id" , async(req ,res) =>{
    try{
        console.log("Request  user :" , req.user);
    const userId = req.user.id;
    const productId = req.params.id;
    const items = await removeFromWishList(userId , productId);
    res.status(200).json(items);
    }catch(error){
        res.status(500).json({ message: 'Error in adding to wishList', error });
    }
});

// Get user profile by ID
router.get("/user/:id", async (req, res) => {
    console.log("Fetching user with ID:", req.params.id);   
  try {
    const user = await User.findById(req.params.id).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;