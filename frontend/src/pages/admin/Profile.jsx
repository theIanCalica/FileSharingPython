import React, { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser, formatDate } from "../../utils/Helpers";
import ProfileModal from "../../components/Admin/Modal/Profile";
import ChangePasswordModal from "../../components/Admin/Modal/ChangePasswordModal";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const user = getUser();

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-8">
      {/* Page Header */}
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold font-serif">Admin Profile</h1>
        <p className="text-sm text-gray-500">
          <span className="text-blue-500 hover:underline">Home</span> /
          <span> Profile</span>
        </p>
      </div>

      {/* Profile Information Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Profile Image */}
            <img
              // src={user.profile.url}
              alt="Profile"
              className="rounded-full w-24 h-24 object-cover"
            />
            {/* User Details */}
            <div>
              <h2 className="text-xl font-semibold">
                {user.fname + " " + user.lname}
              </h2>
              <p className="text-gray-600">
                {user?.email || "admin@example.com"}
              </p>
              <p className="text-gray-600 font-semibold capitalize">
                Role: {user?.role || "admin"}
              </p>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleEditProfile}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-1"
            >
              <EditOutlinedIcon /> <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Profile Details</h3>
          <div className="text-gray-600 space-y-2">
            <p>
              <strong>Name:</strong> {user.fname + " " + user.lname || "N/A"}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {user?.dob ? formatDate(user.dob) : "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {user?.email || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {user?.phoneNumber || "N/A"}
            </p>
          </div>
          {/* Change Password Button */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleOpenPasswordModal}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Linked Accounts Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Linked Accounts</h3>
          <div className="text-gray-600 space-y-2">
            <p>
              <strong>Facebook:</strong>{" "}
              {user?.linkedAccounts?.facebook || "Not Linked"}
              {!user?.linkedAccounts?.facebook && (
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 ml-4 rounded-md">
                  Link Facebook
                </button>
              )}
            </p>
            <p>
              <strong>Google:</strong>{" "}
              {user?.linkedAccounts?.google || "Not Linked"}
              {!user?.linkedAccounts?.google && (
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 ml-4 rounded-md">
                  Link Google
                </button>
              )}
            </p>
            <p>
              <strong>Twitter:</strong>{" "}
              {user?.linkedAccounts?.twitter || "Not Linked"}
              {!user?.linkedAccounts?.twitter && (
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 ml-4 rounded-md">
                  Link Twitter
                </button>
              )}
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />
      {isModalOpen && (
        <ProfileModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={user}
        />
      )}
      {isPasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={handleClosePasswordModal}
        />
      )}
    </div>
  );
};

export default Profile;
