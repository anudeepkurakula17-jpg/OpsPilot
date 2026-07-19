import { useState } from "react";
import { FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";
import API from "../services/api";

function UploadPanel() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const uploadFiles = async () => {
    if (files.length === 0) {
      alert("Please select one or more PDF files.");
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      setUploading(true);

      const res = await API.post("/upload/", formData);

      setUploadedFiles(res.data.uploaded_files);

      alert("✅ PDFs Uploaded Successfully");
      console.log(res.data);

    } catch (err) {
      console.error(err);
      alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card">

      <h3>Upload Documents</h3>

      <label className="upload-box">

        <FaCloudUploadAlt className="upload-icon" />

        <h4>Select PDF Files</h4>

        <p>You can upload multiple PDFs</p>

        <input
          hidden
          type="file"
          multiple
          accept=".pdf"
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />

      </label>

      {files.length > 0 && (
        <div className="selected-file">
          {files.map((file, index) => (
            <div key={index}>
              <FaFilePdf /> {file.name}
            </div>
          ))}
        </div>
      )}

      <button
        className="primary-btn"
        onClick={uploadFiles}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload PDFs"}
      </button>

      {uploadedFiles.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Uploaded Documents</h4>

          {uploadedFiles.map((doc, index) => (
            <div key={index} className="selected-file">
              <FaFilePdf />
              <span>{doc.filename}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default UploadPanel;

