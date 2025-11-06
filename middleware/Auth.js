import JWTService from '../frameworks/services/JwtService.js';
import { AppError } from '../utils/Error.js';

export default async function AuthenticateJWT(req, res, next) {
  const jwtService = new JWTService();
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Authorization header is required',
    });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Invalid authorization header format. Expected: Bearer <token>',
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token is required',
    });
  }

  try {
    const decoded = await jwtService.verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    // Fallback untuk error yang tidak dihandle oleh JWTService
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Access token expired',
      });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid access token',
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Token verification failed',
      });
    }
  }
}
