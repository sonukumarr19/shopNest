const Product = require('../db/product');

async function addProduct(req, res) {
    try {
        const productData = req.body;
        const newProduct = new Product(productData);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
}

async function getProducts(req, res) {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
}

async function getProductById(req, res) {
    try {
        const { id } = req.params;
        // console.log(`Fetching product with ID: ${id}`);
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const productData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
}

async function getNewProducts(req, res) {
    try {
        const products = await Product.find({ isNewProduct: true }).sort({ createdAt: -1 }).limit(12);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching new products', error });
    }
}

async function getFeaturedProducts(req, res) {
    try {
        const products = await Product.find({ isFeatured: true }).limit(12);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching featured products', error });
    }
}  

async function getProductForListing(searchTerm , categoryId ,brandId, page , pageSize , sortBy , sortOrder) {
    console.log("fetching products for listing with params:", { searchTerm, categoryId, brandId, page, pageSize, sortBy, sortOrder });
    try {
        const query = {};
        if (searchTerm) {
            query.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
                { shortDescription: { $regex: searchTerm, $options: 'i' } }
            ];
        }
        if (categoryId) {
            query.categoryId = categoryId;// Assuming categoryId is a string or ObjectId
            console.log("query category" ,query.categoryId)
        }
        if (brandId) {
            query.brandId = brandId;
        }

        const products = await Product.find(query)
            .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        console.log("fetched products:", products);
        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / pageSize);

        return {
            products: products.map((x) => x.toObject()),
            totalProducts,
            totalPages,
            currentPage: page
        };
    } catch (error) {
        throw new Error('Error fetching products for listing');
    }
}

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getNewProducts,
    getFeaturedProducts,
    getProductForListing
};