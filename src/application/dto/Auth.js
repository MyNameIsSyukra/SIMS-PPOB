import z from 'zod';

export class AuthDTO {
  static CreateUser = z.object({
    first_name: z.string().min(5),
    last_name: z.string().min(5),
    email: z.string().min(6),
    password: z
      .string()
      .min(6)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, 'Password harus mengandung huruf dan angka'),
  });

  static LoginUser = z.object({
    email: z.string().min(6),
    password: z.string().min(6),
  });
}
