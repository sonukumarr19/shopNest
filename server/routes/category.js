const express = require("express"); 
const router = express.Router();
const Category = require("../db/category");  
const {addCategory, updateCategory , deleteCategory, getCategory ,getCategoryById} = require("../handlers/category-handler");

router.post("", addCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get  ("", getCategory);
router.get  ("/:id", getCategoryById);

module.exports = router;
