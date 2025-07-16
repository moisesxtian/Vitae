import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : {
          profileImage: null,
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
  const [resume_template, setResumeTemplate] = useState("Classic");

  return (
    <FormContext.Provider value={{ formData, setFormData, pdfBlob, setPdfBlob ,resume_template, setResumeTemplate}}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
