import { useEffect } from "react";
import { useAiContext } from "../context/AiContext";
import { Briefcase, Building2, ExternalLink, Loader } from "lucide-react";

const Jobs = () => {
  const { job_listing, job_roles, job_loading } = useAiContext();

  useEffect(() => {
    console.log("MY JOB ROLE:", job_roles);
    console.log("Jobs", job_listing);
  }, [job_listing]);

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Briefcase className="text-accent2 w-7 h-7" />
        Recommended Jobs
      </h1>

<div className="mb-6 text-lg text-gray-700">
  <span className="font-medium block sm:inline">Predicted Job Role: </span>
  <span className="text-accent2 font-semibold text-base sm:text-lg">
    {
      job_roles ? job_roles[0] : "None, try adding more details on your resume!"
    }
  </span>
</div>

      {/* Loading State */}
      {job_loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Loader className="animate-spin w-6 h-6 mb-2 text-accent2" />
          <p>Looking for job listings...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(job_listing) && job_listing.length > 0 ? (
            job_listing.map((job, i) => (
              <div
                key={i}
                className="border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all bg-white flex flex-col h-full"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Briefcase className="text-accent2 w-5 h-5" />
                  <h2 className="text-lg font-semibold text-gray-800">
                    {job.job_title}
                  </h2>
                </div>

                <div className="mb-4 flex items-center gap-2 text-gray-600">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span>{job.employer_name}</span>
                </div>

                <div className="mt-auto">
                  <a
                    href={job.job_apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent2 font-medium hover:underline"
                  >
                    Apply Now <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No jobs found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;
