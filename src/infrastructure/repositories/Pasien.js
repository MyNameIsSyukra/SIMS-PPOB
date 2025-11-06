import Connection from '../../../frameworks/database/postgres/connection.js';
import { AppError } from '../../../utils/Error.js';

export default class PasienRepository {
  constructor() {
    this.sequelize = Connection.sequelize;
  }

  async save(data) {
    const t = await this.sequelize.transaction();
    try {
      let sqlQuery = `
        INSERT INTO pasien (
          id_pasien, nama)
        VALUES (
          :id_pasien, :nama)
      `;
      await this.sequelize.query(sqlQuery, {
        replacements: data,
        transaction: t,
      });
      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      throw AppError('Gagal menyimpan data pasien', 500);
    }
  }
}
