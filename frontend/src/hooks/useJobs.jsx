import { useState } from "react";
import axios from "axios";
import { useFormContext } from "../context/FormContext";
import { useAiContext } from "../context/AiContext";
const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL;

const useJobs = () => {
    const {setJobLoading}=useAiContext()
    const [errorMessage, setErrorMessage] = useState("");
    const getJobListing = async (job_role, job_location) => {
    const formatted_job_role = job_role.map(role => role.replaceAll(' ', '')).join(', ');
        try{
        //set the globalAIcontext loading true
        setJobLoading(true);

        const response= await axios.get(`${API_BASE_URL}/job-recommendations`,{
            params: {
                job_role:job_role[0],
                job_location,
            }
        });
        if (response.data.message){
            setErrorMessage("I have reached my request limit for the Job Recommendation API, Sorry. the free plan was limited and i can't afford a paid plan yet.");
        }
        return response.data
        }
        catch(err){
            console.log("ERROR",err)
        }
        finally{
            //set the globalAIcontext loading false
            setJobLoading(false);
        }
    }
    return{getJobListing,errorMessage}
};

export default useJobs;
