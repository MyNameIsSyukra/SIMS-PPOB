import z from 'zod';

export class TransactionDTO {
  static TopTransaction = z.object({
    amount: z.coerce.number().positive(),
  });
  static Trasaction = z.object({
    service_code: z.string().min(1),
  });
}
