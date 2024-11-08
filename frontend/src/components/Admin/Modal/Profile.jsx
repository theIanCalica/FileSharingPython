import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import client from "../../../utils/client";

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
      const response = await client.put(
        `${process.env.REACT_APP_API_LINK}/users/check-unique/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [field]: value }),
        }
      );
      const data = await response.json();
      return data.isUnique;
    } catch (error) {
      console.error("Error checking uniqueness:", error);
      return false;
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
      notifyError("Email or Username must be unique");
      return;
    }

    const userData = {
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      username: data.username,
    };

    const url = `${process.env.REACT_APP_API_LINK}/users/${user._id}`;
    const method = "PUT";

    client({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: userData,
      withCredentials: true,
    })
      .then((response) => {
        refresh();
        notifySuccess(
          isEditing ? "User updated successfully" : "User created successfully"
        );
        onClose();
      })
      .catch((error) => {
        notifyError(isEditing ? "Error updating user" : "Error creating user");
        console.error(error.response ? error.response.data : error.message);
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-14"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-14"
              {...register("lname", { required: "Last Name is required" })}
            />
            {errors.lname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lname.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-14"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: async (value) => {
                  const isUnique = await checkUnique(value, "email");
                  if (!isUnique) {
                    setError("email", {
                      type: "manual",
                      message: "Email is already in use",
                    });
                    return false;
                  } else {
                    return true;
                  }
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-14"
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
