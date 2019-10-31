const db = require('../users/userDb');

const validateUserId = (req, res, next) =>{
    const id = req.params.id
    if(id){
        db.getById(id).then(user =>{
            if(user){
            req.user = user;

            next();
            }else{
                res.status(400).json({ message: "invalid user id" });
            }
        }).catch(error =>{
            console.log(error);
            res.status(500).json({ message: "Something went wrong while getting user from the database." });
        });
    }
};

module.exports = validateUserId;