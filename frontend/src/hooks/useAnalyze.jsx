import { useState } from "react";
import axios from "axios";
import { useFormContext } from "../context/FormContext";
import useForm from "../hooks/useForm";
const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL;

const useAnalyze = () => {

  const { formData, setPdfBlob } = useFormContext();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //SEND FORM DATA TO GROKK AI
  const analyzeResume = async () => {
    try{
      setLoading(true);
      const response=await axios.post(`${API_BASE_URL}/analyze`, formData);
      console.log(response)
      const parsed=await JSON.parse(response.data);
      console.log(parsed);
      setOverview(parsed.feedback.text);

      //PROCESS GROKK RESPONSE TO PDF BLOB
      const {sendFormData}=useForm(parsed.revisedFormData);
      const blob=await sendFormData()
      setPdfBlob(blob)
      console.log("BLOB:",blob)
      setLoading(false);
      return response
    }
    catch(err){
      console.log(err);
    }
  };

  return { analyzeResume, overview, loading, error}; // Also return finalFormData if you need it
};

export default useAnalyze;