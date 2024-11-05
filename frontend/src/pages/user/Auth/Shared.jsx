import React, { useState } from "react";
import { notifyError } from "../../../utils/Helpers";
import client from "../../../utils/client";

const Shared = () => {
  const [sharedFiles, setSharedFiles] = useState([]);

  const fetchSharedFiles = async () => {
    try {
      await client
        .get(`${process.env.REACT_APP_API_LINK}/shared-files`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          setSharedFiles(response.data);
        });
    } catch (err) {
      notifyError("Error fetching files");
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="font-sans font-bold text-3xl mb-6 text-gray-700">
        Shared with me
      </h2>
      <div></div>
    </div>
  );
};

export default Shared;
