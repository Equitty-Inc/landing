'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { addEmailToWaitlist } from '@/app/[locale]/actions';
import CustomDialog from '@/components/CustomDialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { countries } from '@/lib/countries';
import { createRegistrySchema, registryForm } from '@/schemas/registrySchema';

export default function WaitlistForm() {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const tForm = useTranslations('HomePage.Form');
  const tValidation = useTranslations('HomePage.Form.Validation');
  const tErrors = useTranslations('HomePage.Form.Errors');
  const tSuccessDialog = useTranslations('HomePage.Form.SuccessDialog');
  const locale = useLocale();

  const registrySchema = createRegistrySchema(tValidation);

  const defaultNationality = useMemo(() => {
    return (
      countries.find((country) => country.name === 'El Salvador' || country.nameEs === 'El Salvador')
        ?.code ?? ''
    );
  }, []);

  const form = useForm<registryForm>({
    defaultValues: {
      email: '',
      nationality: defaultNationality || '',
      wasReferred: false,
      referralCode: '',
    },
    mode: 'onSubmit',
  });

  const wasReferred = useWatch({
    control: form.control,
    name: 'wasReferred',
    defaultValue: false,
  });

  useEffect(() => {
    if (defaultNationality && !form.getValues('nationality')) {
      form.setValue('nationality', defaultNationality);
    }
  }, [defaultNationality, form]);

  useEffect(() => {
    if (!wasReferred) {
      form.setValue('referralCode', '');
      form.clearErrors('referralCode');
    }
  }, [form, wasReferred]);

  function onSubmit(data: registryForm) {
    startTransition(async () => {
      form.clearErrors();
      const parsed = registrySchema.safeParse(data);

      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          const field = issue.path[0];
          if (typeof field === 'string' && (field === 'email' || field === 'nationality' || field === 'referralCode')) {
            form.setError(field, { message: issue.message });
          }
        }
        return;
      }

      const result = await addEmailToWaitlist(parsed.data, locale);

      if (result.success) {
        setDialogTitle(tSuccessDialog('title'));
        setDialogMessage(tSuccessDialog('message'));
        setIsOpen(true);
        form.reset({
          email: '',
          nationality: defaultNationality || '',
          wasReferred: false,
          referralCode: '',
        });
        return;
      }

      if (result.error?.type === 'email') {
        setDialogTitle(tErrors('emailAlreadyExists.title'));
        setDialogMessage(tErrors('emailAlreadyExists.message'));
        setIsOpen(true);
        return;
      }

      if (result.error?.type === 'referral') {
        setDialogTitle(tErrors('invalidReferralCode.title'));
        setDialogMessage(tErrors('invalidReferralCode.message'));
        setIsOpen(true);
        return;
      }

      toast.error(tErrors('waitlistError'));
    });
  }

  const labelNationality = locale === 'es' ? 'NACIONALIDAD' : 'NATIONALITY';
  const labelEmail = locale === 'es' ? 'CORREO ELECTRONICO *' : 'EMAIL ADDRESS *';
  const labelReferral = locale === 'es' ? 'CODIGO DE REFERIDO' : 'REFERRAL CODE';
  const privacyText = locale === 'es' ? 'Politica de Privacidad' : 'Privacy Policy';

  const fieldBase =
    'mt-2 w-full rounded-lg border border-white/10 bg-[#050A14]/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#00B4C4]/70 focus:ring-0 disabled:opacity-50';

  return (
    <>
      <Form {...form}>
        <form
          className="w-full space-y-5"
          onSubmit={form.handleSubmit(onSubmit)}
          aria-label="Join waitlist form"
        >
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <div className="text-[11px] font-bold tracking-widest text-[#00B4C4] uppercase">
                  {labelNationality}
                </div>

                <FormControl>
                  <div className="relative">
                    <select
                      {...field}
                      className={`${fieldBase} appearance-none pr-12 font-light`}
                      aria-label="Nationality"
                      aria-describedby="nationality-error"
                      required
                    >
                      <option value="" disabled className="bg-[#050A14] font-light text-white/60">
                        {tForm('nationalityPlaceholder')}
                      </option>

                      {countries.map((country) => (
                        <option
                          key={country.code}
                          value={country.code}
                          className="bg-[#050A14] font-light text-white"
                        >
                          {locale === 'es' ? country.nameEs : country.name}
                        </option>
                      ))}
                    </select>

                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </FormControl>

                <FormMessage className="text-left text-xs text-white/80" id="nationality-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="text-[11px] font-bold tracking-widest text-[#00B4C4] uppercase">
                  {labelEmail}
                </div>

                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder={tForm('emailPlaceholder')}
                    className={`${fieldBase} font-light placeholder:text-white/45`}
                    aria-label="Email address"
                    aria-describedby="email-error"
                    autoComplete="email"
                    required
                  />
                </FormControl>

                <FormMessage className="text-left text-xs text-white/80" id="email-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wasReferred"
            render={({ field }) => (
              <FormItem>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-white/20 bg-[#050A14] accent-[#00B4C4]"
                  />
                  <span>{tForm('wasReferredLabel')}</span>
                </label>
              </FormItem>
            )}
          />

          {wasReferred ? (
            <FormField
              control={form.control}
              name="referralCode"
              render={({ field }) => (
                <FormItem>
                  <div className="text-[11px] font-bold tracking-widest text-[#00B4C4] uppercase">
                    {labelReferral}
                  </div>

                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={tForm('referralCodePlaceholder')}
                      className={`${fieldBase} font-light uppercase placeholder:text-white/45`}
                      aria-label="Referral code"
                      aria-describedby="referral-code-error"
                      autoComplete="off"
                      maxLength={12}
                    />
                  </FormControl>

                  <FormMessage className="text-left text-xs text-white/80" id="referral-code-error" />
                </FormItem>
              )}
            />
          ) : null}

          <Button
            className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-[#00B4C4] to-[#006AD5] py-3.5 font-bold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-cyan-500/20 disabled:hover:scale-100"
            type="submit"
            disabled={isPending}
            aria-label={isPending ? 'Submitting...' : tForm('button')}
          >
            {isPending ? <Spinner className="mr-2 h-5 w-5" aria-hidden="true" /> : null}
            {tForm('button')}
          </Button>
        </form>
      </Form>

      <CustomDialog open={isOpen} setOpen={setIsOpen} title={dialogTitle} message={dialogMessage} />

      <CustomDialog
        open={privacyOpen}
        setOpen={setPrivacyOpen}
        title={privacyText}
        message={
          locale === 'es'
            ? 'Usamos tu correo unicamente para administrar la lista de espera y notificarte del lanzamiento. No vendemos tu informacion. Puedes solicitar eliminacion cuando quieras.'
            : 'We use your email only to manage the waitlist and notify you about the launch. We do not sell your information. You can request deletion anytime.'
        }
      />
    </>
  );
}
