'use client';

import { useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { unsubscribeFromWaitlist } from '@/app/[locale]/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';

export default function UnsubscribeForm() {
  const locale = useLocale();
  const t = useTranslations('HomePage.Unsubscribe');
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(() => searchParams.get('email') ?? '');
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      const result = await unsubscribeFromWaitlist(email, locale);

      if (result.success) {
        setFeedback({ type: 'success', message: t('success') });
        setEmail('');
        toast.success(t('success'));
        return;
      }

      const message = result.error?.message ?? t('error');
      setFeedback({ type: 'error', message });
      toast.error(message);
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        placeholder={t('emailPlaceholder')}
        className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/60 focus:border-[#00B4C4] focus:ring-[#00B4C4]/40"
        required
      />
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-accent text-primary cursor-pointer font-semibold shadow-lg shadow-accent/30 transition hover:scale-[1.02] disabled:opacity-60"
      >
        {isPending ? t('processing') : t('button')}
      </Button>
      {feedback ? (
        <p className={`text-sm ${feedback.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
          {feedback.message}
        </p>
      ) : null}
    </form>
  );
}
