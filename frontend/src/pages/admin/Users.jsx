import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { notifyError, notifySuccess, formatDate } from "../../utils/Helpers";
import UserModal from "../../components/Admin/Modal/UserModal";
import axios from "axios";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_LINK}/user`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
      });
  };

  // Open and close modal
  const openModal = (user = null) => {
    setSelectedUser(user);
    setIsEditing(!!user); // If a user is passed, set editing to true
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
    setIsEditing(false);
  };

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // setSelectedUser(null);
  };

  const handleEdit = () => {
    openModal(selectedUser); // Your function to open the modal
    handleMenuClose();
  };

  const handleUserChange = async () => {
    try {
      fetchUsers();
    } catch (err) {
      console.error("Error updating contact:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeactivate = async (userID) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Deactivating this user will restrict their access. You can reactivate the account at any time.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deactivate it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      axios
        .put(`${process.env.REACT_APP_API_LINK}/users/deactivate/${userID}`)
        .then((response) => {
          if (response.status === 200) {
            notifySuccess("Successfully deactivated");
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user._id === userID ? { ...user, status: "Deactivated" } : user
              )
            );
          } else {
            notifyError("Deactivation Unsuccessful");
          }
        })
        .catch((error) => {
          notifyError("Something went wrong");
          console.error(error.message);
        });
    }
  };

  const handleActivate = async (userID) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Activating this user will restore their access.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, activate it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      axios
        .put(`${process.env.REACT_APP_API_LINK}/users/activate/${userID}`)
        .then((response) => {
          if (response.status === 200) {
            notifySuccess("Successfully activated");
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user._id === userID ? { ...user, status: "activated" } : user
              )
            );
          } else {
            notifyError("Activation Unsuccessful");
          }
        })
        .catch((error) => {
          notifyError("Something went wrong");
          console.error(error.message);
        });
    }
  };

  const handleDelete = async (userID) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      axios
        .delete(`${process.env.REACT_APP_API_LINK}/users/${userID}`)
        .then((response) => {
          if (response.status === 200) {
            notifySuccess("Successfully Deleted");
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user._id !== userID)
            );
          } else {
            notifyError("Deletion Unsuccessful");
          }
        })
        .catch((error) => {
          notifyError("Something went wrong");
          console.error(error.message);
        });
    }
  };

  const formatRole = (role) => {
    if (role === "serviceCrew") {
      return "Service Crew";
    }
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between">
        <h1 className="font-bold font-serif text-2xl">Users</h1>
        <p style={{ fontSize: "13.5px" }}>
          <span className="text-blue-500 hover:underline">Users</span>
        </p>
      </div>
      <button
        onClick={() => openModal()} // Open modal for adding new user
        className="mt-5 px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
      >
        Add User
      </button>

      {isModalOpen && (
        <UserModal
          userToEdit={selectedUser}
          isEditing={isEditing}
          onClose={closeModal}
          onUserCreated={handleUserChange}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
          refresh={fetchUsers}
        />
      )}

      {/* Displays users in a table */}
      <div className="mt-4 bg-white p-4 shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">First Name</th>
              <th className="py-2 px-4 border-b text-left">Last Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Last Login</th>
              <th className="py-2 px-4 border-b text-left">Role</th>
              <th className="py-2 px-4 border-b text-left">Profile</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          {/* <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50">
                <td className="py-2 px-4 border-b">{user._id}</td>
                <td className="py-2 px-4 border-b">
                  {user.fname + " " + user.lname}
                </td>
                <td className="py-2 px-4 border-b">
                  {user.dob ? formatDate(user.dob) : null}
                </td>

                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.phoneNumber}</td>
                <td className="py-2 px-4 border-b">{formatRole(user.role)}</td>
                <td className="py-2 px-4 border-b">
                  {formatRole(user.status)}
                </td>
                <td>
                  {user.profile ? (
                    <img
                      src={user.profile.url}
                      alt="User Profile"
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <img
                      src="/images/default"
                      alt="Default Profile"
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <IconButton
                    onClick={(event) => handleMenuClick(event, user)}
                    className="p-1 rounded-full bg-transparent text-gray-500 hover:text-black transition duration-200 ease-in-out"
                  >
                    <MoreVertIcon />
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleEdit}>
                      <EditOutlinedIcon className="mr-2" /> Edit
                    </MenuItem>
                    {selectedUser?.status === "activated" ? (
                      <MenuItem
                        onClick={() => handleDeactivate(selectedUser._id)}
                      >
                        <NoAccountsIcon className="mr-2" /> Deactivate
                      </MenuItem>
                    ) : (
                      <MenuItem
                        onClick={() => handleActivate(selectedUser._id)}
                      >
                        <NoAccountsIcon className="mr-2" /> Activate
                      </MenuItem>
                    )}
                    <MenuItem onClick={() => handleDelete(selectedUser._id)}>
                      <DeleteOutlineOutlinedIcon className="mr-2" /> Delete
                    </MenuItem>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UsersPage;
