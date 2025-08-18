import axios from "axios";

const webhookurl=import.meta.env.VITE_N8N_WEBHOOK_URL
const recordData =async  (formData) => {
try{
const response = axios.post(webhookurl, formData);
console.log("Data Sent Successfuly");
}catch (err){
    console.log("Error sending data:",err)
}
}

export default recordData