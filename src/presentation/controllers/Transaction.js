import response from '../../../utils/Response.js';
import { AppError } from '../../../utils/Error.js';
import { TransactionDTO } from '../../application/dto/Transaction.js';
import TransactionService from '../../application/services/Transactions.js';

export default class TransactionController {
  constructor() {
    this.service = new TransactionService();
  }

  async topup(req, res) {
    try {
      const data = TransactionDTO.TopTransaction.parse(req.body);
      data.user_id = req.user.user_id;

      return response(res, 201, 'Save Transaction Succesfully', await this.service.topup(data));
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
  async transaction(req, res) {
    try {
      const data = TransactionDTO.Trasaction.parse(req.body);
      data.user_id = req.user.user_id;

      return response(res, 201, 'Save Transaction Succesfully', await this.service.topup(data));
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
  async getAllTransaction(req, res) {
    try {
      return response(res, 200, 'Save Transaction Succesfully', await this.service.loadAll());
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
  async getAllTransactionByUserID(req, res) {
    try {
      const user_id = req.user.user_id;
      return response(res, 200, 'Save Transaction Succesfully', await this.service.loadTransactionByUserId(user_id));
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
