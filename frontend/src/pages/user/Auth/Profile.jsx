import React, { useState, useRef } from "react";
import {
  getProfile,
  getUser,
  notifyError,
  notifySuccess,
  setProfile,
} from "../../../utils/Helpers";
import ChangePassword from "../../../components/User/Auth/Modals/ChangePassword";
import client from "../../../utils/client";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const user = getUser();
  const [profile, setProfileState] = useState(getProfile()); // Use state to manage profile
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const handleDelete = async (userID) => {
    console.log(userID);
    try {
      await client.delete(
        `${process.env.REACT_APP_API_LINK}/users/${userID}/`,
        {
          withCredentials: true,
        }
      );
      navigate("/"); // Redirect after successful deletion
      notifySuccess("Account successfully deleted");
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("profile_picture", file);

      try {
        // Send the file to the backend
        const response = await client.post(
          `${process.env.REACT_APP_API_LINK}/profile/change-picture/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true, // If your API requires credentials
          }
        );
        // Update the profile image URL immediately
        setProfileState({
          ...profile,
          url: response.data.profile.url, // Update the profile with new image URL
        });

        setProfile(response.data); // Save updated profile globally
        console.log("Profile picture updated:", response.data.profile);
        window.location.reload();
        notifySuccess("Profile picture updated!");
      } catch (error) {
        console.error("Error updating profile picture:", error);
        notifyError("Failed to update profile picture.");
      }
    }
  };

  const openFileExplorer = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <h1 className="font-bold font-sans text-2xl text-center my-6">
        My Profile
      </h1>
      <div className="flex flex-col items-center min-h-screen px-4">
        <div className="w-full max-w-md text-center mb-6">
          <div className="relative mb-6">
            <img
              src={profile.url}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-2 object-cover"
            />
            <i
              className="fi fi-tr-camera text-white bg-blue-500 rounded-full p-2 absolute bottom-2 left-1/2 transform -translate-x-1/2 text-base shadow-lg cursor-pointer"
              onClick={openFileExplorer}
            ></i>
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-sm font-medium">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={user.first_name}
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-sm font-medium">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={user.last_name}
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={user.username}
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </div>
        </div>
        {/* Buttons Section */}
        <div className="flex flex-col md:flex-row gap-4 mt-6 w-full max-w-2xl px-4">
          <button
            className="w-full md:w-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleOpenPasswordModal}
          >
            Change Password
          </button>
          <button
            onClick={() => handleDelete(user.id)}
            className="w-full md:w-auto bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
        {isPasswordModalOpen && (
          <ChangePassword
            isOpen={isPasswordModalOpen}
            onClose={handleClosePasswordModal}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
