const express = require("express");
const router = express.Router();
const {getNewProducts, getFeaturedProducts ,getProductForListing, getProductById} = require("../handlers/product-handler");
const {getCategories} = require("../handlers/category-handler");
const {getWishList, addToWishList} = require("../handlers/wishlist-handler");

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
})

module.exports = router;