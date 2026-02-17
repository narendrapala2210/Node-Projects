
module.exports = (validator) => {
    return (req, res, next) => {
        const errorMessage = validator(req.body);
        if (errorMessage) {
            return res.status(400).json({
                status: false,
                message: errorMessage,
            });
        }
        next();
    };
};
