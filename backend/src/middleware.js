// middleware/auth.js
const jwt = import('jsonwebtoken');

const authMiddleware = (role) => (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Authentication required" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== role) {
            return res.status(403).json({ message: "Access forbidden" });
        }
        req.user = decoded; // Attach user data to the request
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export {authMiddleware};

  