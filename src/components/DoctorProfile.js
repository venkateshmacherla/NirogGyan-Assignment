import React, { useState, useEffect } from 'react';
import doctorsData from '../data/doctors.json';
import BookingForm from './BookingForm';

function DoctorProfile({ doctorId, onBack }) {
    const [doctor, setDoctor] = useState(null);
    const [booking, setBooking] = useState(false);

    useEffect(() => {
        const found = doctorsData.find(d => d.id === doctorId);
        setDoctor(found);
    }, [doctorId]);

    if (!doctor) return <div>Loading...</div>;

    return (
        <div>
            <button className="btn btn-link mb-3 btn-back" onClick={onBack}>
                &larr; Back
            </button>
            <div className="card mb-3">
                <div className="row g-0 flex-column flex-md-row">
                    <div className="col-md-4 text-center p-3">
                        <img
                            src={doctor.profileImage}
                            className="img-fluid rounded doctor-profile-image"
                            alt={doctor.name}
                            style={{ maxHeight: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="col-md-8 p-3">
                        <h3 className="doctor-name">{doctor.name}</h3>
                        <p className="doctor-specialization"><b>Specialization:</b> {doctor.specialization}</p>

                        <p className="doctor-status">
                            <b>Status:</b>{" "}
                            <span className={
                                'status-pill ' +
                                (doctor.status === 'Available Today'
                                    ? 'status-available'
                                    : doctor.status === 'Fully Booked'
                                        ? 'status-booked'
                                        : 'status-leave')
                            }>
                                {doctor.status}
                            </span>
                        </p>

                        <div className="availability-section">
                            <b>Next Available Slots:</b>
                            <ul className="availability-list">
                                {doctor.availability.length > 0 ? doctor.availability.map(dt => (
                                    <li key={dt}>{new Date(dt).toLocaleString()}</li>
                                )) : (
                                    <li>No available slots.</li>
                                )}
                            </ul>
                        </div>
                        <button
                            className="btn btn-success booking-btn mt-2"
                            disabled={doctor.availability.length === 0}
                            onClick={() => setBooking(true)}
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>
            {booking && (
                <BookingForm doctor={doctor} onClose={() => setBooking(false)} />
            )}
        </div>
    );
}

export default DoctorProfile;
