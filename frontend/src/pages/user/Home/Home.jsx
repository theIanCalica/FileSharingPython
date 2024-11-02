// src/pages/user/HomeAbout.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "./Home.scss"; // Import your combined stylesheet

const Home = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div>
      {/* Carousel Section */}
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
              <img
                src="/images/image-slide-1.jpeg"
                alt="Slide 1"
                className="carousel-image"
              />
              <div className="slide-content">
                <h1>File sharing &</h1>
                <h1>storage made simple</h1>
                <p>All your files with you everywhere and anytime.</p>
                <button className="signup-button" onClick={handleSignUpClick}>
                  Free Sign Up
                </button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="carousel-slide">
              <img
                src="/images/image-slide-2.jpeg"
                alt="Slide 2"
                className="carousel-image"
              />
              <div className="slide-content">
                <h1>File sharing &</h1>
                <h1>storage made simple</h1>
                <p>All your files with you everywhere and anytime.</p>
                <button className="signup-button" onClick={handleSignUpClick}>
                  Free Sign Up
                </button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="carousel-slide">
              <img
                src="/images/image-slide-3.jpeg"
                alt="Slide 3"
                className="carousel-image"
              />
              <div className="slide-content">
                <h1>File sharing &</h1>
                <h1>storage made simple</h1>
                <p>All your files with you everywhere and anytime.</p>
                <button className="signup-button" onClick={handleSignUpClick}>
                  Free Sign Up
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* About Section */}
      <div className="about-container">
        <div className="left-side">
          <img
            src="/images/home-about.jpeg"
            alt="About Us"
            className="big-image"
          />
        </div>
        <div className="right-side">
          <div className="first-div">
            <hr />
            <span>About Us</span>
          </div>
          <div className="second-div">
            <h1>What is FileGuard?</h1>
          </div>
          <div className="third-div">
            <p>
              FileGuard is a reliable and secure file sharing and storage
              solution that empowers users to manage their files effortlessly.
              Our platform is designed with user-friendliness and security in
              mind, ensuring that your files are always safe and accessible.
            </p>
          </div>
          <div className="fourth-div">
            <button className="more-info-button">More About Us</button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="benefits-container">
        {/* First Div */}
        <div className="benefits-line">
          <hr className="benefits-divider" />
          <h1 style={{ fontSize: "2.5rem", margin: "20px 0" }}>Our Benefits</h1>
        </div>

        {/* Second Div */}
        <div className="benefits-title">
          <h1 style={{ fontSize: "2rem" }}>
            More than just sharing and storage
          </h1>
        </div>

        {/* Third Div */}
        <div className="benefits-description">
          <h3>
            Take a look at the top features to make your life simple and easy.
          </h3>
        </div>

        {/* Fourth Div */}
        <div className="benefits-features">
          <div className="feature">
            <img
              src="/images/icon1.jpg"
              alt="Anonymous file exchange"
              className="feature-icon"
            />
            <p>Anonymous file exchange</p>
          </div>
          <div className="feature">
            <img
              src="/images/icon2.jpg"
              alt="Playing files online"
              className="feature-icon"
            />
            <p>Playing files online</p>
          </div>
          <div className="feature">
            <img
              src="/images/icon3.jpg"
              alt="No size limits"
              className="feature-icon"
            />
            <p>No size limits</p>
          </div>
          <div className="feature">
            <img
              src="/images/icon4.jpg"
              alt="Setting password for file transfer"
              className="feature-icon"
            />
            <p>Setting password for file transfer</p>
          </div>
          <div className="feature">
            <img
              src="/images/icon5.jpg"
              alt="Triple backups"
              className="feature-icon"
            />
            <p>Triple backups</p>
          </div>
        </div>

        {/* Fifth Div */}
        <div className="benefits-signup">
          <button className="signup-button" onClick={handleSignUpClick}>
            Free Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
