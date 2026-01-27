import z from 'zod';

export const createRegistrySchema = (t: (key: string) => string) =>
  z.object({
    email: z.email({ message: t('emailInvalid') }),
    nationality: z.string().min(1, { message: t('nationalityRequired') }),
  });

export type registryForm = z.infer<ReturnType<typeof createRegistrySchema>>;
