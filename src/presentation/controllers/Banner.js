import response from '../../../utils/Response.js';
import { AppError } from '../../../utils/Error.js';
import { BannerDTO } from '../../application/dto/Banner.js';
import BannerService from '../../application/services/Banner.js';

export default class BannerController {
  constructor() {
    this.service = new BannerService();
  }

  async save(req, res) {
    try {
      const data = BannerDTO.SaveBanner.parse(req.body);
      await this.service.save(data);
      return response(res, 201, 'Save Banner Succesfully', null);
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
