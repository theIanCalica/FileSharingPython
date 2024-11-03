import React, { useEffect, useState } from "react";
import client from "../../../utils/client";
import { notifyError, notifySuccess } from "../../../utils/Helpers";

const Files = () => {
  const [files, setFiles] = useState([]);
  const [decryptedFiles, setDecryptedFiles] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);

  const fetchFiles = async () => {
    try {
      const response = await client.get("/files");
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const getFileTypeIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return "/images/pdf-icon.png";
      case "doc":
      case "docx":
        return "/images/word-icon.png";
      case "jpg":
      case "jpeg":
      case "png":
        return "/images/image-icon.png";
      case "xls":
      case "xlsx":
        return "/images/excel-icon.png";
      default:
        return "/images/file-icon.png";
    }
  };

  const handleDecrypt = async (fileId) => {
    try {
      const response = await client.post(`/files/${fileId}/decrypt`);
      setDecryptedFiles((prev) => ({
        ...prev,
        [fileId]: response.data.decryptedUrl,
      }));
      setActiveDropdown(null); // Close dropdown after action
    } catch (error) {
      console.error("Error decrypting file:", error);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await client.delete(`/files/${fileId}/delete/ `);
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
      notifySuccess("Successfully Deleted");
      setActiveDropdown(null); // Close dropdown after action
    } catch (err) {
      notifyError("Error deleting file");
      console.error("Error deleting file:", err);
    }
  };

  const toggleDropdown = (fileId) => {
    setActiveDropdown(activeDropdown === fileId ? null : fileId); // Toggle the dropdown for the specific file
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <h2 className="font-sans font-bold text-2xl">My Files</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">File Icon</th>
            <th className="border px-4 py-2">File Name</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} className="text-center">
              <td className="border px-4 py-2 flex justify-center items-center">
                <img
                  src={getFileTypeIcon(file.file_type)}
                  alt="file icon"
                  style={{ width: 70, height: 70 }}
                />
              </td>
              <td className="border px-4 py-2">{file.file_name}</td>
              <td className="border px-4 py-2 relative">
                <button
                  onClick={() => toggleDropdown(file.id)}
                  className="text-gray-800 font-bold py-1 px-2 rounded-full"
                >
                  <i className="fi fi-br-menu-dots-vertical"></i>
                </button>
                {activeDropdown === file.id && (
                  <div
                    key={`dropdown-${file.id}`} // Add unique key for the dropdown
                    className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10"
                    style={{ position: "absolute" }}
                  >
                    <button
                      onClick={() => handleDecrypt(file.id)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Decrypt
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Files;
