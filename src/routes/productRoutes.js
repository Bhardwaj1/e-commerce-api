const express=require('express');
const router=express.Router();
const validateProduct=require('../middleware/validateProduct');

// Import controller function 
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}=require('../controllers/productController');
const upload = require('../middleware/upload');

router.get('/',getAllProducts);
router.get('/:id',getProductById);
router.post('/',upload.array('images',5),validateProduct,createProduct);
router.put('/:id',upload.array('images'),validateProduct,updateProduct);
router.delete('/:id',deleteProduct);
module.exports=router;