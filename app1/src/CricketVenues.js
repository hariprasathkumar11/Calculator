import React, { useState } from 'react';
import './Venues.css';
import { Link } from 'react-router-dom';
import turf1 from './turf-1.jpg';
import turf2 from './turf-2.jpg';
import turf3 from './turf-3.jpg';
import turf4 from './turf-4.jpg';
import turf5 from './turf-5.jpg';
import turf6 from './turf-6.jpg';
import turf7 from './turf-7.jpg';
import turf8 from './turf-8.jpg';
import turf9 from './turf-9.jpg';

const cricketVenues = [
  { id: 1, name: 'Marutham Sports Cricket', image: turf1, category: 'Nets', price: 1200, type: 'Cricket' },
  { id: 2, name: 'Hi5s_Turf', image: turf2, category: 'Nets', price: 900, type: 'Cricket' },
  { id: 3, name: 'Karur Sports Arena', image: turf3, category: 'Box-Cricket', price: 1600, type: 'Cricket' },
  { id: 4, name: 'Dugout Turf', image: turf4, category: 'Nets', price: 800, type: 'Cricket' },
  { id: 5, name: 'Pavilion Turf', image: turf5, category: 'Nets', price: 1800, type: 'Cricket' },
  { id: 6, name: 'Gameon 360', image: turf6, category: 'Box-Cricket', price: 1200, type: 'Cricket' },
  { id: 7, name: 'Playzo 33', image: turf7, category: 'Nets', price: 700, type: 'Cricket' },
  { id: 8, name: 'Matrix Turf', image: turf8, category: 'Nets', price: 1800, type: 'Cricket' },
  { id: 9, name: 'Phoenix sports hub', image: turf9, category: 'Box-Cricket', price: 1000, type: 'Cricket' },
];

const CricketVenues = () => {
  const [priceFilter, setPriceFilter] = useState('All');

  const handleFilterChange = (price) => {
    setPriceFilter(price);
  };

  const filteredVenues = cricketVenues.filter((venue) => {
    if (priceFilter === 'All') return true;
    return venue.price <= priceFilter;
  });

  return (
    <div className="cricket-page">
      <h2>{filteredVenues.length} Cricket Grounds In Karur</h2>

      <div className="sort-options">
        <button
          className={priceFilter === 'All' ? 'active' : ''}
          onClick={() => handleFilterChange('All')}
        >
          All
        </button>
        <button
          className={priceFilter === 1000 ? 'active' : ''}
          onClick={() => handleFilterChange(1000)}
        >
          Below ₹1000
        </button>
        <button
          className={priceFilter === 1500 ? 'active' : ''}
          onClick={() => handleFilterChange(1500)}
        >
          Below ₹1500
        </button>
        <button
          className={priceFilter === 2000 ? 'active' : ''}
          onClick={() => handleFilterChange(2000)}
        >
          Below ₹2000
        </button>
      </div>

      <div className="cricket-grid">
        {filteredVenues.map((venue) => (
          <div className="venue-card" key={venue.id}>
            <div className="image-wrapper">
              <img src={venue.image} alt={venue.name} />
              <span className="type-label">{venue.type}</span>
            </div>
            <h3 className="venue-title">{venue.name}</h3>
            <div className="venue-info">
              <span className="category">{venue.category}</span>
              <span className="price">
                ₹ {venue.price} / <i className="fas fa-user"></i>
              </span>
            </div>
            <Link
              to={`/book/${venue.name}`}
              state={{ price: venue.price, name: venue.name }}
            >
              <button className="book-now-btn">Book Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CricketVenues;