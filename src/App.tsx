import React from 'react';
import { AppProvider } from './context/app.contexts';
import { MultiStepForm } from './components/form/MultiStepForm';
import { ProgressSection } from './components/form/ProgressBar';
import { AppointmentsTable } from './components/Table/AppointmentTable';
import { ThemeSwitcher } from './components/theme/ThemeSwticher';

const App: React.FC = () => {
  return (
    <AppProvider>
      <div id="app">
        <div className="primeContainer">
          <div className="main_container">
            <div className="left_part">
              <h1>Book Appointment</h1>
              <p>Please fill the form to schedule an Appointment</p>
              <ProgressSection />
            </div>
            <div className="right_part">
              <MultiStepForm />
            </div>
          </div>
          <div className="container">
            <div className="header">
              <div className="jodi">
                <h1>📋 Admin Dashboard</h1>
                <p>Manage all patient appointments</p>
              </div>
              <ThemeSwitcher />
            </div>
            <AppointmentsTable />
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
