import { useFormContext } from "../context/FormContext";

import PDFViewer from "../components/PDFViewer";
import useAnalyze from "../hooks/useAnalyze";
import { useEffect } from "react";
export default function Analyze() {
  const {formdata, pdfBlob} = useFormContext();

    const { analyzeResume, overview, loading, error } = useAnalyze();
    const downloadPDF= (blob) =>{
      const url=window.URL.createObjectURL(blob)
      const link=document.createElement('a')
      link.href=url
      link.download="resume.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }

  return (
    <div className="flex flex-col lg:flex-row gap-10 m-6 lg:m-20">
      {/* Left Section */}
      <div className="flex flex-col gap-6 w-full lg:w-1/2">
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
          onClick={() => analyzeResume(formdata)}
          className="w-full sm:w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            {loading ?"Loading...":"Auto Revise"}
          </button>
          <button 
          onClick={() => downloadPDF(pdfBlob)}
          className="w-full sm:w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Download PDF
          </button>
        </div>

        {/* Overview */}
        <div className="border border-gray-200 rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-2">Overview</h2>
          <p className="text-gray-700">
           {
           overview ? overview : "Click Analyze to see Overview."
           }
          </p>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="w-full lg:w-fit border border-gray-300 shadow rounded p-2">
        <PDFViewer pdfBlob={pdfBlob} />
      </div>
    </div>
  );
}
