import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  InformationForm,
  SummaryForm,
  EducationForm,
  ExperienceForm,
  SkillsForm,
  CertificationsForm,
  ProjectsForm,
} from "../components/Steps";
import PDFViewer from "../components/PDFViewer";
import useForm from "../hooks/useForm";
import {useFormContext} from "../context/FormContext"
const ManualBuild = () => {
  const { formData, setFormData } = useFormContext();

  const navigate = useNavigate();
  const{pdfBlob,setPdfBlob}=useFormContext();
  const { sendFormData } = useForm(formData);
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleDataFormat = (data)=>{

     const formattedData = {
      ...data,
    firstName: data.firstName.toUpperCase(),
    middleInitial: data.middleInitial.toUpperCase(),
    lastName: data.lastName.toUpperCase(),
    city: capitalizeFirstLetter(data.city),
    state: capitalizeFirstLetter(data.state),
    summary: capitalizeFirstLetter(data.summary),
    };
    setFormData(formattedData);
  };
  const isCurrentStepDataEmpty = () => {
    switch (step) {
      case 2: // SkillsForm
        return formData.skills.length === 0;
      case 3: // EducationForm
        return formData.education.length === 0;
      case 4: // ExperienceForm
        return formData.experience.length === 0;
      case 5: // ProjectsForm
        return formData.projects.length === 0;
      case 6: // CertificationsForm
        return formData.certifications.length === 0;
      case 7: // SummaryForm
        return !formData.summary.trim();
      default:
        return false; 
    }
  };

  const validateStepOne = () => {
    const containsOnlyLetters = (str) => /^[a-zA-Z]*$/.test(str);
    const isNotEmpty =
      formData.firstName.trim() !== "" &&
      formData.middleInitial.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "";
    const isLettersOnly =
      containsOnlyLetters(formData.firstName) &&
      containsOnlyLetters(formData.middleInitial) &&
      containsOnlyLetters(formData.lastName);

    if (!isNotEmpty) {
      setErrorMessage("All fields are required for personal information.");
      return false;
    }
    if (!isLettersOnly) {
      setErrorMessage(
        "First name, middle initial, and last name can only contain letters."
      );
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleNextStepClick = () => {
    if (step === 1) {
      if (validateStepOne()) {
        nextStep();
      }
    } else if (step < 7) {
      nextStep();
    }
  };

  //handle submit for the final step
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleDataFormat(formData);

    try {
      const response = await sendFormData();
      if (response) {
        console.log("Form submitted successfully!");
        setPdfBlob(response);
        navigate("/analyze");
      } else {
        setErrorMessage("Failed to submit the form. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    const handleKeyDown = (e) => {
      // Only proceed with Enter key if not on the last step or a modal is open
      if (e.key === "Enter" && step < 7  && !isLoading) {
        // Prevent default form submission if it's an input field
        if (e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'BUTTON') {
          e.preventDefault();
        }
        handleNextStepClick();
      } else if (e.key === "Enter" && step === 7 && !isLoading) {
        // For the last step, trigger submit on Enter
        e.preventDefault(); // Prevent default form submission
        handleSubmit(e); // Pass the event object
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [step , isLoading, formData]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <InformationForm
            nextStep={handleNextStepClick} 
          />
        );
      case 2:
        return (
          <SkillsForm
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <EducationForm
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 4:
        return (
          <ExperienceForm
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 5:
        return (
          <ProjectsForm
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 6:
        return (
          <CertificationsForm
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 7:
        return (
          <SummaryForm
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep} // No need for nextStep on the last form itself
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] w-full ">
      <div className="w-full h max-w-xl bg-white rounded-xl p-6 m-6 border border-dark/10 overflow-y-auto">
        {renderStep()}
        {errorMessage && (
          <p className="text-red-500 flex justify-center text-sm mt-2 animate-shake">
            {errorMessage}
          </p>
        )}
        <div className="flex justify-between f mt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="mt-6 bg-accent2 text-white font-medium px-6 py-2 rounded-full hover:opacity-90 transition"
            >
              Back
            </button>
          ) : (
            <div className="w-24"></div>
          )}
          {step < 7 ? (
            <button
              type="button"
              onClick={handleNextStepClick} // Use the new handler here
              className="mt-6 bg-accent2 text-white font-medium px-6 py-2 rounded-full hover:opacity-90 transition"
            >
              {isCurrentStepDataEmpty() ? "Skip" : "Proceed"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-6 bg-accent2 text-white font-medium px-6 py-2 rounded-full hover:opacity-90 transition"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? "Generating PDF..." : "Finish"}
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default ManualBuild;