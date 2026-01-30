import React, { useEffect } from 'react';
import { useAppStore } from './context/app.contexts';
import { AppointmentFormModal } from './components/form/Appointmentformmodal ';
import { AppointmentTable } from './components/Table/AppointmentTable';
import { ThemeSwitcher } from './components/theme/ThemeSwticher';
import { Toaster } from './components/ui/toaster';

const App: React.FC = () => {
  const { setModalOpen, theme } = useAppStore();

  useEffect(() => {
    // Apply theme on mount
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleAddAppointment = () => {
    setModalOpen(true);
  };

  return (
    <div id="app" className="min-h-screen">
      <div className="primeContainer max-w-[1400px] mx-auto p-4 lg:p-6">
        {/* Dashboard Section */}
        <div className="container mx-auto mb-6">
          <div
            className="
              header bg-gradient-to-r from-[--color-primary] to-[--color-primary-dark]
              text-white p-6 lg:p-8 rounded-2xl mb-6
              flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 
            "
          >
            <div className="jodi">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center gap-2">
                <span>📋</span> Admin Dashboard
              </h1>
              <p className="text-white/90 text-sm lg:text-base">
                Manage all patient appointments
              </p>
            </div>
            <ThemeSwitcher />
          </div>

          <AppointmentTable onAddClick={handleAddAppointment} />
        </div>
        <AppointmentFormModal />
        <Toaster />
      </div>
    </div>
  );
};

export default App;