import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import {
  notifyError,
  notifySuccess,
  formatDate,
  getBorderColor,
} from "../../../utils/Helpers";
import { Box } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

const UserModal = ({
  onClose,
  notifySuccess,
  notifyError,
  userToEdit,
  isEditing,
  refresh,
}) => {
  const checkEmail = async (email) => {
    try {
      const response = await fetch("/api/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log(data.message);
        return true;
      } else if (response.status === 400) {
        console.error(data.message);
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phoneNumber: "",
      dob: null,
      role: null,
      password: "",
    },
  });

  useEffect(() => {
    console.log("userToEdit:", userToEdit);
    if (isEditing && userToEdit) {
      reset({
        fname: userToEdit.fname,
        lname: userToEdit.lname,
        email: userToEdit.email,
        phoneNumber: userToEdit.phoneNumber,
        role: options.find((option) => option.value === userToEdit.role),
        dob: userToEdit.dob ? dayjs(userToEdit.dob) : null,
      });
    }
  }, [isEditing, userToEdit, reset]);

  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [isPhoneNumberUnique, setIsPhoneNumberUnique] = useState(true);

  const options = [
    { value: "customer", label: "Customer" },
    { value: "serviceCrew", label: "Service Crew" },
  ];

  const onSubmit = (data) => {
    if (!isEmailUnique || !isPhoneNumberUnique) {
      notifyError("Email or Phone Number must be unique");
      return;
    }

    const user = {
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      phoneNumber: data.phoneNumber,
      role: data.role.value,
      dob: data.dob.toISOString(),
      password: data.password,
      status: "activated",
    };

    console.log(user);

    const url = isEditing
      ? `${process.env.REACT_APP_API_LINK}/users/${userToEdit._id}`
      : `${process.env.REACT_APP_API_LINK}/users`;
    const method = isEditing ? "PUT" : "POST";
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
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit User" : "Add User"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="mb-4">
            <label htmlFor="fname" className="block text-gray-700 mb-2">
              First Name
            </label>
            <input
              id="fname"
              type="text"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md h-14 ${getBorderColor(
                "fname",
                errors,
                touchedFields
              )}`}
              {...register("fname", { required: "First Name is required" })}
            />
            {errors.fname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fname.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lname" className="block text-gray-700 mb-2">
              Last Name
            </label>
            <input
              id="lname"
              type="text"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md h-14 ${getBorderColor(
                "lname",
                errors,
                touchedFields
              )}`}
              {...register("lname", { required: "Last Name is required" })}
            />
            {errors.lname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lname.message}
              </p>
            )}
          </div>
          {/* Date of Birth */}
          <div className="mb-4">
            <label htmlFor="dob" className="block text-gray-700 mb-2">
              Date of Birth
            </label>
            <Controller
              name="dob"
              rules={{ required: "Date of Birth is required" }}
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="w-full">
                    <Box
                      sx={{
                        width: "100%", // Ensure Box takes full width of its container
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px", // Custom border radius
                          width: "100%",
                          "& fieldset": {
                            borderColor: errors.dob ? "#f87171" : "#e5e7eb", // Conditional border color
                          },
                          "&:hover fieldset": {
                            borderColor: errors.dob ? "#f87171" : "#0056b3", // Conditional border color on hover
                          },
                        },
                      }}
                    >
                      <DatePicker
                        {...field}
                        className="MuiDayCalendar-header MuiDayCalendar-weekContainer"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth // Make the TextField take up all available space
                            onBlur={() => field.onBlur()}
                          />
                        )}
                      />
                    </Box>
                  </div>
                </LocalizationProvider>
              )}
            />

            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="text"
              {...register("email", {
                required: "Email is required",
                unique: async (value) => {
                  const isUnique = await checkEmail(value);
                  if (!isUnique) {
                    setError("email", {
                      type: "manual",
                      message: "Email is already taken",
                    });
                  }
                  return isUnique || "Email is already taken";
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
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md h-14 ${getBorderColor(
                "phoneNumber",
                errors,
                touchedFields
              )}`}
              {...register("phoneNumber", {
                required: "Phone Number is required",
                pattern: {
                  value: /^((09)|(\+639))\d{9}$/,
                  message: "Invalid phone number format",
                },
                onChange: async (value) => {
                  console.log(value);
                },
              })}
              maxLength={11}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 mb-2">
              Role
            </label>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select
                  placeholder={"Select a Role"}
                  {...field}
                  options={options}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption); // Trigger react-hook-form's onChange
                    field.onBlur(); // Mark field as touched
                  }}
                  onBlur={() => field.onBlur()} // Mark field as touched
                  className={`w-full ${getBorderColor(
                    "select",
                    errors,
                    touchedFields
                  )}`}
                  isClearable
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      height: "3.5rem", // Adjust height here
                      minHeight: "3.5rem", // Ensure minimum height
                      borderColor: errors.role
                        ? "#f87171"
                        : provided.borderColor,
                      boxShadow: state.isFocused
                        ? "0 0 0 1px #4ade80"
                        : provided.boxShadow,
                    }),
                    valueContainer: (provided) => ({
                      ...provided,
                      height: "100%", // Align container height
                      padding: "0 0.75rem", // Adjust padding
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      height: "100%", // Align single value height
                      lineHeight: "3.5rem", // Center text vertically
                    }),
                    indicator: (provided) => ({
                      ...provided,
                      height: "100%", // Align indicator height
                      padding: "0", // Remove extra padding
                    }),
                    indicatorsContainer: (provided) => ({
                      ...provided,
                      height: "100%", // Align indicators container height
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 9999, // Ensure the dropdown is on top of other elements
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      textAlign: "left", // Align text to the left
                      display: "flex",
                      alignItems: "center", // Center text vertically
                      backgroundColor: state.isSelected
                        ? "#4ade80"
                        : provided.backgroundColor, // Tailwind color
                      color: state.isSelected ? "#fff" : provided.color,
                      "&:hover": {
                        backgroundColor: "#d1d5db", // Tailwind color on hover
                      },
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#9ca3af", // Tailwind text-gray-400 color
                    }),
                  }}
                />
              )}
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
          <div className="mb-4 col-span-2">
            {" "}
            {/* Use col-span-2 to take both columns */}
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md h-14 ${getBorderColor(
                "password",
                errors,
                touchedFields
              )}`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
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
              {isEditing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
