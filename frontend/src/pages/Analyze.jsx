import { useFormContext } from "../context/FormContext";
import { Download, RefreshCw,BriefcaseBusiness } from "lucide-react";
import PDFViewer from "../components/PDFViewer";
import useAnalyze from "../hooks/useAnalyze";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import useJobs from "../hooks/useJobs";
import { useAiContext } from "../context/AiContext";
export default function Analyze() {
  const{job_listing,setJobListing,setJobRole,job_roles}=useAiContext()
  const {getJobListing}=useJobs()
  const { formData, pdfBlob } = useFormContext();
  const [revisedUsed, setRevisedUsed] = useState(false)
  const [parsed,setParsed]=useState(null)
  const navigate = useNavigate();


  const handleAnalyze = async() => {
    setRevisedUsed(true);
    console.log("Revising Resume....")
    setLoading(true);

    const parsed=await analyzeResume();
    setParsed(parsed)
    setLoading(false);

    const job_role=parsed.recommended_job_category
    const job_location=`${formData.city}, ${formData.state}`

    const get_job_listing_response=await getJobListing(job_role,job_location)
    setJobListing(get_job_listing_response.data)
    setJobRole(job_role)
  };

  useEffect(() => {
    console.log("Job_roles", job_roles);
    if (!pdfBlob) {
      //NAVIGATE to CREATE PAGE if Theres no PDF
      navigate("/create");
    }
  }, [pdfBlob]);

  const { analyzeResume, overview,loading,setLoading} = useAnalyze();
  const formattedOverview = overview
    ? overview.replace(/\\n/g, "\n")
    : "Click Auto Revise Resume to get automatically improve your resume!";
  const downloadPDF = (blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${formData.lastName}_RESUME.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center px-4 py-8 lg:py-16 max-w-7xl mx-auto">
      {/* Container with horizontal padding and centered max width */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        {/* Three-column grid on desktop; single column on mobile */}

        {/* Left: Buttons/cards */}
        <div className="flex flex-col h-fit gap-4">
          {(!revisedUsed || !job_roles.length>1) && (
            <div
              onClick={handleAnalyze}
              className="cursor-pointer flex items-start gap-3 border border-gray-300 rounded-xl p-6 shadow hover:shadow-md transition-transform transform hover:scale-[1.02] bg-white"
            >
              <RefreshCw className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Revise Resume
                </h3>
                <p className="text-sm text-gray-600">
                  Let AI improve resume for you.
                </p>
              </div>
            </div>
          )}
          {/* Center: Overview */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="p-6 bg-white border border-gray-300 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <ReactMarkdown>{
                job_roles.length>1 ? "You have revised your resume already."
                : loading ? "Generating resume..." : formattedOverview
              }</ReactMarkdown>
            </div>

            {/* PDF Preview for mobile below overview */}
            <div className="lg:hidden p-4 border border-gray-300 rounded-xl shadow">
              <PDFViewer pdfBlob={pdfBlob} />
            </div>
          </div>
          <div
            onClick={() => downloadPDF(pdfBlob)}
            className="cursor-pointer flex items-start gap-3 border border-gray-300 rounded-xl p-6 shadow hover:shadow-md transition-transform transform hover:scale-[1.02] bg-white"
          >
            <Download className="w-8 h-8 text-blue-500 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Download PDF
              </h3>
              <p className="text-sm text-gray-600">
                Save your resume to your device.
              </p>
            </div>
          </div>

          {/* Look for Jobs */}
          {
          (revisedUsed || job_roles>1) &&
          <div
            onClick={() => navigate("/jobs")}
            className="cursor-pointer flex items-start gap-3 border border-gray-300 rounded-xl p-6 shadow hover:shadow-md transition-transform transform hover:scale-[1.02] bg-white"
          >
            <BriefcaseBusiness className="w-8 h-8 text-blue-500 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Look for Jobs
              </h3>
              <p className="text-sm text-gray-600">
                Look for jobs related to your resume.
              </p>
            </div>
          </div>
          }
        </div>

        {/* Right: PDF Preview on desktop only */}
        <div className="w-fit h-fit hidden lg:block p-4 border border-gray-300 rounded-xl shadow">
          <PDFViewer pdfBlob={pdfBlob} />
        </div>
      </div>
    </div>
  );
}
