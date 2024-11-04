import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Select from "react-select"; // Importing react-select
import { getUser, notifySuccess, notifyError } from "../../../utils/Helpers";
import { ToastContainer } from "react-toastify";

const ContactModal = ({ onClose, onOpen, contact }) => {
  const {
    register,
    handleSubmit,
    reset, // Added to reset form values
    formState: { errors, touchedFields },
  } = useForm();

  // Use useEffect to set the form values when contact changes
  useEffect(() => {
    console.log(contact);
    reset({
      name: contact?.name || "",
      email: contact?.email || "",
      message: contact?.message || "",
      status: contact?.status || null,
    });
  }, [contact, reset]);

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
        notifySuccess("Contact updated successfully!"); // Updated success message
        onClose(); // Close the modal on success
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

  // Options for the status select
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "resolved", label: "Resolved" },
  ];

  // Return null if the modal is not open
  if (!onOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Contact Details</h2>{" "}
        {/* Updated title */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-200"
              {...register("name")}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-200"
              {...register("email")}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-200"
              {...register("message")}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 mb-2">
              Status
            </label>
            <Select
              id="status"
              options={statusOptions}
              defaultValue={statusOptions.find(
                (option) => option.value === contact?.status
              )}
              {...register("status")}
            />
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
              className="px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
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

export default ContactModal;
