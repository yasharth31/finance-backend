module.exports = (requiredRole) => {
    return (req, res, next) => {
        try {
            // Check if user exists
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            }

            
            if (req.user.role !== requiredRole) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied"
                });
            }

            next();

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };
};