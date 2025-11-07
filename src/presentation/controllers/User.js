import response from '../../../utils/Response.js';
import { AppError } from '../../../utils/Error.js';
import UserService from '../../application/services/User.js';
import { UserDTO } from '../../application/dto/User.js';
import config from '../../../config/config.js';

export default class UserController {
  constructor() {
    this.service = new UserService();
  }
  async getProfile(req, res) {
    try {
      return response(res, 200, 'Load Banner Succesfully', await this.service.getProfile(req.user.user_id));
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

  async getBalance(req, res) {
    try {
      return response(res, 200, 'Load Banner Succesfully', await this.service.getBalance(req.user.user_id));
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

  async updateProfile(req, res) {
    try {
      const datas = UserDTO.UpdateUser.parse(req.body);
      datas.user_id = req.user.user_id;
      return response(res, 200, 'Load Banner Succesfully', await this.service.updateProfile(datas));
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
  async uploadImage(req, res) {
    try {
      if (!req.file) {
        throw new AppError('Tidak ada file ditemukan', 400);
      }
      const datas = {
        user_id: req.user.user_id,
        profile_image: `${config.baseUrl}static/` + req.file.filename,
      };
      return response(res, 200, 'Load Banner Succesfully', await this.service.updateProfile(datas));
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
