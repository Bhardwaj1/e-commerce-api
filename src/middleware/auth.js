const registrationValidationSchema=require('../validators/registrationValidators');
const validateRegistrationUser =(req,res,next)=>{
    const {error}=registrationValidationSchema.validate(req.body,{
        abortEarly:false,
    });
    if(error){
        return res.status(400).json({
            message:"Validation error",
            errors:error.details.map((err)=>err.message),
        })
    }
    next();
};
module.exports=validateRegistrationUser;