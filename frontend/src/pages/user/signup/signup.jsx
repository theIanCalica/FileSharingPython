import React from 'react';
import './signup.css'; // Link to custom CSS for styling

const SignUp = () => {
  return (
    <div className="signup-container">
      {/* Left side - Sign Up Form */}
      <div className="signup-form">
        <div className="logo">
          <img src="/images/logo.png" alt="Your Logo" style={{ width: '150px', height: 'auto' }} />
          <p>FileGuard</p>
        </div>
        
        {/* Divider */}
        <div className="divider">
          <span>Or</span>
        </div>

        {/* Sign Up Form */}
        <form>
          <label>Full Name*</label>
          <input
            type="text"
            placeholder="Ex: John Doe"
            required
          />

        <label>Username*</label>
          <input
            type="text"
            placeholder="Ex: johndoe123"
            required
          />

          <label>Email Address*</label>
          <input
            type="email"
            placeholder="mail@example.com"
            required
          />

          <label>Password*</label>
          <input
            type="password"
            placeholder="hello123"
            minLength="8"
            required
          />
          <small>Min. 8 characters</small>

          {/* Terms Agreement */}
          <div className="terms">
            <label>
              <input type="checkbox" required /> By creating an account you agree to the terms of use and our privacy policy.
            </label>
          </div>

          {/* Sign Up Button */}
          <button type="submit" className="signup-button">Sign Up</button>
          
          {/* Sign In Link */}
          <p className="existing-account">
            Already have an account? <a href="#">Sign In</a>
          </p>
        </form>
      </div>

      {/* Right side - Image */}
      <div
        className="signup-image"
        style={{
          backgroundColor: 'white', // Set white background color
          backgroundImage: "url('/images/login-image.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center', // Center the image
          backgroundSize: '50%', // Reduce size to 50%
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      ></div>
    </div>
  );
};

export default SignUp;