import Connection from '../../../frameworks/database/postgres/connection.js';
import { AppError } from '../../../utils/Error.js';

export default class TransationRepository {
  constructor() {
    this.sequelize = Connection.sequelize;
  }

  async save(data) {
    const t = await this.sequelize.transaction();
    try {
      let sqlQuery = `
        INSERT INTO public."Transactions" (
          invoice_number, transaction_type, description, total_amount,user_user_id)
        VALUES (
          :invoice_number, :transaction_type, :description, :total_amount, :user_id)
        RETURNING *;
      `;
      const [res] = await this.sequelize.query(sqlQuery, {
        replacements: data,
        transaction: t,
      });
      await t.commit();
      return res;
    } catch (error) {
      await t.rollback();
      console.error(error);
      throw new AppError('Gagal menyimpan data service', 500);
    }
  }

  async updateBalance(data) {
    console.log(data);
    const t = await this.sequelize.transaction();
    try {
      let sqlQuery = `
        UPDATE public."Users" SET balance = :saldoSisa 
        WHERE user_id = :user_id;
      `;
      await this.sequelize.query(sqlQuery, {
        replacements: data,
        transaction: t,
      });
      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      console.error(error);
      throw new AppError('Gagal menyimpan data service', 500);
    }
  }

  async loadAll() {
    try {
      let sqlQuery = `
        SELECT * FROM public."Transactions"
      `;
      return await this.sequelize.query(sqlQuery, {
        type: this.sequelize.QueryTypes.SELECT,
      });
    } catch (error) {
      console.error(error);
      throw new AppError('Gagal mengambil data service', 500);
    }
  }
  async loadTransactionByUserId(user_id) {
    try {
      let sqlQuery = `
        SELECT * FROM public."Transactions"
        WHERE user_user_id = :user_id
      `;
      return await this.sequelize.query(sqlQuery, {
        type: this.sequelize.QueryTypes.SELECT,
        replacements: {
          user_id: user_id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new AppError('Gagal mengambil data service', 500);
    }
  }
}
