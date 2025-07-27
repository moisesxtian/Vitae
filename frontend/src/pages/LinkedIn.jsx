import { useState } from "react";
import useLinkedIn from "../hooks/useLinkedIn";
import { useFormContext } from "../context/FormContext";
const LinkedIn = () => {
  const {setFormData} = useFormContext();
  const { getLinkedIn } = useLinkedIn();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isValidType =
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    const isValidSize = file.size <= 10 * 1024 * 1024;

    if (!isValidType) {
      setError("Only PDF or DOCX files are allowed.");
      return;
    }

    if (!isValidSize) {
      setError("File size must be 10MB or less.");
      return;
    }

    setError(null);
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    try {
      const response = await getLinkedIn(selectedFile);
      console.log("Setting Form data to:",response);
      const parsedResponse=JSON.parse(response);
      setFormData(parsedResponse);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8 m-auto">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Upload Your LinkedIn Profile
        </h2>

        <div className="flex flex-col items-center space-y-3">
          <label
            htmlFor="linkedinUpload"
            className="w-full cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-accent2 rounded-lg p-6 text-accent2 hover:border-accent hover:text-accent transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
              />
            </svg>
            <span className="text-sm font-medium">
              {selectedFile
                ? selectedFile.name
                : "Click to upload or drag and drop"}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              PDF or DOCX, up to 10MB
            </span>
            <input
              id="linkedinUpload"
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            onClick={handleUpload}
            className="w-full bg-accent2 text-white py-2 px-4 rounded-lg hover:bg-accent transition disabled:opacity-50"
            disabled={!selectedFile}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkedIn;
