// backend/middleware/loggerMiddleware.js
const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
};

module.exports = loggerMiddleware;
