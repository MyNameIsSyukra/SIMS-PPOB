import jwt from "jsonwebtoken";
import { AppError } from "../../utils/Error.js";

export default class JWTService {
  constructor() {
    if (!process.env.JWT_ACCESS_TOKEN_KEY || !process.env.JWT_REFRESH_TOKEN_KEY) {
      throw new AppError("JWT secret keys are not configured in environment variables");
    }

    this.accessTokenSecret = process.env.JWT_ACCESS_TOKEN_KEY;
    this.refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_KEY;

    this.accessTokenExpiry = process.env.JWT_ACCESS_TOKEN_EXPIRY || '1h';
    this.refreshTokenExpiry = process.env.JWT_REFRESH_TOKEN_EXPIRY || '7d';
  }

  async createAccessToken(payload) {
    try {
      // Remove sensitive data dari payload
      const tokenPayload = {
        id_user: payload.id_user,
        nama: payload.nama,
        username: payload.username,
        type: 'access'
      };

      const token = jwt.sign(tokenPayload, this.accessTokenSecret, {
        expiresIn: this.accessTokenExpiry
      });

      return token;
    } catch (error) {
      console.error("Error creating access token:", error);
      throw new AppError("Failed to create access token", 500);
    }
  }

  async createRefreshToken(payload) {
    try {
      const tokenPayload = {
        id_user: payload.id_user,
        username: payload.username,
        type: 'refresh'
      };

      const token = jwt.sign(tokenPayload, this.refreshTokenSecret, {
        expiresIn: this.refreshTokenExpiry
      });

      return token;
    } catch (error) {
      console.error("Error creating refresh token:", error);
      throw new AppError("Failed to create refresh token", 500);
    }
  }

  async verifyAccessToken(token) {
    try {
      const decoded = jwt.verify(token, this.accessTokenSecret);

      if (decoded.type !== 'access') {
        throw new AppError("Invalid token type", 401);
      }

      return decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new AppError("Access token expired", 401);
      } else if (error.name === 'JsonWebTokenError') {
        throw new AppError("Invalid access token", 401);
      }
      throw new AppError("Token verification failed", 401);
    }
  }

  async verifyRefreshToken(token) {
    try {
      const decoded = jwt.verify(token, this.refreshTokenSecret);

      if (decoded.type !== 'refresh') {
        throw new AppError("Invalid token type", 401);
      }

      return decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new AppError("Refresh token expired", 401);
      } else if (error.name === 'JsonWebTokenError') {
        throw new AppError("Invalid refresh token", 401);
      }
      throw new AppError("Token verification failed", 401);
    }
  }

  extractTokenFromHeader(authorizationHeader) {
    if (!authorizationHeader) {
      throw new AppError("Authorization header is required", 401);
    }

    const parts = authorizationHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new AppError("Invalid authorization header format", 401);
    }

    return parts[1];
  }

  getTokenInfo(token) {
    try {
      const decoded = jwt.decode(token);
      return {
        payload: decoded,
        header: jwt.decode(token, { complete: true })?.header,
        isExpired: decoded.exp < Date.now() / 1000
      };
    } catch (error) {
      throw new AppError("Failed to decode token", 400);
    }
  }
}
