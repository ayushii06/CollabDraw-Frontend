'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Toaster as SonnerToaster,
  toast as sonnerToast,
} from 'sonner';
import {
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from 'lucide-react';
import { cn } from '../../utils/cn';


export type Variant = 'default' | 'success' | 'error' | 'warning';
type Position =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'ghost';
}

interface ToasterProps {
  title?: string;
  message: string;
  variant?: Variant;
  duration?: number;
  position?: Position;
  actions?: ActionButton;
  onDismiss?: () => void;
  highlightTitle?: boolean;
}

export interface ToasterRef {
  show: (props: ToasterProps) => void;
}

const variantStyles: Record<Variant, string> = {
  default: 'bg-slate-800 border-slate-700 text-white',
  success: 'bg-emerald-600 border-emerald-700 text-white',
  error: 'bg-red-600 border-red-700 text-white',
  warning: 'bg-amber-500 border-amber-600 text-white',
};

const titleColor: Record<Variant, string> = {
  default: 'text-white',
  success: 'text-white',
  error: 'text-white',
  warning: 'text-white',
};

const iconColor: Record<Variant, string> = {
  default: 'text-white',
  success: 'text-white',
  error: 'text-white',
  warning: 'text-white',
};

const variantIcons: Record<Variant, React.ComponentType<{ className?: string }>> = {
  default: Info,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
};

const toastAnimation = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 50, scale: 0.95 },
};

const Toaster = forwardRef<ToasterRef, { defaultPosition?: Position }>(
  ({ defaultPosition = 'bottom-right' }, ref) => {
    const toastReference = useRef<ReturnType<typeof sonnerToast.custom> | null>(null);

    useImperativeHandle(ref, () => ({
      show({
        title,
        message,
        variant = 'default',
        duration = 4000,
        position = defaultPosition,
        actions,
        onDismiss,
        highlightTitle,
      }) {
        const Icon = variantIcons[variant];

        toastReference.current = sonnerToast.custom(
          (toastId) => (
            <motion.div
              variants={toastAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={cn(
                'flex items-center justify-between w-full max-w-xs p-3 rounded-xl border shadow-md',
                variantStyles[variant]
              )}
            >
              <div className="flex items-start gap-2">
                <Icon className={cn('h-4 w-4 mt-0.5 flex-shrink-0', iconColor[variant])} />
                <div className="space-y-0.5">
                  {title && (
                    <h3
                      className={cn(
                        'text-xs font-medium leading-none',
                        titleColor[variant],
                        highlightTitle && titleColor['success'] // override for meeting case
                      )}
                    >
                      {title}
                    </h3>
                  )}
                  <p className="text-xs text-white/90">{message}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {actions?.label && (
                  <button
                    onClick={() => {
                      actions.onClick();
                      sonnerToast.dismiss(toastId);
                    }}
                    className={cn(
                      'cursor-pointer  text-white border border-white/30  px-2 py-1 rounded-md text-xs hover:bg-white/20 transition',
                      variant === 'success'
                        ? 'text-green-600 border-green-600 hover:bg-green-600 dark:hover:bg-green-400/20'
                        : variant === 'error'
                        ? 'text-destructive border-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20'
                        : variant === 'warning'
                        ? 'text-amber-600 border-amber-600 hover:bg-amber-600/10 dark:hover:bg-amber-400/20'
                        : 'text-foreground border-border hover:bg-muted/10 dark:hover:bg-muted/20'
                    )}
                  >
                    {actions.label}
                  </button>
                )}

                <button
                  onClick={() => {
                    sonnerToast.dismiss(toastId);
                    onDismiss?.();
                  }}
                  className="rounded-full p-1 hover:bg-muted/50 dark:hover:bg-muted/30 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Dismiss notification"
                >
<X className="h-3 w-3 text-white/80" />                </button>
              </div>
            </motion.div>
          ),
          { duration, position }
        );
      },
    }));

    return (
      <SonnerToaster
        position={defaultPosition}
        toastOptions={{ unstyled: true, className: 'flex justify-end' }}
      />
    );
  }
);

export default Toaster;
