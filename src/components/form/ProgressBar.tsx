import React from 'react';
import { useAppStore } from '../../context/app.contexts';
import { cn } from '../../lib/utils';
import type { ProgressStep } from '../../types/helper.types';
import { Check } from 'lucide-react';

const steps: ProgressStep[] = [
  { step: 1, title: 'Personal Info' },
  { step: 2, title: 'Appointment' },
  { step: 3, title: 'Medical Info' },
  { step: 4, title: 'Final Details' },
];

export const ProgressSection: React.FC = () => {
  const { currentStep } = useAppStore();

  return (
    <div className="progress_section flex flex-row lg:flex-col gap-4 lg:gap-6 overflow-x-auto pb-2 lg:pb-0">
      {steps.map(({ step, title }) => {
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <div
            key={step}
            className={cn(
              'progress_items flex items-center gap-4 relative transition-all duration-300',
              isCompleted && 'complited opacity-80',
              isActive && 'active opacity-100',
              !isCompleted && !isActive && 'opacity-40',
            )}
            data-step={step}
          >
            <div
              className={cn(
                'progress_step_number w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-base lg:text-lg font-semibold flex-shrink-0 transition-all duration-300',
                isActive && 'bg-white text-primary scale-90 shadow-lg ',
              )}
            >
              {isCompleted ? (
                <Check className="h-4 w-4 lg:h-6 lg:w-6" />
              ) : (
                <span>{step}</span>
              )}
            </div>
            <div className="progress_step_info hidden lg:block">
              <h3
                className={cn(
                  'text-sm lg:text-base font-medium transition-all',
                  isActive && 'text-white font-semibold',
                  !isActive && 'text-white/80',
                )}
              >
                {title}
              </h3>
            </div>

            <div className="lg:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 w-max">
              <h3
                className={cn(
                  'text-xs font-medium whitespace-nowrap transition-all',
                  isActive && 'text-white font-semibold',
                  !isActive && 'text-white/70',
                )}
              >
                {title}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};
