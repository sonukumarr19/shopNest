const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

// function verifyToken(req, res, next) {
//     const rawHeader = req.headers['authorization'];

//     if (!rawHeader || !rawHeader.startsWith('Bearer ')) {
//         return res.status(401).send('Access denied. No token provided.');
//     }

//     const token = rawHeader.split(' ')[1];
//     console.log("Token in verifyToken middleware:", token);

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         console.log("Decoded token in verifyToken middleware:", req.user);
//         next();
//     } catch (error) {
//         return res.status(400).json({ error: 'Invalid token' });
//     }
// }


function isAdmin(req, res, next) {
    const token = req.headers['authorization'];

    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
}

module.exports = {
    verifyToken,
    isAdmin
};
