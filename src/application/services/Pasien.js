import PasienRepository from "../../infrastructure/repositories/Pasien.js";
import { AppError } from "../../../utils/Error.js";

export default class PasienService {
  constructor() {
    this.repository = new PasienRepository();
  }

  async save(data) {
    try {
      const result = await this.repository.save(data);
      return result;
    } catch (error) {
      throw AppError(error.message, error.statusCode || 400)
    }
  }
}
