import response from '../../../utils/Response.js';
import { AppError } from '../../../utils/Error.js';
import { ServiceDTO } from '../../application/dto/Service.js';
import ServiceService from '../../application/services/Service.js';

export default class ServiceController {
  constructor() {
    this.service = new ServiceService();
  }

  async save(req, res) {
    try {
      const data = ServiceDTO.SaveService.parse(req.body);
      await this.service.save(data);
      return response(res, 201, 'Save Service Succesfully', null);
    } catch (error) {
      if (error.name === 'ZodError') {
        const zodErr = AppError.handleZodError(error);
        return response(res, zodErr.statusCode, zodErr.message, null);
      }

      if (error instanceof AppError) {
        return response(res, error.statusCode, error.message, null);
      }

      return response(res, 500, 'Internal Server Error', null);
    }
  }
  async load(req, res) {
    try {
      return response(res, 200, 'Load Service Succesfully', await this.service.load());
    } catch (error) {
      console.error(error);
      if (error.name === 'ZodError') {
        const zodErr = AppError.handleZodError(error);
        return response(res, zodErr.statusCode, zodErr.message, null);
      }

      if (error instanceof AppError) {
        return response(res, error.statusCode, error.message, null);
      }

      return response(res, 500, 'Internal Server Error', null);
    }
  }
}
