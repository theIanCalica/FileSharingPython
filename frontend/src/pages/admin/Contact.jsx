import React, { useState, useEffect } from "react";
import client from "../../utils/client";
import { notifySuccess, notifyError, formatDate } from "../../utils/Helpers";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Menu, MenuItem, IconButton } from "@mui/material";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  // Open and close modal
  const openModal = (contact = null) => {
    selectedContact(contact);
    setIsEditing(!!contact); // If a user is passed, set editing to true
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact(null);
    setIsEditing(false);
  };

  const fetch_contacts = async () => {
    await client
      .get("/contact-list/")
      .then((response) => {
        console.log(response.data);
        setContacts(response.data);
      })
      .catch((error) => {
        notifyError("Error fetching contacts");
      });
  };

  const handleMenuClick = (event, contact) => {
    setAnchorEl(event.currentTarget);
    setSelectedContact(contact);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // setSelectedUser(null);
  };

  const handleEdit = () => {
    openModal(selectedContact); // Your function to open the modal
    handleMenuClose();
  };
  useEffect(() => {
    fetch_contacts();
  }, []);
  return (
    <>
      <div className="px-3 mt-8">
        <h1 className="font-bold font-serif text-2xl">List of Contacts</h1>
        <div className="mt-4 bg-white p-4 shadow-md rounded-lg">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">ID</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Message</th>
                <th className="py-2 px-4 border-b text-left">Sent at</th>
                <th className="py-2 px-4 border-b text-left">Updated at</th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-slate-50">
                  <td className="py-2 px-4 border-b">{contact.id}</td>
                  <td className="py-2 px-4 border-b">{contact.name}</td>
                  <td className="py-2 px-4 border-b">{contact.email}</td>
                  <td className="py-2 px-4 border-b">{contact.message}</td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(contact.created_at)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(contact.updated_at)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <IconButton
                      onClick={(event) => handleMenuClick(event, contact)}
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
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Contact;
