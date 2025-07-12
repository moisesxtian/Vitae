import { useState } from "react";
import axios from "axios";
import { useFormContext } from "../context/FormContext";
import { useAiContext} from "../context/AiContext";
import useForm from "../hooks/useForm";
const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL;

const useAnalyze = () => {
  const {setJobRole}=useAiContext()
  const { formData,setFormData, setPdfBlob } = useFormContext();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //SEND FORM DATA TO GROKK AI
  const analyzeResume = async () => {
    try{
      setLoading(true);
      const response=await axios.post(`${API_BASE_URL}/analyze`, formData);
      const parsed=await JSON.parse(response.data);
      console.log(parsed);
      console.log("Gemini Response Type:",parsed);
      
      //PROCESS GROKK RESPONSE TO PDF BLOB
      const {sendFormData}=useForm(parsed.revisedFormData);
      //Update FormData
      localStorage.setItem("formData", JSON.stringify(parsed.revisedFormData));
      setFormData(parsed.revisedFormData);
      console.log("FORM DATA:",parsed.revisedFormData)
      const blob=await sendFormData()
      console.log("BLOB:",blob)
      setLoading(false);
      
      //SETING VALUES IN CONTEXT
      setPdfBlob(blob)
      setOverview(parsed.feedback.text);
      return parsed
    }
    catch(err){
      console.log(err);
      setLoading(false);
    }
  };

  return { analyzeResume, overview, loading,setLoading, error}; // Also return finalFormData if you need it
};

export default useAnalyze;