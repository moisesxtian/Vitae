import { useEffect, useState } from "react";
import { useFormContext } from "../context/FormContext";

export default function Analyze() {
  const { pdfBlob, formData, setFormData } = useFormContext();
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate OpenAI call — replace with real API call
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume: formData }),
    });
    const result = await response.json();
    setAnalysis(result.analysis);
    setIsAnalyzing(false);
  };

  const handleApply = () => {
    // In real case, you'd update `formData` if OpenAI returns improved fields
    setHasApplied(true);
  };

  const handleFindJobs = () => {
    // Navigate to your job matching page
    window.location.href = "/jobs";
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left: PDF */}
      <div className="w-1/2 border-r border-gray-300">
        {pdfBlob ? (
          <iframe
            src={URL.createObjectURL(pdfBlob)}
            title="Resume PDF"
            className="w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>No PDF available</p>
          </div>
        )}
      </div>

      {/* Right: Analyzer */}
      <div className="w-1/2 p-6 flex flex-col gap-4 overflow-y-auto">
        <h2 className="text-2xl font-bold text-accent2">AI Resume Analyzer</h2>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:opacity-90 transition disabled:opacity-50"
        >
          {isAnalyzing ? "Analyzing..." : "Auto Analyze"}
        </button>

        {analysis && (
          <div className="bg-gray-100 p-4 rounded-lg shadow text-sm whitespace-pre-line">
            {analysis}
          </div>
        )}

        {analysis && !hasApplied && (
          <button
            onClick={handleApply}
            className="bg-green-500 text-white py-2 px-4 rounded-full hover:opacity-90 transition"
          >
            Apply Suggestions
          </button>
        )}

        {hasApplied && (
          <button
            onClick={handleFindJobs}
            className="bg-accent2 text-white py-2 px-4 rounded-full hover:opacity-90 transition"
          >
            See Job Opportunities
          </button>
        )}
      </div>
    </div>
  );
}
