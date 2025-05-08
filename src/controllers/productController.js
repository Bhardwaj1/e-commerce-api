const Product = require("../models/Product");

// get All product

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get product by Id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product Not Found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create product

const createProduct = async (req, res) => {
  const { name, price } = req.body;
  const newProduct = new Product({ name, price });
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};

// Update Product

const updateProduct=async(req,res)=>{
    try {
        const updatedProduct= await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!updatedProduct)return res.status(404).json({message:"Product Not Found"});
        res.json(updatedProduct);

    } catch (error) {
        res.status(500).json({message:error.message});
    };

}

// Delete Product by Id 

const deleteProduct =async(req,res)=>{
    try{
        const deletedProduct=await Product.findByIdAndDelete(req.params.id);
        if(!deleteProduct)return res.status(404).json({message:"Product Not Found"});
        res.json({message:"Product Deleted"});
    }catch(error){
        res.status(500).json({message:error.message});
    };
};

module.exports={
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
