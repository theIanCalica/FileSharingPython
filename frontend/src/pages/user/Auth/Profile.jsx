import React from "react";
import { getUser } from "../../../utils/Helpers";

const Profile = () => {
  const user = getUser();

  return (
    <>
      <h1 className="font-bold font-sans text-2xl text-center">My Profile</h1>
      <div className="flex justify-center items-start min-h-screen">
        <div className="relative p-6 rounded-lg w-80 text-center mb-4">
          {/* Container for image and inputs */}
          <div className="relative mb-4">
            {/* Adding margin bottom for spacing between image and icon */}
            <img
              src={"/images/image-slide-1.jpeg"}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-2 object-cover"
            />
            <i className="fi fi-tr-camera text-white bg-blue-500 rounded-full p-1 absolute bottom-2 left-1/2 transform -translate-x-1/2 text-base shadow-lg"></i>
          </div>
          {/* Inputs Section */}
          <div className="flex flex-wrap justify-between w-full max-w-2xl px-4">
            <div className="w-full md:w-1/2 mb-4">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={user.first_name}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="w-full md:w-1/2 mb-4">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={user.last_name}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="w-full md:w-1/2 mb-4">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={user.username}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="w-full md:w-1/2 mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
