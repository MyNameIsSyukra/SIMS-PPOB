import z from 'zod';

export class TransactionDTO {
  static TopTransaction = z.object({
    amount: z.coerce.number().positive(),
  });
}
