const validatePost =  (req,res, next) =>{
    if (Object.getOwnPropertyNames(req.body).length === 0) {
        res.status(400).json({ message: "missing post data" });
    }else if(!req.body.text){
        res.status(400).json({ message: "missing required text field" });
    }else{
        next();
    }
};

module.exports = validatePost;