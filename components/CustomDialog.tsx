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
        <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
      </DialogHeader>

      <p className="text-white/80">{message}</p>

      <DialogFooter>
        <Button
          variant="brandGhost"
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        >
          {t('confirmButton')}
        </Button>
      </DialogFooter>
    </GlassDialog>
  );
}
