const express=require('express');
const router=express.Router();

// Import controller function 
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}=require('../controllers/productController');

router.get('/',getProducts);
router.get('/:id',getProductById);
router.post('/',createProduct);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);
module.exports=router;