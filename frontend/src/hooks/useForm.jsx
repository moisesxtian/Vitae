import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL;


const useForm = (formData) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const sendFormData = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {

      const response = await axios.post(`${API_BASE_URL}/submit`, formData);
      if (response.status === 200) {
        setSuccessMessage(response.data.message || "Form submitted successfully!");
        return response.data; // Return the response data for further processing if needed
      } else {
        setErrorMessage("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("An error occurred while submitting the form.");
    }
  };

  return {
    sendFormData,
  };
};

export default useForm;
