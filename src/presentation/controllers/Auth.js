import AuthService from '../../application/services/Auth.js';
import { AuthDTO } from '../../application/dto/Auth.js';
import { AppError } from '../../../utils/Error.js';
import response from '../../../utils/Response.js';

export default class AuthController {
  constructor() {
    this.service = new AuthService();
  }

  async register(req, res) {
    try {
      const registerData = AuthDTO.CreateUser.parse(req.body);
      await this.service.register(registerData);

      return response(res, 201, 'User Created Succesfully', null);
    } catch (error) {
      if (error.name === 'ZodError') {
        const zodErr = AppError.handleZodError(error);
        return response(res, zodErr.statusCode, zodErr.message, null);
      }

      if (error instanceof AppError) {
        return response(res, error.statusCode, error.message, null);
      }

      return response(res, 500, 'Internal Server Error', error.message);
    }
  }

  async login(req, res) {
    try {
      const loginData = AuthDTO.LoginUser.parse(req.body);
      const result = await this.service.login(loginData);

      response(res, 200, 'Login Successful', result);
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
}
