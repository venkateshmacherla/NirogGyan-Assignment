import React, { useState } from 'react';

const initialState = {
    name: '',
    email: '',
    slot: ''
};

function BookingForm({ doctor, onClose }) {
    const [form, setForm] = useState(initialState);
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState({});

    function validate() {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required.";
        if (!form.email.trim() || !(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(form.email)))
            e.email = "Valid email required.";
        if (!form.slot) e.slot = "Select an available slot.";
        return e;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newErrors = validate();
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            // Here, in real app, POST to backend
            setMsg('Appointment booked successfully! You will receive a confirmation email.');
            setForm(initialState);
        }
    }

    return (
        <div className="card p-4 mb-3">
            <button
                className="btn btn-close close-btn-right"
                aria-label="Close"
                onClick={onClose}
                style={{ display: "block", marginLeft: "auto" }}
            ></button>
            <h4 className='doctor-name'>Book Appointment with {doctor.name}</h4>
            {msg ? (
                <div className="alert alert-success my-3">{msg}</div>
            ) : (
                <form className="my-2" onSubmit={handleSubmit} autoComplete="off" noValidate>
                    <div className="mb-3">
                        <label className="form-label">Patient Name</label>
                        <input
                            type="text"
                            className={"form-control" + (errors.name ? ' is-invalid' : '')}
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className={"form-control" + (errors.email ? ' is-invalid' : '')}
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date &amp; Time</label>
                        <select
                            className={"form-select" + (errors.slot ? ' is-invalid' : '')}
                            value={form.slot}
                            onChange={e => setForm(f => ({ ...f, slot: e.target.value }))}
                        >
                            <option value="">Select</option>
                            {doctor.availability.map(dt => (
                                <option key={dt} value={dt}>
                                    {new Date(dt).toLocaleString()}
                                </option>
                            ))}
                        </select>
                        {errors.slot && <div className="invalid-feedback">{errors.slot}</div>}
                    </div>
                    <button type="submit" className="btn btn-success confirm-btn me-2">Confirm</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
                </form>
            )}
        </div>
    );
}

export default BookingForm;
