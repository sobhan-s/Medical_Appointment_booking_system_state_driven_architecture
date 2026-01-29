import React from 'react';
import { useAppContext } from '../../context/app.contexts';
import type { ProgressStep } from '../../types/helper.types';

const steps: ProgressStep[] = [
  { step: 1, title: 'Personal Info' },
  { step: 2, title: 'Appointment' },
  { step: 3, title: 'Medical Info' },
  { step: 4, title: 'Final Details' },
];

export const ProgressSection: React.FC = () => {
  const { currentStep } = useAppContext();

  return (
    <div className="progress_section">
      {steps.map(({ step, title }) => {
        let className = 'progress_items';

        if (step < currentStep) {
          className += ' complited';
        } else if (step === currentStep) {
          className += ' active';
        }

        return (
          <div key={step} className={className} data-step={step}>
            <div className="progress_step_number">
              <span>{step}</span>
            </div>
            <div className="progress_step_info">
              <h3>{title}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};
