import jwt from 'jsonwebtoken';
import { config } from '../server.js';
import Token from '../../schemas/tokens.js';

const authenticator = async (req, res, next) => {
    try {
        // Extract authorization header
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ 
                message: 'Unauthorized: No token provided',
                error: 'Missing Authorization header' 
            });
        }

        // Extract token from header (expecting "Bearer <token>")
        const tokenParts = authHeader.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).json({ 
                message: 'Unauthorized: Invalid token format',
                error: 'Token must be in "Bearer <token>" format' 
            });
        }

        const token = tokenParts[1];

        // Validate token existence
        if (!token) {
            return res.status(401).json({ 
                message: 'Unauthorized: Token is empty',
                error: 'No token provided' 
            });
        }

        const tokenfromdatabase = await Token.findOne({token});
        if (!tokenfromdatabase){
            return res.status(403).json({
                message: 'Forbidden: Invalid or revoked token',
                error: 'Token not found in database' 
            });
        }

        try{
            // Verify token
            const decoded = jwt.verify(token, config.jwtSecret);
            req.userId = decoded.userId; 
            next(); 
        }
        catch (err) {
            return res.status(401).json({ 
                message: 'Unauthorized: Token verification failed',
                error: 'Invalid token' 
            });
        }

    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ 
            message: 'Server error during authentication',
            error: 'Internal server error' 
        });
    }
};

export default authenticator; 