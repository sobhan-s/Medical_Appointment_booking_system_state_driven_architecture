import React from 'react';
import { useAppContext } from '../../context/app.contexts';
import {
  sortAppointments,
  formatDate,
  appointmentToFormData,
} from '../../utils/index';
import type { AppointmentFormData } from '../../types/form.types';

export const AppointmentsTable: React.FC = () => {
  const {
    appointments,
    deleteAppointment,
    setEditMode,
    setFormData,
    setCurrentStep,
  } = useAppContext();

  // const appointmentListFromLocalStorage = loadFromStorage();
  // const inputRef = useRef(null);

  const sortedAppointments = sortAppointments(appointments);

  const handleUpdate = (appointment: AppointmentFormData) => {
    setEditMode(true, appointment.id);
    setFormData(appointmentToFormData(appointment));
    setCurrentStep(1);

    setTimeout(() => {
      const formSection = document.querySelector('.main_container');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Do you want to delete this record?')) {
      deleteAppointment(id);
    }
  };

  // const handleInput = () => {
  //   const serchedName = inputRef.current.value as string;
  //   console.log(serchedName);
  //   console.log(appointments);
  //   const filteredRecord = appointments.filter((record) => {
  //     return record.name.trim().toLowerCase().includes(serchedName)
  //   });
  // };

  // console.log(handleInput);

  console.log('renderasdfasd');

  return (
    <div className="tableContainer" id="tableContainer">
      <div className="tableWrapper">
        {/* <input type="text" ref={inputRef} />
        <button onClick={handleInput}>check</button> */}
        <table id="appointmentsTable">
          <thead className="tableHead">
            <tr className="tableRow">
              <th>Appointment Date</th>
              <th>Time Slot</th>
              <th>Patient Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Doctor</th>
              <th>Reason For Visit</th>
              <th>Health Concerns</th>
              <th>Medication</th>
              <th>Allergies</th>
              <th>Medical Record</th>
              <th>Consultation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="tableBody">
            {sortedAppointments.length === 0 ? (
              <tr>
                <td colSpan={13} className="noAppointment">
                  <h3>No appointments found</h3>
                  <p>There are no appointments to display.</p>
                </td>
              </tr>
            ) : (
              sortedAppointments.map((apt) => (
                <tr key={apt.id}>
                  <td>
                    <strong>{formatDate(apt.appointmentDate)}</strong>
                  </td>
                  <td>{apt.timeSlot}</td>
                  <td>
                    <strong>{apt.name}</strong>
                  </td>
                  <td>{apt.email}</td>
                  <td>{apt.phonePrefix + apt.phone}</td>
                  <td className="doctor">{apt.doctor}</td>
                  <td>{apt.reasonForVisit}</td>
                  <td className="healthConcerns">
                    {apt.healthConcerns.map((concern, index) => (
                      <span key={index} className="eachHealthTag">
                        {concern}
                      </span>
                    ))}
                  </td>
                  <td>{apt.medications || '-'}</td>
                  <td>{apt.allergies || '-'}</td>
                  <td>{apt.medicalRecord}</td>
                  <td>{apt.consultationType}</td>
                  <td className="internalBtn">
                    <button
                      className="update_btn update"
                      onClick={() => handleUpdate(apt)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="delete_btn delete"
                      onClick={() => handleDelete(apt.id)}
                      title="Delete"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
