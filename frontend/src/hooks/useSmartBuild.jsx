
import axios from 'axios';
import {useFormContext} from '../context/FormContext';

const useSmartBuild = () => {
    const API_BASE_URL=import.meta.env.VITE_SERVER_API_URL
    const { formData, setFormData } = useFormContext();
    const getReply = async (message) => {
        try {
            console.log("Ai Message", message); // AI MESSAGE
            const response = await axios.post(`${API_BASE_URL}/message`, message,{
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
            console.log("Response", response);
            console.log("Extracted Data", response.data.extracted_data);
            setFormData(response.data.extracted_data)
            return response.data
        }catch(err){
            console.log("ERROR",err)
            return err
        }
    }

    return {getReply}

};

export default useSmartBuild