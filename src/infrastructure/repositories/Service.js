import Connection from '../../../frameworks/database/postgres/connection.js';
import { AppError } from '../../../utils/Error.js';

export default class ServiceRepository {
  constructor() {
    this.sequelize = Connection.sequelize;
  }

  async save(data) {
    const t = await this.sequelize.transaction();
    try {
      let sqlQuery = `
        INSERT INTO public."Services" (
          service_code, service_name, service_icon, service_tariff)
        VALUES (
          :service_code, :service_name, :service_icon, :service_tariff)
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

  async load() {
    try {
      let sqlQuery = `
        SELECT * FROM public."Services"
      `;
      return await this.sequelize.query(sqlQuery, {
        type: this.sequelize.QueryTypes.SELECT,
      });
    } catch (error) {
      console.error(error);
      throw new AppError('Gagal mengambil data service', 500);
    }
  }
}
