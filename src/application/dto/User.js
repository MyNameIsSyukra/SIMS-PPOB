import z from 'zod';

export class UserDTO {
  static UpdateUser = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
  });
}
