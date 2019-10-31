const validateUser = (req, res, next) => {
    if (Object.getOwnPropertyNames(req.body).length === 0) {
        res.status(400).json({ message: "missing user data" });
    }else if (!req.body.name) {
        res.status(400).json({ message: "missing required name field" });
    } else {
        next();
    }
};

module.exports = validateUser;