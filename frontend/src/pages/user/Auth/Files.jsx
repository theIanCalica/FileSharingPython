import React, { useEffect, useState } from "react";
import client from "../../../utils/client";
import { formatDate, notifyError, notifySuccess } from "../../../utils/Helpers";
import Swal from "sweetalert2";

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
        return "/images/docx-icon.png";
      case "jpg":
      case "jpeg":
      case "png":
        return "/images/image-icon.png";
      case "xls":
      case "xlsx":
        return "/images/excel-icon.png";
      case "mp3":
        return "/images/mp3-icon.png";
      case "mp4":
        return "/images/mp4-icon.png";
      case "zip":
        return "/images/zip-icon.png";
      default:
        return "/images/file-icon.png";
    }
  };

  const handleDecrypt = async (fileId) => {
    try {
      console.log(fileId);

      // Show the loading SweetAlert
      let timerInterval;
      Swal.fire({
        title: "Decrypting...",
        html: "Please wait while we decrypt your file. <b></b> milliseconds left.",
        timer: 8000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });

      // Make the API call to decrypt the file
      const response = await client.post(`/files/${fileId}/decrypt/`, null, {
        responseType: "blob", // Ensure the response type is set to blob
      });

      // Access Content-Disposition header
      const contentDisposition = response.headers["content-disposition"];
      if (!contentDisposition) {
        console.error("Content-Disposition header is null.");
        Swal.fire({
          icon: "error",
          title: "Download Failed",
          text: "File was decrypted but couldn't retrieve the file name.",
        });
        return;
      }

      // Extract the filename from the Content-Disposition header
      const filenameMatch = contentDisposition.match(/filename="?([^";]+)"?/);
      const filename =
        filenameMatch && filenameMatch[1]
          ? filenameMatch[1]
          : "downloaded_file";

      // Create a URL for the Blob response using the correct MIME type from the headers
      const blob = new Blob([response.data], {
        type: response.headers["content-type"], // Use the MIME type from the response
      });
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element and trigger download
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename; // Use the parsed filename
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url); // Clean up the URL object

      // Close the SweetAlert once the decryption is complete
      Swal.close();

      // Reset the active dropdown
      setActiveDropdown(null);
    } catch (error) {
      // Close the SweetAlert and show an error alert if the decryption fails
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Decryption Failed",
        text: "There was an error decrypting the file. Please try again.",
      });

      console.error("Error decrypting file:", error);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      // Show the loading SweetAlert
      let timerInterval;
      let millisecondsElapsed = 0;
      Swal.fire({
        title: "Deleting...",
        html: "Please wait while the file is being deleted. <b></b> milliseconds left.",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            millisecondsElapsed += 100; // Increment every 100 ms
            timer.textContent = `${millisecondsElapsed}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });

      // Make the API call to delete the file
      await client.delete(`/files/${fileId}/delete/`);

      // Update the file list
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));

      // Close the SweetAlert and show success notification
      Swal.close();
      notifySuccess("Successfully Deleted");

      // Reset the active dropdown
      setActiveDropdown(null);
    } catch (err) {
      // Close the SweetAlert and show an error alert if the deletion fails
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text: "There was an error deleting the file. Please try again.",
      });

      console.error("Error deleting file:", err);
      notifyError("Error deleting file");
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
            <th className="border px-4 py-2">Upload Date</th>
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
              <td className="border px-4 py-2">
                {formatDate(file.upload_date)}
              </td>
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
                      Decrypt and Download
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
