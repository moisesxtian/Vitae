import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL;


const useForm = (formData) => {
  const sendFormData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/submit`, formData,{responseType: 'blob'});
      
      return response.data;
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  return {
    sendFormData,
  };
};

export default useForm;
