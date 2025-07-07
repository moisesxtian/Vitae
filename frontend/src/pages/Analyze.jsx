import { useFormContext } from "../context/FormContext";
import { Download, RefreshCw } from "lucide-react";
import PDFViewer from "../components/PDFViewer";
import useAnalyze from "../hooks/useAnalyze";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
export default function Analyze() {
  const { formData, pdfBlob } = useFormContext();
  const [revisedUsed, setRevisedUsed] = useState(false);
  const navigate = useNavigate();
  const handleAnalyze = () => {

    analyzeResume();
    setRevisedUsed(true);
  };
  useEffect(() => {
    if (!pdfBlob) {
      navigate("/create");
    }
  }, [pdfBlob]);
  const { analyzeResume, overview, loading, error } = useAnalyze();
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
          {!revisedUsed && (
            <div
              onClick={handleAnalyze}
              className="cursor-pointer flex items-start gap-3 border border-gray-300 rounded-xl p-6 shadow hover:shadow-md transition-transform transform hover:scale-[1.02] bg-white"
            >
              <RefreshCw className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Analyze Resume
                </h3>
                <p className="text-sm text-gray-600">
                  Let AI review and suggest improvements.
                </p>
              </div>
            </div>
          )}
          {/* Center: Overview */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="p-6 bg-white border border-gray-300 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <ReactMarkdown>{formattedOverview}</ReactMarkdown>
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
        </div>

        {/* Right: PDF Preview on desktop only */}
        <div className="w-fit h-fit hidden lg:block p-4 border border-gray-300 rounded-xl shadow">
          <PDFViewer pdfBlob={pdfBlob} />
        </div>
      </div>
    </div>
  );
}
