// pages/SubmitForm.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SubmitForm.css';

const SubmitForm = () => {
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    place: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.mobile && formData.place) {
      setSubmitted(true);
      // Optionally, send to backend here
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="submit-form-container">
      <h2>Confirm Your Booking</h2>
      <div className="booking-details">
        <p><strong>Venue:</strong> {state?.venue}</p>
        <p><strong>Date:</strong> {state?.date}</p>
        <p><strong>Time:</strong> {state?.slots?.join(' - ')}</p>
        <p><strong>Duration:</strong> {state?.duration} hour(s)</p>
        <p><strong>Price:</strong> ₹{state?.price}</p>
      </div>

      {submitted ? (
        <p className="success-message">Booking submitted successfully!</p>
      ) : (
        <form onSubmit={handleSubmit} className="submit-form">
            
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="place"
            placeholder="Place"
            value={formData.place}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit Booking</button>
        </form>
      )}
    </div>
  );
};

export default SubmitForm;