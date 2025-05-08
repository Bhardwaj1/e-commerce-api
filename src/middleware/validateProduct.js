const validateProduct=(req,res,next)=>{
const {name,price}=req.body;
    if(!name){
        return res.status(404).json({message:"Product name is required"});
    };
    if(!price){
        return res.status(404).json({message:"Price is required"});
    };
    if(typeof price !="number"){
        return res.status(404).json({message:"Price must be number"});
    };

    next();

};
module.exports=validateProduct;