import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleAboutUsClick = () => {
    navigate("/about-us");
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
            src="/images/home-about.jpg"
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
            <button className="more-info-button" onClick={handleAboutUsClick}>
              More About Us
            </button>
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
      {/* New Floating Section */}
      <div className="floating-section">
        <img
          src="/images/background-large.jpg"
          alt="Handle all your file needs"
          className="background-image"
        />
        <div className="floating-content">
          <div className="floating-text-1">Handles all of your file needs</div>
          <div className="floating-text-2">
            <h1>No matter where you go –</h1>
            <h1>take your files with you</h1>
          </div>
          <div className="floating-text-3">
            <p>
              Whether it’s your music collection, home videos, your resume, or
              your important work docs, have them in your pocket whenever you
              need them.
            </p>
          </div>
        </div>
      </div>
      {/* New Section */}
      <div className="features-container">
        {/* Div 1 */}
        <div className="features-title">
          <h1>Powerful and Simple</h1>
        </div>

        {/* Div 2 */}
        <div className="features-description">
          <p>
            File storage made easy – including powerful features you won’t find
            anywhere else. Whether you’re sharing photos, videos, audio, or
            docs, MediaFire can simplify your workflow.
          </p>
        </div>

        {/* Div 3 - Icons */}
        <div className="features-icons">
          <div className="icon-container">
            <div className="icon-circle">
              <img src="/images/step-1.jpg" alt="Share" />
            </div>
            <p>Share</p>
          </div>
          <div className="icon-container">
            <div className="icon-circle">
              <img src="/images/step-2.jpg" alt="Collaborate" />
            </div>
            <p>Collaborate</p>
          </div>
          <div className="icon-container">
            <div className="icon-circle">
              <img src="/images/step-3.jpg" alt="Store" />
            </div>
            <p>Store</p>
          </div>
          <div className="icon-container">
            <div className="icon-circle">
              <img src="/images/step-4.jpg" alt="Access" />
            </div>
            <p>Access</p>
          </div>
        </div>

        {/* Div 4 - Captions */}
        <div className="features-captions">
          <div className="caption-container">
            <p>
              Share through email, link, or social network. Unlimited downloads.
              No wait times.
            </p>
          </div>
          <div className="caption-container">
            <p>
              Store and share any file type. Share folders of project files.
              Easily email large files.
            </p>
          </div>
          <div className="caption-container">
            <p>
              10GB for free. Up to 50GB free with bonuses. Store all your
              photos, audio, and videos.
            </p>
          </div>
          <div className="caption-container">
            <p>
              Always have your important files with you. Never forget your work
              at home.
            </p>
          </div>
        </div>

        {/* Div 5 - Steps */}
        <div className="features-steps">
          <div className="steps-wrapper">
            <div className="step-circle">1</div>
            <div className="arrow">→</div>
            <div className="step-circle">2</div>
            <div className="arrow">→</div>
            <div className="step-circle">3</div>
            <div className="arrow">→</div>
            <div className="step-circle">4</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
