const Brand = require("../db/brand"); 

async function addBrand(req, res) {
  try {
    const brand = new Brand({ name: req.body.name });
    const savedBrand = await brand.save();
    res.status(201).json(savedBrand);
  } catch (err) {
    res.status(500).json({ message: "Error saving brand", error: err });
  }
}

async function updateBrand(req, res) {
  try {
    const brand = req.body;
    await Brand.findOneAndUpdate(
      { _id: req.params.id },
      brand
    );
    res.status(200).json({ message: "Brand updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating brand", error: err });
  }
}

async function deleteBrand(req, res) {
  try {
    await Brand.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting brand", error: err });
  }
}

async function getBrand(req, res) {
  try {
    const brand = await Brand.find();
    if (!brand || brand.length === 0) {
      return res.status(404).json({ message: "No brands found" });
    }
    return res.status(200).json(brand); // ✅ Sends the data to the client
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving brand", error: err });
  }
}

async function getBrandById(req, res) {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json(brand);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving brand by ID", error: err });
  }
}



module.exports = {addBrand, updateBrand, deleteBrand, getBrand, getBrandById};

