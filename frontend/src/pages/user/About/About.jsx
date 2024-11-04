import React from "react";
import { Link } from "react-router-dom";
import "./About.scss";

const About = () => {
  return (
    <div className="about-page">
      <div className="banner">
        <h1>About Us</h1>
        <div className="banner-links">
          <Link to="/">Home</Link> / <Link to="/about">About Us</Link>
        </div>
      </div>
      <div
        className="about-container"
        style={{ display: "flex", height: "500px" }}
      >
        {/* Left Div with Image */}
        <div
          className="about-image"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="images/about-us.jpg" // Inline image source
            alt="About Us"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "500px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Right Div with Text Content */}
        <div
          className="about-content"
          style={{
            flex: 1,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Div 1: Horizontal Line with Text */}
          <div
            className="about-header"
            style={{ textAlign: "center", marginBottom: "40px" }}
          >
            <hr
              style={{
                border: "1px solid blue",
                width: "50%",
                margin: "0 auto",
              }}
            />
            <h1 style={{ color: "blue", fontSize: "2rem", fontWeight: "bold" }}>
              About Us
            </h1>
          </div>

          {/* Div 2: Big Text */}
          <h2
            style={{
              color: "black",
              fontSize: "1.8rem",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Who We Are
          </h2>

          {/* Div 3: Two Paragraphs about FileGuard */}
          <p style={{ marginBottom: "10px" }}>
            FileGuard is a secure file-sharing tool that enables users to share
            documents and files easily while ensuring their privacy and data
            security. Our platform offers a user-friendly interface designed for
            efficiency and convenience, making it simple to send and receive
            files.
          </p>
          <p>
            With advanced encryption technologies and stringent access controls,
            FileGuard guarantees that your sensitive information remains
            protected at all times. Whether for personal use or business
            purposes, our service is tailored to meet the needs of every user.
          </p>
        </div>
      </div>
      {/* Div 1: Horizontal Line beside "Our Advantages" */}
      <div className="advantages-header" style={{ marginBottom: "40px" }}>
        {" "}
        {/* Add margin here */}
        <hr className="header-line" />
        <h1 className="header-text">Our Advantages</h1>
      </div>
      {/* Div 2: Large Emphasized Text */}
      <h2 className="main-title" style={{ marginBottom: "30px" }}>
        Why Choose Us?
      </h2>{" "}
      {/* Add margin here */}
      {/* Div 3: Two Columns - Left for Text, Right for Percent Bars */}
      <div className="content-container" style={{ marginBottom: "40px" }}>
        <div className="text-section">
          <p>
            FileGuard provides a robust file-sharing service that emphasizes
            security and user experience. Our platform is designed to ensure
            that your data remains protected while being easily accessible.
          </p>
          <p>
            With our state-of-the-art encryption and user-friendly interface,
            sharing files has never been more secure and straightforward. Choose
            FileGuard for peace of mind and efficiency in your file-sharing
            needs.
          </p>
        </div>

        <div className="percent-section">
          <div className="percent-bar">
            <div className="label">Security 95%</div>
            <div className="bar-container">
              <div className="filled-bar" style={{ width: "95%" }}></div>
            </div>
          </div>
          <div className="percent-bar">
            <div className="label">Efficiency 90%</div>
            <div className="bar-container">
              <div className="filled-bar" style={{ width: "90%" }}></div>
            </div>
          </div>
          <div className="percent-bar">
            <div className="label">Guarantee 85%</div>
            <div className="bar-container">
              <div className="filled-bar" style={{ width: "85%" }}></div>
            </div>
          </div>
        </div>
      </div>
      {/* Div 2: Large Emphasized Text */}
      <h2 className="main-title2" style={{ marginBottom: "40px" }}>
        Meet Our Team
      </h2>{" "}
      {/* Add margin here */}
      {/* Div 3: Gallery of Team Members */}
      <div className="gallery-container">
        {/* Member 1 */}
        <div className="gallery-card">
          <div className="image-container">
            <img src="/images/ian.jpg" alt="Calica" className="team-image" />
            <div className="social-icons">
              <img src="/images/facebook.jpg" alt="Facebook" className="icon" />
              {/* Facebook icon */}
              <img src="/images/x.jpg" alt="X" className="icon" />
              {/* Close icon */}
              <img src="/images/linkedin.jpg" alt="LinkedIn" className="icon" />
              {/* LinkedIn icon */}
            </div>
          </div>
          <div className="member-info">
            <strong>Ian Gabriel G. Calica</strong>
            <p>Backend Developer</p>
          </div>
        </div>

        {/* Member 2 */}
        <div className="gallery-card">
          <div className="image-container">
            <img src="/images/franz.jpg" alt="Baribar" className="team-image" />
            <div className="social-icons">
              <img src="/images/facebook.jpg" alt="Facebook" className="icon" />
              {/* Facebook icon */}
              <img src="/images/x.jpg" alt="X" className="icon" />
              {/* Close icon */}
              <img
                src="/images/linkedin.jpg"
                alt="LinkedIn"
                className="icon"
              />{" "}
              {/* LinkedIn icon */}
            </div>
          </div>
          <div className="member-info">
            <strong>Jaylord Franz P. Baribar</strong>
            <p>Frontend Developer</p>
          </div>
        </div>

        {/* Member 3 */}
        <div className="gallery-card">
          <div className="image-container">
            <img
              src="/images/hanna.jpg"
              alt="Bernolia"
              className="team-image"
            />
            <div className="social-icons">
              <img src="/images/facebook.jpg" alt="Facebook" className="icon" />
              {/* Facebook icon */}
              <img src="/images/x.jpg" alt="X" className="icon" />
              {/* Close icon */}
              <img
                src="/images/linkedin.jpg"
                alt="LinkedIn"
                className="icon"
              />{" "}
              {/* LinkedIn icon */}
            </div>
          </div>
          <div className="member-info">
            <strong>Hanna Mae D. Bernolia</strong>
            <p>Frontend Developer</p>
          </div>
        </div>

        {/* Member 4 */}
        <div className="gallery-card">
          <div className="image-container">
            <img src="/images/tj.jpg" alt="Medina" className="team-image" />
            <div className="social-icons">
              <img src="/images/facebook.jpg" alt="Facebook" className="icon" />{" "}
              {/* Facebook icon */}
              <img src="/images/x.jpg" alt="X" className="icon" />{" "}
              {/* Close icon */}
              <img
                src="/images/linkedin.jpg"
                alt="LinkedIn"
                className="icon"
              />{" "}
              {/* LinkedIn icon */}
            </div>
          </div>
          <div className="member-info">
            <strong>Tyrone Justine A. Medina</strong>
            <p>Frontend Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
