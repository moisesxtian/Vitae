import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL;


const useForm = () => {
  const sendFormData = async (sendingData) => {
    try {
      console.log("USE FORM:,",sendingData);
      const response = await axios.post(`${API_BASE_URL}/submit`, {
        formData: sendingData.formData,
        selected_template: sendingData.selected_template
      },{responseType: 'blob'});
      
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
