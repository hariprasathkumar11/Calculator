import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './BookPage.css';


const getNext5Days = () => {
  const days = [];
  const options = { weekday: 'short', day: '2-digit', month: 'short' };
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const label = date.toLocaleDateString('en-GB', options);
    days.push({ label, date });
  }
  return days;
};

const timeSlotsByCategory = {
  Twilight: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM'],
  Morning: ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM'],
  Noon: ['12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'],
  Evening: ['6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM']
};

const BookPage = () => {
  const location = useLocation();
  const { venueName } = useParams();
  const navigate = useNavigate();

  const { price = 400, name = venueName } = location.state || {};

  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Noon');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const generatedDates = getNext5Days();
    setDates(generatedDates);
    setSelectedDate(generatedDates[0]);
  }, []);

  const isPastTime = (date, slot) => {
    const now = new Date();
    const slotDate = new Date(date);

    const [time, modifier] = slot.split(' ');
    let [hours] = time.split(':');
    hours = parseInt(hours);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    slotDate.setHours(hours, 0, 0, 0);
    return slotDate < now;
  };

  const handleSlotClick = (slotIndex) => {
    const slots = timeSlotsByCategory[activeCategory];
    const dur = parseInt(duration);
    if (!dur || slotIndex + dur > slots.length) return;

    const selected = slots.slice(slotIndex, slotIndex + dur);
    const isDisabled = selectedDate && selected.some(slot => isPastTime(selectedDate.date, slot));
    if (!isDisabled) setSelectedSlots(selected);
  };

  if (!selectedDate) return null;

  return (
    <div className="booking-container">
      <h2 className="venue-heading">{name}</h2>

      {/* Date Selector */}
      <div className="date-selector">
        {dates.map((d, index) => {
          const isPast = new Date(d.date.toDateString()) < new Date(new Date().toDateString());
          return (
            <div
              key={index}
              className={`date-item ${selectedDate?.label === d.label ? 'active' : ''} ${isPast ? 'disabled' : ''}`}
              onClick={() => {
                if (!isPast) {
                  setSelectedDate(d);
                  setSelectedSlots([]);
                }
              }}
            >
              {d.label}
            </div>
          );
        })}
      </div>

      {/* Time Category Toggle */}
      <div className="time-category">
        {['Twilight', 'Morning', 'Noon', 'Evening'].map((cat) => (
          <span
            key={cat}
            className={activeCategory === cat ? 'active-category' : 'dim'}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedSlots([]);
            }}
          >
            {cat === 'Twilight' ? '🌙 Twilight' : cat === 'Noon' ? '🌞 Noon' : cat === 'Evening' ? '☁️ Evening' : '🌞 Morning'}
          </span>
        ))}
      </div>

      {/* Duration Selector */}
      <div className="duration-select">
        <label htmlFor="duration">Duration:</label>
        <select
          id="duration"
          value={duration}
          onChange={(e) => {
            setDuration(e.target.value);
            setSelectedSlots([]);
          }}
        >
          <option value="">Select</option>
          <option value="1">1 Hour</option>
          <option value="2">2 Hours</option>
          <option value="3">3 Hours</option>
        </select>
      </div>

      {/* Time Slots */}
      <div className="time-slots">
        {timeSlotsByCategory[activeCategory].map((slot, idx) => {
          const isDisabled = isPastTime(selectedDate.date, slot);
          return (
            <button
              key={slot}
              className={`time-slot ${selectedSlots.includes(slot) ? 'selected' : ''} ${isDisabled || !duration ? 'disabled' : ''}`}
              onClick={() => handleSlotClick(idx)}
              disabled={isDisabled || !duration}
            >
              {slot}
            </button>
          );
        })}
      </div>

      {/* Booking Summary */}
      {selectedSlots.length > 0 && selectedDate && (
        <div className="booking-summary">
          <div className="price-info">
            ₹ {price * selectedSlots.length}<br />
            {selectedSlots.join(' - ')} on {selectedDate.date.toDateString()}
          </div>
          <button
            className="next-btn"
            onClick={() => {
              navigate('/submit', {
                state: {
                  venue: name,
                  date: selectedDate.date.toDateString(),
                  slots: selectedSlots,
                  duration: selectedSlots.length,
                  price: price * selectedSlots.length
                }
              });
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default BookPage;