import { createContext,useContext, useState } from "react";

const AiContext = createContext();

export const AiContextProvider = ({ children }) => {

    const [job_roles, setJobRole] = useState([]);
    const [job_listing, setJobListing] = useState({});
    const [job_loading, setJobLoading] = useState(false);
    return (
    <AiContext.Provider value={{job_roles, setJobRole,job_listing, setJobListing,job_loading, setJobLoading}}>
        {children}
    </AiContext.Provider>
    );
};
export const useAiContext = () => useContext(AiContext);