const logger = (req, res, next) =>{
    console.log(`${new Date().toDateString()}: ${req.method} ${req.path}`);
    next();
};

module.exports = logger;