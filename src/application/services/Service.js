import { AppError } from '../../../utils/Error.js';
import ServiceRepository from '../../infrastructure/repositories/Service.js';

export default class ServiceService {
  constructor() {
    this.repository = new ServiceRepository();
  }

  async save(data) {
    try {
      const result = await this.repository.save(data);
      return result;
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 400);
    }
  }
  async load() {
    try {
      const result = await this.repository.load();
      return result;
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 400);
    }
  }
}
