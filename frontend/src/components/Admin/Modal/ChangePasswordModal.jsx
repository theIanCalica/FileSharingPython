import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getUser, notifyError, getBorderColor } from "../../../utils/Helpers";
import { ToastContainer } from "react-toastify";

const ChangePasswordModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm();

  const onSubmit = (data) => {
    const user = getUser();
    data.user = user;
    console.log(data);

    axios
      .put(`${process.env.REACT_APP_API_LINK}/auth/changePassword`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage = error.response.data.msg;
          console.log(errorMessage);
          notifyError(errorMessage);
        } else {
          console.log(error.message);
          notifyError(error.message);
        }
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Current Password
            </label>
            <input
              id="current"
              type="password"
              className={`w-full px-3 py-2 border rounded-md ${getBorderColor(
                "current",
                errors,
                touchedFields
              )}`}
              {...register("current", {
                required: "Current Password is required",
              })}
            />
            {errors.current && (
              <p className="text-red-500 text-sm mt-1">
                {errors.current.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              className={`w-full px-3 py-2 border rounded-md ${getBorderColor(
                "newPassword",
                errors,
                touchedFields
              )}`}
              {...register("newPassword", {
                required: "New Password is required",
              })}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirm"
              type="password"
              className={`w-full px-3 py-2 border rounded-md ${getBorderColor(
                "confirm",
                errors,
                touchedFields
              )}`}
              {...register("confirm", {
                required: "Confirm Password is required",
              })}
            />
            {errors.confirm && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-gray-500 border border-gray-300 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md font-semibold border-2 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChangePasswordModal;
