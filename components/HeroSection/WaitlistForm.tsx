'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import CustomDialog from '@/components/CustomDialog';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { createRegistrySchema, registryForm } from '@/schemas/registrySchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addEmailToWaitlist } from '@/app/[locale]/actions';
import { toast } from 'sonner';
import { countries } from '@/lib/countries';

export default function WaitlistForm() {
  const [isPending, startTransition] = useTransition();

  // dialog submit (success / errors)
  const [isOpen, setIsOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');

  // dialog privacy
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const tForm = useTranslations('HomePage.Form');
  const tValidation = useTranslations('HomePage.Form.Validation');
  const tErrors = useTranslations('HomePage.Form.Errors');
  const tSuccessDialog = useTranslations('HomePage.Form.SuccessDialog');
  const locale = useLocale();

  const registrySchema = createRegistrySchema(tValidation);

  // Intentar default El Salvador si existe
  const defaultNationality = useMemo(() => {
    const sv =
      countries.find((c) => c.name === 'El Salvador' || c.nameEs === 'El Salvador')?.code ?? '';
    return sv;
  }, []);

  const form = useForm<registryForm>({
    resolver: zodResolver(registrySchema),
    defaultValues: {
      email: '',
      nationality: defaultNationality || '',
    },
    mode: 'onSubmit',
  });

  // Si defaultNationality se calculó después, setearlo una vez
  useEffect(() => {
    if (defaultNationality && !form.getValues('nationality')) {
      form.setValue('nationality', defaultNationality);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultNationality]);

  function onSubmit(data: registryForm) {
    startTransition(async () => {
      const result = await addEmailToWaitlist(data, locale);

      if (result.success) {
        setDialogTitle(tSuccessDialog('title'));
        setDialogMessage(tSuccessDialog('message'));
        setIsOpen(true);
        form.reset({ email: '', nationality: defaultNationality || '' });
        return;
      }

      if (result.error?.type === 'email') {
        setDialogTitle(tErrors('emailAlreadyExists.title'));
        setDialogMessage(tErrors('emailAlreadyExists.message'));
        setIsOpen(true);
        return;
      }

      toast.error(tErrors('waitlistError'));
    });
  }

  const labelNationality = locale === 'es' ? 'NACIONALIDAD' : 'NATIONALITY';
  const labelEmail = locale === 'es' ? 'CORREO ELECTRÓNICO *' : 'EMAIL ADDRESS *';
  const privacyText = locale === 'es' ? 'Política de Privacidad' : 'Privacy Policy';

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
          {/* NATIONALITY */}
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
                      className={`${fieldBase} appearance-none pr-12`}
                      aria-label="Nationality"
                      aria-describedby="nationality-error"
                      required
                    >
                      <option value="" disabled className="text-white/60 bg-[#050A14]">
                        {tForm('nationalityPlaceholder')}
                      </option>

                      {countries.map((country) => (
                        <option
                          key={country.code}
                          value={country.code}
                          className="bg-[#050A14] text-white"
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

          {/* EMAIL */}
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
                    className={`${fieldBase} placeholder:text-white/45`}
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

          {/* BUTTON */}
          <Button
            className="w-full rounded-lg bg-gradient-to-r from-[#00B4C4] to-[#006AD5] cursor-pointer py-3.5 font-bold text-white shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.01] transition disabled:hover:scale-100"
            type="submit"
            disabled={isPending}
            aria-label={isPending ? 'Submitting...' : tForm('button')}
          >
            {isPending ? <Spinner className="mr-2 h-5 w-5" aria-hidden="true" /> : null}
            {tForm('button')}
          </Button>

          {/* DISCLAIMER */}
          <div className="pt-2 text-center">
            <p className="text-[11px] leading-snug text-white/45">
              {locale === 'es'
                ? 'Unirse a la lista no es una oferta de venta. Invertir implica riesgo. Revisa nuestra '
                : 'Joining the waitlist is not an offer to sell. Investing involves risk. Please review our '}
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="font-bold text-[#00B4C4] hover:underline"
              >
                {privacyText}
              </button>
              .
            </p>
          </div>
        </form>
      </Form>

      {/* Dialog de success / errors */}
      <CustomDialog open={isOpen} setOpen={setIsOpen} title={dialogTitle} message={dialogMessage} />

      {/* Dialog de privacy */}
      <CustomDialog
        open={privacyOpen}
        setOpen={setPrivacyOpen}
        title={privacyText}
        message={
          locale === 'es'
            ? 'Usamos tu correo únicamente para administrar la lista de espera y notificarte del lanzamiento. No vendemos tu información. Puedes solicitar eliminación cuando quieras.'
            : 'We use your email only to manage the waitlist and notify you about the launch. We do not sell your information. You can request deletion anytime.'
        }
      />
    </>
  );
}
