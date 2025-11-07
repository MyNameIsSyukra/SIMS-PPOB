import { AppError } from '../../../utils/Error.js';
import UserRepository from '../../infrastructure/repositories/User.js';

export default class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async getProfile(user_id) {
    try {
      const result = await this.repository.findByUserId(user_id);
      return {
        email: result.email,
        first_name: result.first_name,
        last_name: result.last_name,
        profile_image: result.profile_image,
      };
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 400);
    }
  }
  async getBalance(user_id) {
    try {
      const result = await this.repository.findByUserId(user_id);
      return {
        balance: result.balance,
      };
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 400);
    }
  }

  async updateProfile(data) {
    try {
      const result = await this.repository.findByUserId(data.user_id);
      if (result == undefined) {
        throw new AppError('User Not Found', 400);
      }
      const updated = await this.repository.updateProfileDatas(data);
      return updated;
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 400);
    }
  }
}
