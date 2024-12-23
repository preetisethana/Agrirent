// const asyncHandler = require('express-async-handler');
// const jwt = require('jsonwebtoken');

// const validateToken = asyncHandler(async (req, res, next) => {
//     const token = req.headers.authorization.split(' ')[1];
//     if(!token){
//         return res.status(401).json({message: 'Not authorized, no token'});
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded.user;
//         console.log('Token Authorised'); 
//         next();
//     } catch (error) {
//         return res.status(401).json({message: 'Not authorized, token failed'});
//     }
// });

// module.exports = validateToken;

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;

    // Check if the authorization header exists and starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the decoded user to the request object
            req.user = decoded.user;

            console.log('Token Authorized');
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
});

module.exports = validateToken;

// const jwt = require('jsonwebtoken');

// const validateTokenHandler = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Access token is missing' });
//   }

//   jwt.verify(token, 'your_secret_key', (err, decoded) => {
//     if (err) {
//       if (err.name === 'TokenExpiredError') {
//         return res.status(401).json({ message: 'Token expired' });
//       }
//       return res.status(403).json({ message: 'Token verification failed' });
//     }
//     req.user = decoded;
//     next();
//   });
// };

// module.exports = validateTokenHandler;



