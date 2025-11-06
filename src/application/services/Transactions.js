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
      await this.repository.updateBalance({
        user_id: userDatas.user_id,
        saldoSisa: saldoSisa,
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
  // async topup(data) {
  //   try {
  //     const serviceDatas = await this.serviceRepository.loadByCode(data.service_code);
  //     if (service_code.length === 0) {
  //       throw new AppError('service tidak ditemukan', 400);
  //     }
  //     const userDatas = await this.userRepository.findByUserId(data.user_id);
  //     const saldoSisa = userDatas.balance + data.amount;
  //     if (saldoSisa < 0) {
  //       throw new AppError('saldo tidak mencukupi');
  //     }
  //     await this.repository.updateBalance({
  //       user_id: userDatas.user_id,
  //       saldoSisa: saldoSisa,
  //     });
  //     await this.repository.save({
  //       invoice_number : this.commonUtils.generateInvoiceNumber(),
  //       transaction_type :"TOPUP",
  //       description : "Top Up Balance"
  //       total_amount:
  //     })
  //     return result;
  //   } catch (error) {
  //     throw new AppError(error.message, error.statusCode || 400);
  //   }
  // }
  async load() {
    try {
      const result = await this.repository.load();
      return result;
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 400);
    }
  }
}
