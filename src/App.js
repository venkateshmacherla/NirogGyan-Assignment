import React, { useState } from 'react';
import DoctorList from './components/DoctorList';
import DoctorProfile from './components/DoctorProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          NirogGyan
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h1 className="mb-4 text-center app-title">Healthcare Appointment Booking</h1>
        <p className="text-center mb-4 app-subtitle">
          Select a doctor to view their profile and book an appointment.
        </p>
        {!selectedDoctorId && (
          <DoctorList onDoctorSelect={setSelectedDoctorId} />
        )}
        {selectedDoctorId && (
          <DoctorProfile
            doctorId={selectedDoctorId}
            onBack={() => setSelectedDoctorId(null)}
          />
        )}
      </div>
    </>
  );
}

export default App;
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>