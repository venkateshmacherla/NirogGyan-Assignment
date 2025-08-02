import React from 'react';

function DoctorCard({ doctor, onCardClick }) {
    const { name, specialization, profileImage, status } = doctor;
    const statusCls =
        status === 'Available Today' ? 'text-success'
            : status === 'Fully Booked' ? 'text-danger'
                : 'text-warning';

    return (
        <div className="card h-100 shadow-sm">
            <img
                src={profileImage}
                className="card-img-top doctor-profile-image"
                alt={name}
                style={{ objectFit: 'cover', height: '100%', width: '100%' }}
            />
            <div className="card-body">
                <h5 className="card-title mb-1">{name}</h5>
                <p className="mb-1">{specialization}</p>
                <p className={statusCls + " mb-2"}>{status}</p>
                <button
                    className="btn btn-primary"
                    onClick={() => onCardClick(doctor.id)}
                >
                    View Profile
                </button>
            </div>
        </div>
    );
}

export default DoctorCard;
