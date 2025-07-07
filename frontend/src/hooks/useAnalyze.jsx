import { useState } from "react";
import axios from "axios";
import { useFormContext } from "../context/FormContext";

const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL;

const useAnalyze = () => {
  const { formData } = useFormContext();
  const [overview, setOverview] = useState(null);
  const [finalFormData, setFinalFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeResume = async () => {
    try{
      const response=await axios.post(`${API_BASE_URL}/analyze`, formData);
      const parsed=JSON.parse(response.data);
      console.log(parsed);
      return response
    }
    catch(err){
      console.log(err);
    }
  };

  return { analyzeResume, overview, loading, error, finalFormData }; // Also return finalFormData if you need it
};

export default useAnalyze;