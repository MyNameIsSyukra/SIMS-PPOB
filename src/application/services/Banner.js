import BannerRepository from '../../infrastructure/repositories/Banner.js';
import { AppError } from '../../../utils/Error.js';

export default class BannerService {
  constructor() {
    this.repository = new BannerRepository();
  }

  async save(data) {
    try {
      const result = await this.repository.save(data);
      return result;
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 400);
    }
  }
}
