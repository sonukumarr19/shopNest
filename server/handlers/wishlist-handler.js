const WishList = require('../db/wishlist');

const addToWishList = async (userId, productId) => {
    const wishListItem = new WishList({ usersId: userId, productId: productId });
    await wishListItem.save();
    return wishListItem.toObject();
};

const removeFromWishList = async (userId, productId) => {
    const result = await WishList.deleteOne({ usersId: userId, productId: productId });
    return { success: result.deletedCount > 0, productId , message: result.deletedCount > 0 ? "Item removed from wishlist" : "Item not found in wishlist"};
};


const getWishList = async (userId) => {
    const wishList = await WishList.find({ usersId: userId }).populate('productId');
    return wishList.map(item => item.toObject().productId);
};     

module.exports = { 
    addToWishList,
    getWishList,
    removeFromWishList 
};


