import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL;

const useLinkedIn = () => {
  const [file, setFile] = useState(null);

  const getLinkedIn = async (pdf) => {
    try {
        console.log("Sending this PDF:",pdf);
        const formData= new FormData();
        formData.append("uploadFile",pdf);
        const response= await axios.post(`${API_BASE_URL}/linkedin`,formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    console.log("Response", response.data);
    return response.data
    } catch (error) {
      console.error(error);

    }
  };

  return { getLinkedIn };
};

export default useLinkedIn;
