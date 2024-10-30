import React from 'react';
import './signin.css'; // Link to custom CSS for styling

const SignIn = () => {
  return (
    <div className="signin-container">
      {/* Left side - Login Form */}
      <div className="signin-form">
      <div className="logo">
        <img src="/images/logo.png" alt="Your Logo" style={{ width: '150px', height: 'auto' }} />
        <p>FileGuard</p>
      </div>
        
        {/* Social Login Buttons */}
        <div className="social-buttons">
          <button className="google-btn">
            <img src="/images/google-logo.png" alt="Google" /> Google
          </button>
          <button className="facebook-btn">
            <img src="/images/facebook-logo.png" alt="Facebook" /> Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="divider">
          <span>Or</span>
        </div>

        {/* Login Form */}
        <form>
          <label>Email Address*</label>
          <input
            type="email"
            placeholder="example@mail.com"
            required
          />

          <label>Password*</label>
          <input
            type="password"
            placeholder="Min. of 8 characters"
            minLength="8"
            required
          />

          {/* Remember Me & Reset Password */}
          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="reset-password">Reset password?</a>
          </div>

          {/* Sign In Button */}
          <button type="submit" className="signin-button">Sign In</button>
          
          {/* Register Link */}
          <p className="new-account">
            Don’t have an account yet? <a href="#">New Account</a>
          </p>
        </form>
      </div>

      {/* Right side - Image */}
      <div
        className="signin-image"
        style={{
          backgroundColor: 'white',               // Set white background color
          backgroundImage: "url('/images/login-image.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',    // Center the image
          backgroundSize: '50%',                  // Reduce size to 50%
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      ></div>
    </div>
  );
};

export default SignIn;
