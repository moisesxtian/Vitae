import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL;


const useForm = (formData) => {
  const sendFormData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/submit`, formData,{responseType: 'blob'});
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to submit the form.", response.status);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };
  
  return {
    sendFormData,
  };
};

export default useForm;
