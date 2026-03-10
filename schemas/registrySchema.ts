import z from 'zod';

export type registryForm = {
  email: string;
  nationality: string;
  wasReferred: boolean;
  referralCode?: string;
};

export const createRegistrySchema = (t: (key: string) => string): z.ZodType<registryForm> =>
  z
    .object({
      email: z.email({ message: t('emailInvalid') }),
      nationality: z.string().min(1, { message: t('nationalityRequired') }),
      wasReferred: z.boolean(),
      referralCode: z.string().trim().optional().or(z.literal('')),
    })
    .superRefine((data, ctx) => {
      if (!data.wasReferred) {
        return;
      }

      if (!data.referralCode) {
        ctx.addIssue({
          code: 'custom',
          path: ['referralCode'],
          message: t('referralCodeRequired'),
        });
        return;
      }

      if (!/^[A-Z0-9]{6,12}$/i.test(data.referralCode)) {
        ctx.addIssue({
          code: 'custom',
          path: ['referralCode'],
          message: t('referralCodeInvalid'),
        });
      }
    });
