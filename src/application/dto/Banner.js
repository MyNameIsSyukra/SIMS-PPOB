import z from 'zod';

export class BannerDTO {
  static SaveBanner = z.object({
    banner_name: z.string().min(1),
    banner_image: z.string().min(1),
    description: z.string().min(1),
  });
}
