import {useState} from "react";
import {StepOne, StepTwo, StepThree,StepFour,StepFive,StepSix} from "../components/Steps";
import PDFViewer from "../components/PDFViewer";
import useForm from "../hooks/useForm";

const ManualBuild = () => {
    const [formData, setFormData] = useState({
    firstName: "",
    middleInitial: "",
    lastName: "",
    phone: "",
    email: "",
    summary: "",
    linkedin: "",
    projects: [],
    certifications: [],
    education: [],
    experience: [],
    skills: [],
  });
  
  const {sendFormData} = useForm(formData);
  const [step, setStep] =useState(1);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);

const isStepOneValid = () => {
  const containsOnlyLetters = (str) => /^[a-zA-Z]*$/.test(str);
  const isNotEmpty=
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
    setErrorMessage("All fields are required.");
    return;
  }
  if (!isLettersOnly) {
    setErrorMessage("First name, middle initial, and last name can only contain letters.");
    return;
  }
  if (isNotEmpty && isLettersOnly) {
    nextStep();
    setErrorMessage("");
  }
};
//handle submit
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Processing Request...");

  setIsLoading(true); // ✅ Begin loading BEFORE sending request
  setErrorMessage("");

  try {
    const response = await sendFormData();
    setPdfBlob(response); // Assuming response is a Blob for PDF
    console.log("Response:", response);
    if (response) {
      console.log("Form submitted successfully!");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setErrorMessage("Failed to submit the form. Please try again.");
    }
  } catch (err) {
    console.error("Error:", err);
    setIsLoading(false);
    setErrorMessage("An error occurred. Please try again.");
  }
};


  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne formData={formData} setFormData={setFormData} nextStep={nextStep}/>;
      case 2:
        return <StepTwo formData={formData} setFormData={setFormData} nextStep={nextStep}/>;
      case 3:
        return <StepThree formData={formData} setFormData={setFormData} nextStep={nextStep}/>;
      case 4:
        return <StepFour formData={formData} setFormData={setFormData} nextStep={nextStep}/>;
      case 5:
        return <StepFive formData={formData} setFormData={setFormData} nextStep={nextStep}/>;
      case 6:
        return <StepSix formData={formData} setFormData={setFormData} nextStep={nextStep}/>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] w-full ">
      <div className="w-full h max-w-xl bg-white rounded-xl  p-6 m-6 border border-dark/10 overflow-y-auto">
        {renderStep()}
          {errorMessage && <p className="text-red-500 flex justify-center text-sm mt-2 animate-shake">{errorMessage}</p>}
        <div className="flex justify-between f mt-6">

        
        {
        // 2how "Back" button only if the step is greater than 1
        step > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="mt-6 bg-accent2 text-white font-medium px-6 py-2 rounded-full hover:opacity-90 transition"
          >
            Back
          </button>
        ) :(<div className="w-24"></div>)
        }
        {step < 6 ? (
                <button
          type="button"
          onClick={isStepOneValid}
          className="mt-6 bg-accent2 text-white font-medium px-6 py-2 rounded-full hover:opacity-90 transition">

          Proceed
        </button>): (
          <button
          onClick={handleSubmit}
          className="mt-6 bg-accent2 text-white font-medium px-6 py-2 rounded-full hover:opacity-90 transition">
          Finish
        </button>
        )}

    {/* PDF Modal Viewer */}
    {pdfBlob && (
      <PDFViewer pdfBlob={pdfBlob} onClose={() => setPdfBlob(null)} />
    )}
  </div>
        </div>
      </div>
  );
};

export default ManualBuild;
