import { AppError } from '../../../utils/Error.js';
import TransactionRepository from '../../infrastructure/repositories/Transaction.js';
import UserRepository from '../../infrastructure/repositories/User.js';
import ServiceRepository from '../../infrastructure/repositories/Service.js';
import CommonUtils from '../../../utils/Utils.js';

export default class TransationTransation {
  constructor() {
    this.repository = new TransactionRepository();
    this.userRepository = new UserRepository();
    this.serviceRepository = new ServiceRepository();
    this.commonUtils = new CommonUtils();
  }

  async topup(data) {
    try {
      const userDatas = await this.userRepository.findByUserId(data.user_id);
      const userBalance = userDatas.balance == undefined ? 0 : userDatas.balance;
      const saldoSisa = Number(userBalance) + Number(data.amount);
      await this.userRepository.updateProfileDatas({
        user_id: userDatas.user_id,
        balance: saldoSisa,
      });
      await this.repository.save({
        invoice_number: this.commonUtils.generateInvoiceNumber(),
        transaction_type: 'TOPUP',
        description: 'Top Up Balance',
        total_amount: data.amount,
        user_id: userDatas.user_id,
      });
      return {
        balance: saldoSisa,
      };
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 400);
    }
  }

  async transaction(data) {
    try {
      const serviceDatas = await this.serviceRepository.loadByCode(data.service_code);
      if (serviceDatas.length === 0) {
        throw new AppError('service tidak ditemukan', 400);
      }
      const userDatas = await this.userRepository.findByUserId(data.user_id);
      const saldoSisa = Number(userDatas.balance) - Number(serviceDatas[0].service_tariff);
      if (saldoSisa < 0) {
        throw new AppError('saldo tidak mencukupi');
      }
      await this.userRepository.updateProfileDatas({
        user_id: userDatas.user_id,
        balance: saldoSisa,
      });
      const saveDatas = {
        invoice_number: this.commonUtils.generateInvoiceNumber(),
        transaction_type: 'Payment',
        description: serviceDatas[0].service_name,
        total_amount: saldoSisa,
        user_id: userDatas.user_id,
      };
      const [res] = await this.repository.save(saveDatas);
      return {
        invoice_number: saveDatas.invoice_number,
        service_code: serviceDatas[0].service_code,
        service_name: serviceDatas[0].service_name,
        transaction_type: 'PAYMENT',
        total_amount: serviceDatas[0].service_tariff,
        created_on: res.createdAt,
      };
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 400);
    }
  }

  async loadAll() {
    try {
      const result = await this.repository.loadAll();
      return result;
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 400);
    }
  }
  async loadTransactionByUserId(user_id) {
    try {
      const result = await this.repository.loadTransactionByUserId(user_id);
      return result;
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 400);
    }
  }
}
