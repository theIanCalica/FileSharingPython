import React from "react";
import { Link } from "react-router-dom";
import "./Contact.scss";

const Contact = () => {
  return (
    <div className="contact-page mt-10">
      <div className="banner">
        <h1>Contact Us</h1>
        <div className="banner-links">
          <Link to="/">Home</Link> / <Link to="/contact">Contact Us</Link>
        </div>
      </div>

      <div className="contact-info">
        <div className="info-item">
          <img src="/images/phone-icon.jpg" alt="Phone Icon" className="icon" />
          <p>
            <strong>Phone</strong>
            <br />
            09123456789
          </p>
        </div>
        <div className="info-item">
          <img src="/images/email-icon.jpg" alt="Email Icon" className="icon" />
          <p>
            <strong>Email</strong>
            <br />
            fileguard@info.com
          </p>
        </div>
        <div className="info-item">
          <img
            src="/images/address-icon.jpg"
            alt="Address Icon"
            className="icon"
          />
          <p>
            <strong>Address</strong>
            <br />
            Western Bicutan, Taguig, Metro Manila
          </p>
        </div>
        <div className="info-item">
          <img src="/images/hours-icon.jpg" alt="Hours Icon" className="icon" />
          <p>
            <strong>Hours</strong>
            <br />
            Monday - Sunday
            <br />
            12 MN - 11:59 PM
          </p>
        </div>
      </div>

      <div className="contact-form">
        <div className="form-header">
          <hr />
          <span>Get in touch</span>
        </div>
        <h2>Have questions?</h2>
        <p>
          Have any questions, feedback, or need assistance? Our team is here to
          support you. Feel free to reach out to us, and we’ll do our best to
          make your experience as smooth as possible. We look forward to hearing
          from you!
        </p>
        <div className="input-group">
          <input type="text" placeholder="Your name*" className="input-field" />
          <input
            type="email"
            placeholder="Your E-mail*"
            className="input-field"
          />
        </div>
        <textarea
          placeholder="Your message*"
          className="textarea-field"
        ></textarea>
        <div className="checkbox-group">
          <input type="checkbox" id="consent" />
          <label htmlFor="consent">
            I agree that my submitted data is being collected and stored.
          </label>
        </div>
        <button className="submit-button">Send message</button>
      </div>

      {/* Google Maps Section */}
      <div className="google-maps">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30899.361259474914!2d121.01864680179158!3d14.517943197024417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf2ca2a215d5%3A0x38380d2c1d509c80!2sWestern%20Bicutan%2C%20Taguig%2C%201630%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1730702443363!5m2!1sen!2sph"
          width="100%"
          height="400" // Adjust height as needed
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
