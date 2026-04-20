'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Mail, Sparkles, UserRound } from 'lucide-react';
import { subscribeToNewsletter } from '@/app/[locale]/actions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import {
  createNewsletterSchema,
  newsletterForm,
  NewsletterInterestValue,
  newsletterInterestLabels,
  newsletterInterestValues,
} from '@/schemas/newsletterSchema';

const interestTranslationKeys = {
  futureInvestor: 'interestInvestor',
  assetPartner: 'interestAssetPartner',
  industryObserver: 'interestIndustryObserver',
  other: 'interestOther',
} as const;

const interestAccentRgbByValue: Record<NewsletterInterestValue, string> = {
  futureInvestor: 'var(--eq-card-accent-primary-rgb, 0, 180, 196)',
  assetPartner: 'var(--eq-card-accent-blue-rgb, 59, 130, 246)',
  industryObserver: 'var(--eq-card-accent-violet-rgb, 139, 92, 246)',
  other: 'var(--eq-card-accent-amber-rgb, 245, 158, 11)',
};

export default function NewsletterForm() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const t = useTranslations('Newsletter');
  const tValidation = useTranslations('Newsletter.validation');
  const schema = createNewsletterSchema(tValidation);

  const form = useForm<newsletterForm>({
    defaultValues: {
      firstName: '',
      email: '',
      interests: [],
    },
    mode: 'onSubmit',
  });

  const fieldBase =
    'h-12 rounded-xl border-white/15 bg-[rgba(8,7,14,0.55)] text-white placeholder:text-white/55 backdrop-blur-md transition-all duration-200 hover:border-white/30 focus-visible:border-[rgba(var(--eq-page-accent-rgb,0,180,196),0.6)] focus-visible:ring-[3px] focus-visible:ring-[rgba(var(--eq-page-accent-rgb,0,180,196),0.25)]';

  function onSubmit(values: newsletterForm) {
    startTransition(async () => {
      form.clearErrors();
      const parsed = schema.safeParse(values);
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          const field = issue.path[0];
          if (field === 'firstName' || field === 'email' || field === 'interests') {
            form.setError(field, { message: issue.message });
          }
        }
        return;
      }

      const result = await subscribeToNewsletter(parsed.data, locale);
      if (result.success) {
        toast.success(t('successTitle'), { description: t('successMessage') });
        form.reset({ firstName: '', email: '', interests: [] });
        return;
      }

      if (result.error?.type === 'email') {
        toast.error(t('errors.alreadyExists'));
        return;
      }

      toast.error(t('errors.submit'));
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="glass-surface glass-hover eq-card-accent-page space-y-6 p-6 sm:p-7"
      >
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="glass-panel rounded-xl border-[rgba(var(--eq-card-accent-primary-rgb,0,180,196),0.22)] bg-[rgba(var(--eq-card-accent-primary-rgb,0,180,196),0.08)] px-3 py-2">
            <p className="flex items-center gap-2 text-xs font-medium text-white/85">
              <UserRound className="h-3.5 w-3.5 text-[rgb(var(--eq-card-accent-primary-rgb,0,180,196))]" />
              {t('firstNameLabel')}
            </p>
          </div>
          <div className="glass-panel rounded-xl border-[rgba(var(--eq-card-accent-blue-rgb,59,130,246),0.24)] bg-[rgba(var(--eq-card-accent-blue-rgb,59,130,246),0.09)] px-3 py-2">
            <p className="flex items-center gap-2 text-xs font-medium text-white/85">
              <Mail className="h-3.5 w-3.5 text-[rgb(var(--eq-card-accent-blue-rgb,59,130,246))]" />
              {t('emailLabel')}
            </p>
          </div>
          <div className="glass-panel rounded-xl border-[rgba(var(--eq-card-accent-violet-rgb,139,92,246),0.24)] bg-[rgba(var(--eq-card-accent-violet-rgb,139,92,246),0.09)] px-3 py-2">
            <p className="flex items-center gap-2 text-xs font-medium text-white/85">
              <Sparkles className="h-3.5 w-3.5 text-[rgb(var(--eq-card-accent-violet-rgb,139,92,246))]" />
              {t('interestLabel')}
            </p>
          </div>
        </div>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-white/80">{t('firstNameLabel')}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t('firstNamePlaceholder')} className={fieldBase} required />
              </FormControl>
              <FormMessage className="text-white/80" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-white/80">{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  className={fieldBase}
                  autoComplete="email"
                  required
                />
              </FormControl>
              <FormMessage className="text-white/80" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-white/80">{t('interestLabel')}</FormLabel>
              <div className="grid gap-3 sm:grid-cols-2">
                {newsletterInterestValues.map((interest) => {
                  const checked = field.value.includes(interest);
                  const accentRgb = interestAccentRgbByValue[interest];
                  return (
                    <label
                      key={interest}
                      className="group relative flex cursor-pointer items-center gap-3 rounded-2xl border border-white/12 bg-[rgba(255,255,255,0.03)] px-4 py-3.5 text-sm text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 has-focus-visible:ring-2 has-focus-visible:ring-[rgba(var(--eq-page-accent-rgb,0,180,196),0.55)] has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-[#08070E]"
                      style={
                        checked
                          ? {
                              borderColor: `rgba(${accentRgb}, 0.46)`,
                              background: `linear-gradient(135deg, rgba(${accentRgb}, 0.22) 0%, rgba(255,255,255,0.05) 100%)`,
                              boxShadow: `0 0 0 1px rgba(${accentRgb}, 0.24) inset, 0 12px 26px rgba(${accentRgb}, 0.18)`,
                            }
                          : undefined
                      }
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => {
                          if (event.target.checked) {
                            field.onChange([...field.value, interest]);
                          } else {
                            field.onChange(field.value.filter((value) => value !== interest));
                          }
                        }}
                        className="peer sr-only"
                        aria-label={newsletterInterestLabels[interest]}
                      />

                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full border border-white/35 transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: checked
                            ? `rgba(${accentRgb}, 0.92)`
                            : 'rgba(255, 255, 255, 0.18)',
                          borderColor: checked
                            ? `rgba(${accentRgb}, 0.78)`
                            : 'rgba(255, 255, 255, 0.35)',
                          boxShadow: checked
                            ? `0 0 14px rgba(${accentRgb}, 0.45)`
                            : 'none',
                        }}
                        aria-hidden="true"
                      />

                      <span className="font-medium">{t(interestTranslationKeys[interest])}</span>

                      <span
                        className="ml-auto inline-flex h-6 min-w-6 items-center justify-center rounded-full border px-2 text-[11px] font-semibold leading-none transition-all duration-300"
                        style={{
                          borderColor: checked
                            ? `rgba(${accentRgb}, 0.7)`
                            : 'rgba(255, 255, 255, 0.22)',
                          color: checked ? `rgb(${accentRgb})` : 'rgba(255, 255, 255, 0.72)',
                          backgroundColor: checked
                            ? `rgba(${accentRgb}, 0.16)`
                            : 'rgba(255, 255, 255, 0.04)',
                        }}
                        aria-hidden="true"
                      >
                        {checked ? '✓' : '+'}
                      </span>
                    </label>
                  );
                })}
              </div>
              <FormMessage className="text-white/80" />
            </FormItem>
          )}
        />
        <Button type="submit" variant="brand" disabled={isPending} className="h-12 w-full">
          {isPending ? <Spinner className="mr-2 h-4 w-4" /> : null}
          {t('button')}
        </Button>
        <p className="text-center text-xs text-white/55">{t('microcopy')}</p>
      </form>
    </Form>
  );
}
