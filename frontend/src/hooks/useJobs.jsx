import { useState } from "react";
import axios from "axios";
import { useFormContext } from "../context/FormContext";
import { useAiContext } from "../context/AiContext";
const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL;

const useJobs = () => {
    const {setJobLoading}=useAiContext()
    const getJobListing = async (job_role, job_location) => {
    const formatted_job_role = job_role.map(role => role.replaceAll(' ', '')).join(', ');
        try{
        print("SENDING THIS DATA:",job_role[0])
        //set the globalAIcontext loading true
        setJobLoading(true);

        const response= await axios.get(`${API_BASE_URL}/job-recommendations`,{
            params: {
                job_role:job_role[0],
                job_location
            }
        });
        console.log("SENT")
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
    return{getJobListing}
};

export default useJobs;
