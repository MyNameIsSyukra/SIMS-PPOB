import z from "zod";

export class PasienDTO {
  static SavePasien = z.object({
    id_pasien: z.coerce.number().int().positive(),
    nama: z.string(),
  });
}