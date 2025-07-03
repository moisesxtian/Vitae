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

      const response = await axios.post(`${API_BASE_URL}/submit`, formData,{responseType: 'blob'});
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to submit the form.", response.status);
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
