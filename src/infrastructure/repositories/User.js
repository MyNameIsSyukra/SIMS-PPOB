import { AppError } from '../../../utils/Error.js';
import Connection from '../../../frameworks/database/postgres/connection.js';

export default class UserRepository {
  constructor() {
    this.sequelize = Connection.sequelize;
    this.rounds = 12;
  }

  async findByUserId(user_id) {
    try {
      const sqlQuery = `
      SELECT *
      FROM public."Users"
      WHERE user_id = :user_id
    `;

      const [result] = await this.sequelize.query(sqlQuery, {
        replacements: {
          user_id: user_id,
        },
        type: this.sequelize.QueryTypes.SELECT,
      });

      return result;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }
}
