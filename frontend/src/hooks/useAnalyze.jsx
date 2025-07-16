import { useState } from "react";
import axios from "axios";
import { useFormContext } from "../context/FormContext";
import { useAiContext } from "../context/AiContext";
import useForm from "../hooks/useForm";

const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL;

const useAnalyze = () => {
  const { setJobRole } = useAiContext();
  const { formData, setFormData, setPdfBlob,resume_template} = useFormContext();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Utility: Strip image before sending to AI
  const stripImage = (data) => {
    const { profileImage="", ...rest } = data;
    return rest;
  };

  // SEND FORM DATA TO AI BACKEND
  const analyzeResume = async () => {
    try {
      setLoading(true);

      // Remove image from payload
      const aiPayload = stripImage(formData);
      console.log("AI Payload:", aiPayload);
      // Call AI analysis endpoint
      const response = await axios.post(`${API_BASE_URL}/analyze`, aiPayload);
      const parsed = JSON.parse(response.data);
      console.log("AI Response:", parsed);

      // Re-inject profileImage back into revisedFormData
      parsed.revisedFormData.profileImage = formData.profileImage;

      // Save and update local state/context
      localStorage.setItem("formData", JSON.stringify(parsed.revisedFormData));
      setFormData(parsed.revisedFormData);

      // Generate updated PDF blob
      const { sendFormData } = useForm();
      const wrapped = {
        formData: parsed.revisedFormData,
        selected_template: resume_template
      };
      console.log("WRAPPED:", wrapped);
      const blob = await sendFormData(wrapped);
      setPdfBlob(blob);

      // Store feedback text for display
      setOverview(parsed.feedback.text);
      setLoading(false);

      return parsed;
    } catch (err) {
      console.error("Analyze error:", err);
      setError(err);
      setLoading(false);
    }
  };

  return {
    analyzeResume,
    overview,
    loading,
    setLoading,
    error,
  };
};

export default useAnalyze;
