import { useEffect,useRef,useState} from "react";
import { Briefcase, Building2, ExternalLink, Loader } from "lucide-react";
import { useFormContext } from "../context/FormContext";
import { useAiContext } from "../context/AiContext";
import useGetRole from "../hooks/useGetRole";
import useJobs from "../hooks/useJobs";
const Jobs = () => {
  const hasCalledRef = useRef(false);
  const {getJobListing,errorMessage}=useJobs()
  const { getRole } = useGetRole();
  const {setJobRole,setJobListing}=useAiContext()
  const { formData } = useFormContext();
  const { job_listing, job_roles, job_loading } = useAiContext();

  const [job_role_loading, setJobRoleLoading] = useState(false);
  const addJobRole=async ()=>{
    setJobRoleLoading(true);
    const response=await getRole(formData);
    const parsed=await JSON.parse(response);
    setJobRole(parsed.recommended_job_category);

    console.log("API RESPONSE:",typeof response)

    const job_role = parsed.recommended_job_category;
    setJobRoleLoading(false);
    console.log("JOB ROLE:",job_role)
    const job_location = `${formData.city}, ${formData.state}`;

    const get_job_listing_response = await getJobListing(
      job_role,
      job_location
    );
    setJobListing(get_job_listing_response.data);
  }
useEffect(() => {
  if (!hasCalledRef.current && !job_roles.length) {
    hasCalledRef.current = true; // prevent second call
    console.log("No Job Roles found");
    console.log(formData);
    console.log("Running Add Job Role function:");
    addJobRole();
  }
}, []);
  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Briefcase className="text-accent2 w-7 h-7" />
        Recommended Jobs
      </h1>

<div className="flex mb-6 text-lg text-gray-700">
  <span className="font-medium block sm:inline mr-2">Predicted Job Role: </span>
  {
    job_role_loading ? (
      <Loader className="animate-spin w-6 h-6 mb-2 text-accent2" />
    ) : (
      <span className="font-semibold">{job_roles[0]}</span>
    )
  }
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
            
          )
          }
        </div>
      )}
      {errorMessage && (
          <p className="text-red-500 flex justify-center text-sm mt-2 animate-shake">
            {errorMessage}
          </p>
        )}
    </div>
  );
};

export default Jobs;
