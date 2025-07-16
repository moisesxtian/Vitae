import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL
const useGetRole = () => {
    const getRole = async (formData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/job_role`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
            });

            return response.data
        } catch (error) {
            console.error(error)
        }
    }
    return { getRole }
}
export default useGetRole