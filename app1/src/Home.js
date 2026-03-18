import React from 'react';
import { Link } from 'react-router-dom';
import rohirat from './rohirat.png';
import './Home.css';
import cricket from './cricket.mp4';  // Import the video

const Home = () => {
  return (
    <section className="hero">
      
      {/* <video autoPlay loop muted>
        <source src={cricket} type="video/mp4" />
      </video> */}

      <div className="hero-content">
        <h1>
          <span className="fade-slide">The easiest way</span><br />
          <span className="fade-slide delay">to meet <span className="highlight">new players</span></span>
        </h1>
        <p className="fade-slide delay-2">
          Explore your neighbourhood and find a game in no time.
        </p>

        <Link to="/venues" className="hero-btn fade-slide delay-3">
          Book your slot <span>▶</span>
        </Link>
      </div>
    </section>
  );
};

export default Home;