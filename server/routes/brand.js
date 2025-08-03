const express = require("express"); 
const router = express.Router();
const Brand = require("../db/brand");  
const {addBrand, updateBrand , deleteBrand, getBrand ,getBrandById} = require("../handlers/brand-handler");

router.post("", addBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);
router.get("", getBrand);
router.get("/:id", getBrandById);


module.exports = router;
