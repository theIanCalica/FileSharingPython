import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Home.scss';

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to /signup
  };

  return (
    <div className="carousel-container">
      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="carousel-slide">
            <img src="/images/image-slide-1.jpeg" alt="Slide 1" className="carousel-image" />
            <div className="slide-content">
              <h1>File sharing &</h1>
              <h1>storage made simple</h1>
              <p>All your files with you everywhere and anytime.</p>
              <button className="signup-button" onClick={handleSignUpClick}>Free Sign Up</button> {/* Use onClick handler */}
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="carousel-slide">
            <img src="/images/image-slide-2.jpeg" alt="Slide 2" className="carousel-image" />
            <div className="slide-content">
              <h1>File sharing &</h1>
              <h1>storage made simple</h1>
              <p>All your files with you everywhere and anytime.</p>
              <button className="signup-button" onClick={handleSignUpClick}>Free Sign Up</button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="carousel-slide">
            <img src="/images/image-slide-3.jpeg" alt="Slide 3" className="carousel-image" />
            <div className="slide-content">
              <h1>File sharing &</h1>
              <h1>storage made simple</h1>
              <p>All your files with you everywhere and anytime.</p>
              <button className="signup-button" onClick={handleSignUpClick}>Free Sign Up</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Home;
