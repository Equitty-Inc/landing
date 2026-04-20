import z from 'zod';

export const newsletterInterestValues = ['futureInvestor', 'assetPartner', 'industryObserver', 'other'] as const;
export type NewsletterInterestValue = (typeof newsletterInterestValues)[number];

export const newsletterInterestLabels: Record<NewsletterInterestValue, string> = {
  futureInvestor: 'Future investor',
  assetPartner: 'Asset partner',
  industryObserver: 'Industry observer',
  other: 'Other',
};

export type newsletterForm = {
  firstName: string;
  email: string;
  interests: NewsletterInterestValue[];
};

type TranslationFn = (key: string) => string;

export function createNewsletterSchema(t: TranslationFn) {
  return z.object({
    firstName: z.string().trim().min(1, t('firstNameRequired')),
    email: z.email(t('emailInvalid')).min(1, t('emailRequired')),
    interests: z.array(z.enum(newsletterInterestValues)).min(1, t('interestRequired')),
  });
}
