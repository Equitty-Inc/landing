import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GlassDialog } from './GlassDialog';
import { useTranslations } from 'next-intl';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  message: string;
};
export default function CustomDialog({ open, setOpen, title, message }: Props) {
  const t = useTranslations('HomePage.Dialog');
  return (
    <GlassDialog open={open} onOpenChange={setOpen} variant="aurora" className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold tracking-tight text-[rgb(var(--eq-page-accent-rgb,0,180,196))] drop-shadow-[0_0_18px_rgba(var(--eq-page-accent-rgb,0,180,196),0.35)]">
          {title}
        </DialogTitle>
      </DialogHeader>

      <p className="text-base leading-relaxed text-white/95">{message}</p>

      <DialogFooter>
        <Button
          variant="brand"
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        >
          {t('confirmButton')}
        </Button>
      </DialogFooter>
    </GlassDialog>
  );
}
