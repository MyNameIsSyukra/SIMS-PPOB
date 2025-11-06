import Connection from '../../../frameworks/database/postgres/connection.js';
import { AppError } from '../../../utils/Error.js';

export default class BannerRepository {
  constructor() {
    this.sequelize = Connection.sequelize;
  }

  async save(data) {
    const t = await this.sequelize.transaction();
    try {
      let sqlQuery = `
        INSERT INTO public."Banners" (
          banner_name, banner_image, description)
        VALUES (
          :banner_name, :banner_image, :description)
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
      throw new AppError('Gagal menyimpan data Banner', 500);
    }
  }
}
