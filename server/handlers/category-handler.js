const Category = require("../db/category"); 

async function addCategory(req, res) {
  try {
    const category = new Category({ name: req.body.name });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ message: "Error saving category", error: err });
  }
}

async function updateCategory(req, res) {
  try {
    const category = req.body;
    await Category.findOneAndUpdate(
      { _id: req.params.id },
      category
    );
    res.status(200).json({ message: "Category updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating category", error: err });
  }
}

async function deleteCategory(req, res) {
  try {
    await Category.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting category", error: err });
  }
}

async function getCategory(req, res) {
  try {
    const category = await Category.find();
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    console.error("Error in /category:", err);
    res.status(500).json({ message: "Error retrieving category", error: err });
  }
}
async function getCategoryById(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving category by ID", error: err });
  }
}

async function getCategories(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error in /categories:", err);
    res.status(500).json({ message: "Error retrieving categories", error: err });
  }
}

module.exports = {addCategory, updateCategory, deleteCategory, getCategory, getCategoryById, getCategories};

