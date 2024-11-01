import React from "react";
import "./signin.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  notifyError,
  notifySuccess,
  getBorderColor,
} from "../../../utils/Helpers";
import client from "../../../utils/client";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onChange",
  });

  const onValid = async (data) => {
    try {
      const url = `${process.env.REACT_APP_API_LINK}/login/`;
      const response = await client
        .post(url, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          notifySuccess("Sign-in successful!");
          navigate("/drive");
          reset();
        });
    } catch (error) {
      notifyError("Sign-in failed. Please check your credentials.");
      console.error(error);
    }
  };

  const onInvalid = (errors) => {
    notifyError("Please fix the errors before submitting.");
    console.error(errors);
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <div className="logo">
          <img
            src="/images/logo.png"
            alt="Your Logo"
            style={{ width: "150px", height: "auto" }}
          />
          <p>FileGuard</p>
        </div>

        <div className="social-buttons">
          <button className="google-btn">
            <img src="/images/google-logo.png" alt="Google" /> Google
          </button>
          <button className="facebook-btn">
            <img src="/images/facebook-logo.png" alt="Facebook" /> Facebook
          </button>
        </div>

        <div className="divider">
          <span>Or</span>
        </div>

        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <div className="mb-4">
            <label>Username*</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className={`${getBorderColor("username", errors, touchedFields)}`}
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>

          <label>Password*</label>
          <input
            id="password"
            type="password"
            placeholder="Min. of 8 characters"
            className={`${getBorderColor("password", errors, touchedFields)}`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}

          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to={"/s"}>Reset Password</Link>
          </div>

          <button type="submit" className="signin-button">
            Sign In
          </button>

          <p className="new-account">
            Don’t have an account yet? <Link to={"/signup"}>New Account</Link>
          </p>
        </form>
      </div>

      <div
        className="signin-image"
        style={{
          backgroundColor: "white",
          backgroundImage: "url('/images/login-image.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
    </div>
  );
};

export default SignIn;
