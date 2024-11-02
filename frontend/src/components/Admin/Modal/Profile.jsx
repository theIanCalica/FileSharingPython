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
    },
  });

  useEffect(() => {
    console.log("userToEdit:", user);
    if (user) {
      reset({
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dob: user.dob ? dayjs(user.dob) : null,
      });
    }
  }, [user, reset]);

  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [isPhoneNumberUnique, setIsPhoneNumberUnique] = useState(true);

  const onSubmit = (data) => {
    if (!isEmailUnique || !isPhoneNumberUnique) {
      notifyError("Email or Phone Number must be unique");
      return; // Prevent submission
    }

    const user = {
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      phoneNumber: data.phoneNumber,
      dob: data.dob.toISOString(),
    };

    console.log(user);

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
