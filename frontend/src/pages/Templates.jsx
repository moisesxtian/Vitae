import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormContext } from "../context/FormContext";
import { Loader } from "lucide-react";
import useForm from "../hooks/useForm";
const Templates = () => {
  const navigate = useNavigate();
  const {setResumeTemplate,formData,setPdfBlob} = useFormContext();
  const {sendFormData,}=useForm();
  const [loading, setLoading] = useState(false);

  const buildOptions = [
    {
      title: 'Creative',
      description: 'A bold and modern resume layout that emphasizes design and uniqueness.',
      image: '/templates/classic_template.png', // relative to public/
      template: 'creative',
      disabled: false,
    },
    {
      title: 'Classic',
      description: 'Standard Harvard resume template format. This resume is recommended for the tech industry.',
      image: '/templates/classic_template.png',
      template: 'classic',
      disabled: false,
    },
    {
      title: 'Hybrid',
      description: 'Combines traditional structure with creative elements, perfect for diverse job applications.',
      image: '/templates/classic_template.png',
      template: 'hybrid',
      disabled: true,
    },
  ];

  const handleSelectedTemplate = async (selected_template) => {
    setLoading(true);
    await setResumeTemplate(selected_template);
    const sendingData={formData,selected_template};
    console.log(sendingData)
    const blob=await sendFormData(sendingData);
    console.log("BLOB:",blob)
    await setPdfBlob(blob);

    navigate('/analyze');

  };
  return (
    <div className="min-h-[calc(100vh-100px)] w-full bg-bgcolor text-dark flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-accent2 mb-2 text-center">
        Choose Resume Template
      </h1>

      <p className="text-dark/70 mb-8 text-center max-w-lg text-sm sm:text-base">
        How would you like your Resume to Look?
      </p>
      {!loading ? (
        <div className="flex items-center justify-center">
          <Loader className="animate-spin h-6 w-6 text-primary" />
          <span className="ml-2 text-primary">Loading...</span>
        </div>
      ): 
(      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl">
        {buildOptions.map((option, idx) => (
          <div
            key={idx}
            onClick={() => {
              if (!option.disabled) handleSelectedTemplate(option.template);
            }}
            className={`cursor-pointer border rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-200 
              ${option.disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' : 'hover:shadow-lg hover:scale-[1.02] bg-bgcolor border-dark/10'}
            `}
          >
              <div className="w-full aspect-[1/1.414] overflow-hidden rounded-md mb-4 border border-dark/10">
                <img
                  src={option.image}
                  alt={`${option.title} template`}
                  className={`w-full h-full object-cover ${option.disabled ? 'opacity-50' : ''}`}
                />
              </div>


            <h2 className={`text-lg sm:text-xl font-semibold ${option.disabled ? 'text-gray-400' : 'text-accent2'}`}>
              {option.title}
            </h2>
            <p className="text-sm text-dark/60 mt-2">
              {option.description}
              {option.disabled && <span className="block text-xs mt-1 text-gray-400">(Coming Soon)</span>}
            </p>
          </div>
        ))}
      </div>)
      }
      <button
        onClick={() => navigate('/')}
        className="mt-10 text-sm text-primary hover:underline"
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default Templates;
