import React, { useEffect, useState } from 'react';
import doctorsData from '../data/doctors.json';
import DoctorCard from './DoctorCard';

function DoctorList({ onDoctorSelect }) {
    const [search, setSearch] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect in case in if future API call needed
    useEffect(() => {
        setTimeout(() => {
            setDoctors(doctorsData);
            setLoading(false);
        }, 0); // Simulate API delay
    }, []);

    const filteredDoctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center py-5">
                <div>Loading doctors...</div>
            </div>
        );
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name or specialization"
                className="form-control mb-4 search-input"
                value={search}
                onChange={({ target }) => setSearch(target.value)}
            />
            <div className="row">
                {filteredDoctors.length === 0 && <p>No doctors found.</p>}
                {filteredDoctors.map(doctor => (
                    <div className="col-sm-12 col-md-6 col-lg-4 mb-3" key={doctor.id}>
                        <DoctorCard doctor={doctor} onCardClick={onDoctorSelect} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DoctorList;
