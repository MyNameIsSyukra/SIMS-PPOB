import AuthRepository from '../../infrastructure/repositories/Auth.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import TimeHelper from '../../../utils/TimeHelper.js';
import { AppError } from '../../../utils/Error.js';
import JWTService from '../../../frameworks/services/JwtService.js';
import config from '../../../config/config.js';

export default class AuthService {
  constructor() {
    this.repository = new AuthRepository();
    this.jwtService = new JWTService();
  }

  async register(data) {
    const email = data.email;
    const existingUser = await this.repository.findByEmail(email);
    const salt = await bcrypt.genSalt(config.salt);
    if (existingUser == undefined) {
      data.user_id = uuidv4();

      data.password = await bcrypt.hash(data.password, salt);
      data.updated_at = TimeHelper.formatForDatabase();
      data.created_at = TimeHelper.formatForDatabase();

      const result = await this.repository.saveUser(data);
      return result;
    } else {
      throw new AppError('email already exists', 409);
    }
  }

  async login(data) {
    const { email, password } = data;
    try {
      const user = await this.repository.findByEmail(email);

      if (!user) {
        throw new AppError('Invalid username or password', 401);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new AppError('Invalid username or password', 401);
      }

      // Payload untuk JWT (tanpa sensitive data)
      const payload = {
        user_id: user.user_id,
        first_name: user.first_name,
        email: user.email,
      };

      // Generate tokens
      const accessToken = await this.jwtService.createAccessToken(payload);

      return {
        token: accessToken,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Login error:', error);
      throw new AppError(`Authentication failed: ${error.message}`, 500);
    }
  }
}
