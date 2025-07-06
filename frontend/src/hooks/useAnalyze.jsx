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
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/analyze`, formData);
      const parsed=JSON.parse(response.data);
      const { overview,...finalFormData } = parsed;
      console.log("finalFormData",finalFormData);
      setOverview(overview);
      return response.data;
    } catch (error) {
      console.error("Error analyzing resume:", error); // Log the full error for debugging
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { analyzeResume, overview, loading, error, finalFormData }; // Also return finalFormData if you need it
};

export default useAnalyze;