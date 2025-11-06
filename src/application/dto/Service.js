import z from 'zod';

export class ServiceDTO {
  static SaveService = z.object({
    service_code: z.string().min(1),
    service_name: z.string().min(1),
    service_icon: z.string().min(1),
    service_tariff: z.coerce.number(),
  });
}
