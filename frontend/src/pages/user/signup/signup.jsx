import React, { useEffect, useState } from "react";
import "./signup.css";
import client from "../../../utils/client";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  notifyError,
  notifySuccess,
  getBorderColor,
} from "../../../utils/Helpers";

const SignUp = () => {
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onChange",
  });

  const username = watch("username");
  const email = watch("email");

  useEffect(() => {
    const checkUniqueness = async () => {
      if (username) {
        const response = await client.get("/check-unique/", {
          params: { username },
        });
        setIsUsernameUnique(response.data.is_username_unique);
        if (!response.data.is_username_unique) {
          setError("username", {
            type: "manual",
            message: "Username already exists",
          });
        }
      }
    };

    const checkEmailUniqueness = async () => {
      if (email) {
        const response = await client.get("/check-unique/", {
          params: { email },
        });
        setIsEmailUnique(response.data.is_email_unique);
        if (!response.data.is_email_unique) {
          setError("email", {
            type: "manual",
            message: "Email already exists",
          });
        }
      }
    };

    checkUniqueness();
    checkEmailUniqueness();
  }, [username, email, setError]);
  const onSubmit = async (data) => {
    try {
      // Submit form data to API endpoint
      await client.post("/register/", data);
      notifySuccess("Registration successful!");
      navigate("/signin");
      reset();
    } catch (error) {
      notifyError("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      {/* Left side - Sign Up Form */}
      <div className="signup-form">
        <div className="flex flex-col justify-center items-center">
          <img
            src="/images/logo.png"
            alt="Your Logo"
            className="p-5"
            style={{ width: "150px", height: "140px" }}
          />
          <p className="text-2xl font-bold font-sans">FileGuard</p>
        </div>
        {/* Sign Up Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label>First Name*</label>
            <input
              id="first_name"
              type="text"
              placeholder="Ex: John"
              className={`${getBorderColor(
                "first_name",
                errors,
                touchedFields
              )}`}
              {...register("first_name", {
                required: "First Name is required",
              })}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label>Last Name*</label>
            <input
              id="last_name"
              type="text"
              placeholder="Ex: Doe"
              className={`${getBorderColor(
                "last_name",
                errors,
                touchedFields
              )}`}
              {...register("last_name", {
                required: "Last Name is required",
              })}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label>Username*</label>
            <input
              id="username"
              type="text"
              placeholder="Ex: johndoe123"
              className={`${getBorderColor("username", errors, touchedFields)}`}
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label>Email Address*</label>
            <input
              id="email"
              type="email"
              placeholder="mail@example.com"
              style={{ margin: 0 }}
              className={` ${getBorderColor("email", errors, touchedFields)}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label>Password*</label>
            <input
              id="password"
              type="password"
              placeholder="Min. 8 characters"
              style={{ margin: 0 }}
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
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>

          <p className="existing-account">
            Already have an account? <Link to={"/signin"}>Sign In</Link>
          </p>
        </form>
      </div>

      {/* Right side - Image */}
      <div
        className="signup-image"
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

export default SignUp;
