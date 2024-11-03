import React, { useEffect, useState } from "react";
import client from "../../../utils/client";
const Files = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      await client.get("/files").then((response) => {
        setFiles(response.data);
        console.log(response);
      });
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const getFileTypeIcon = (filename) => {
    const extension = filename.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return "/icons/pdf-icon.png"; // Replace with actual path to PDF icon
      case "doc":
      case "docx":
        return "/icons/word-icon.png"; // Replace with actual path to Word icon
      case "jpg":
      case "jpeg":
      case "png":
        return "/icons/image-icon.png"; // Replace with actual path to image icon
      case "xls":
      case "xlsx":
        return "/icons/excel-icon.png"; // Replace with actual path to Excel icon
      default:
        return "/icons/file-icon.png"; // Default file icon
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <h2 className="font-sans font-bold text-2xl">My Files</h2>
      <ul>
        {/* {files.map((file, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center" }}>
            <img
              src={getFileTypeIcon(file)}
              alt="file icon"
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            <span>{file.file_name}</span>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default Files;
