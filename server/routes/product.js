const express = require("express"); 
const router = express.Router();
const Product = require("../db/product");  
const {addProduct,getProducts,getProductById,updateProduct,deleteProduct} = require("../handlers/product-handler");

router.post("", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("", getProducts);
router.get("/:id", getProductById);


module.exports = router;
