const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    usersId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }
});

const WishList = mongoose.model('wishlists', wishListSchema);
module.exports = WishList;