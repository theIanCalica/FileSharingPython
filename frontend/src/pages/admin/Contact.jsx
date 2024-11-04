import React, { useState, useEffect } from "react";
import client from "../../utils/client";
import { notifySuccess, notifyError } from "../../utils/Helpers";
const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const fetch_contacts = async () => {
    await client
      .get("/contact-list/")
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        notifyError("Error fetching contacts");
      });
  };

  useEffect(() => {
    fetch_contacts();
  }, []);
  return (
    <>
      <div>
        <h1>Fetch Contacts</h1>
      </div>
    </>
  );
};

export default Contact;
