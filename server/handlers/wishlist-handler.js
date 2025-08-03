const WishList = require('../db/wishlist');

const addToWishList = async (userId, productId) => {
    const wishListItem = new WishList({ usersId: userId, productId: productId });
    await wishListItem.save();
    return { success: true, productId, inWishlist: true };
};

const removeFromWishList = async (userId, productId) => {
    const result = await WishList.deleteOne({ usersId: userId, productId: productId });
    return { success: result.deletedCount > 0, productId, inWishlist: false };
};


const getWishList = async (userId) => {
    const wishList = await WishList.find({ usersId: userId }).populate('productId');
    return wishList.map(item => item.toObject());
};     

module.exports = {
    addToWishList,
    getWishList,
    removeFromWishList 
};


