import { AppError } from '../../../utils/Error.js';
import Connection from '../../../frameworks/database/postgres/connection.js';

export default class AuthRepository {
  constructor() {
    this.sequelize = Connection.sequelize;
    this.rounds = 12;
  }

  async findByEmail(email) {
    try {
      const sqlQuery = `
      SELECT *
      FROM public."Users"
      WHERE email = :email
    `;

      const [result] = await this.sequelize.query(sqlQuery, {
        replacements: {
          email: email,
        },
        type: this.sequelize.QueryTypes.SELECT,
      });

      return result;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  async saveUser(data) {
    const t = await this.sequelize.transaction();
    try {
      const sqlQuery = `
        INSERT INTO public."Users"
            (user_id, first_name,last_name,email, password)
        VALUES
            (:user_id, :first_name, :last_name,:email, :password )
      `;
      await this.sequelize.query(sqlQuery, {
        replacements: data,
        transaction: t,
      });
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw new AppError(error.message, 500);
    }
  }
}
