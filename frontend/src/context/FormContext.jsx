import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : {
          firstName: "",
          middleInitial: "",
          lastName: "",
          phone: "",
          city: "",
          email: "",
          state: "",
          summary: "",
          linkedin: "",
          projects: [],
          certifications: [],
          education: [],
          experience: [],
          skills: [],
        };
  });
  const [pdfBlob, setPdfBlob] = useState(null);

  return (
    <FormContext.Provider value={{ formData, setFormData, pdfBlob, setPdfBlob }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
