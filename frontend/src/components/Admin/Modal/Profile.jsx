import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { getBorderColor } from "../../../utils/Helpers";
import { Box } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

const Profile = ({
  onClose,
  notifySuccess,
  notifyError,
  user,
  isEditing,
  refresh,
}) => {
  const checkUnique = async (value, field) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_LINK}/users/check-unique`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [field]: value }),
        }
      );
      const data = await response.json(); // Await the JSON response
      console.log(data.isUnique); // Logging for debugging
      return data.isUnique; // Return the result of the API call
    } catch (error) {
      console.error("Error checking uniqueness:", error);
      return false; // Return false in case of an error
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      username: "",
    },
  });

  useEffect(() => {
    console.log("userToEdit:", user);
    if (user) {
      reset({
        fname: user.first_name,
        lname: user.last_name,
        email: user.email,
        username: user.username,
      });
    }
  }, [user, reset]);

  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);

  const onSubmit = (data) => {
    if (!isEmailUnique || !isUsernameUnique) {
      notifyError("Email or Phone Number must be unique");
      return; // Prevent submission
    }

    const user = {
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      username: data.username,
    };

    const url = `${process.env.REACT_APP_API_LINK}/users/${user._id}`;
    const method = "PUT";

    axios({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    })
      .then((response) => {
        const user = response.data;
        refresh();
        notifySuccess(
          isEditing ? "User updated successfully" : "User created successfully"
        );
        onClose();
      })
      .catch((error) => {
        notifyError(isEditing ? "Error updating user" : "Error creating user");
        console.error(
          isEditing ? "Error updating user:" : "Error creating user:",
          error.response ? error.response.data : error.message
        );
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Update Profile</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-gray-700 mb-2">
              First Name
            </label>
            <input
              id="first_name"
              type="text"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md h-14 ${getBorderColor(
                "first_name",
                errors,
                touchedFields
              )}`}
              {...register("first_name", {
                required: "First Name is required",
              })}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-gray-700 mb-2">
              Last Name
            </label>
            <input
              id="last_name"
              type="text"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md h-14 ${getBorderColor(
                "last_name",
                errors,
                touchedFields
              )}`}
              {...register("last_name", { required: "Last Name is required" })}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.last_name.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Last Name
            </label>
            <input
              id="username"
              type="text"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md h-14 ${getBorderColor(
                "username",
                errors,
                touchedFields
              )}`}
              {...register("username", { required: "Last Name is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="text"
              {...register("email", {
                required: "Email is required",
                validate: async (value) => {
                  const isUnique = await checkUnique(value, "email");
                  console.log(isUnique);
                  if (!isUnique) {
                    setError("email", {
                      type: "manual",
                      message: "Email is already in use",
                    });
                    return false; // Return false to indicate validation failure
                  } else {
                    return true;
                  }
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
              })}
              className={`w-full px-3 py-2 border  border-gray-300 rounded-md h-14 ${getBorderColor(
                "email",
                errors,
                touchedFields
              )}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
            {!isEmailUnique && !errors.email && (
              <p className="text-red-500 text-sm mt-1">
                Email is already taken
              </p>
            )}
          </div>

          <div className="flex justify-end col-span-1 md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-gray-500 border border-gray-300 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
