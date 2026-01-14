import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Calendar,
  Briefcase,
  ChevronLeft,
  Share2,
  Mail,
  ArrowRight,
  Loader2,
} from "lucide-react";

const SingleJobPage = () => {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [otherJobs, setOtherJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchJobDetails();
  }, [slug]);

  const fetchJobDetails = async () => {
    try {
      setIsLoading(true);
      // Fetch specifically by slug
      const jobResponse = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000/api"
        }/jobs/slug/${slug}`
      );
      const jobData = await jobResponse.json();
      setJob(jobData);

      // Fetch others for sidebar
      const othersResponse = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/jobs`
      );
      const othersData = await othersResponse.json();
      setOtherJobs(
        othersData
          .filter((j) => j.slug !== slug && j.status === "Open")
          .slice(0, 4)
      );
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-16 h-16 text-primary-green animate-spin mb-4" />
        <p className="text-gray-400 font-black uppercase tracking-widest text-sm">
          Reviewing file...
        </p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-4xl font-black text-blue-900 mb-4">
            Job Not Found
          </h2>
          <Link
            to="/careers"
            className="text-primary-green font-bold flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" /> Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 min-h-screen"
    >
      {/* Cinematic Hero */}
      <section className="relative min-h-[65vh] md:min-h-[75vh] flex items-start overflow-hidden bg-blue-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&auto=format&fit=crop&q=80"
            alt={job.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-32 md:pt-48 pb-20">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-white/60 hover:text-primary-green transition-colors mb-8 font-bold uppercase tracking-widest text-xs"
          >
            <ChevronLeft className="w-4 h-4" /> Back to All Careers
          </Link>
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-primary-green text-white rounded-full text-xs font-black uppercase tracking-widest mb-6">
              {job.department} Department
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter uppercase">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-8 text-white/80 font-medium">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-yellow" />{" "}
                {job.location}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-yellow" /> {job.type}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-yellow" /> Deadline:{" "}
                {new Date(job.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Job Description */}
            <div className="lg:col-span-2 space-y-12">
              <div className="bg-white p-10 md:p-16 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="relative z-10 space-y-12">
                  <div className="prose prose-lg prose-blue max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-blue-900 prose-p:text-gray-600 prose-li:text-gray-600">
                    <h2 className="text-3xl font-black text-blue-900 border-b-4 border-primary-green inline-block mb-8">
                      Role Overview
                    </h2>
                    <p className="whitespace-pre-wrap">{job.description}</p>
                  </div>

                  {job.requirements?.length > 0 && (
                    <div className="space-y-6">
                      <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-primary-green flex items-center justify-center text-white">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        Requirements
                      </h2>
                      <ul className="space-y-4">
                        {job.requirements.map((req, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-4 text-gray-600 font-medium"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary-green mt-2.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Share Section */}
              <div className="flex items-center justify-between p-8 bg-blue-900 rounded-[2.5rem] text-white">
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tight mb-1">
                    Know someone who'd fit?
                  </h4>
                  <p className="text-white/60 text-sm italic">
                    Share this opportunity with your network.
                  </p>
                </div>
                <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sidebar Sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                {/* Apply Card */}
                <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green/5 rounded-full blur-3xl" />

                  <h3 className="text-2xl font-black text-blue-900 mb-8 uppercase tracking-tighter">
                    Quick Details
                  </h3>

                  <div className="space-y-6 mb-10">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                      <span className="text-gray-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                        <Briefcase className="w-4 h-4" /> Type
                      </span>
                      <span className="text-blue-900 font-bold">
                        {job.type}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Deadline
                      </span>
                      <span className="text-red-500 font-black">
                        {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/careers/${slug}/apply`}
                    className="w-full bg-blue-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 hover:bg-primary-green transition-all shadow-xl hover:shadow-primary-green/20"
                  >
                    Send Application <ArrowRight className="w-5 h-5" />
                  </Link>

                  <p className="text-center text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em] mt-6">
                    Reply within 5-7 working days
                  </p>
                </div>

                {/* Other Jobs */}
                <div className="bg-blue-50 p-10 rounded-[3rem]">
                  <h4 className="text-xl font-black text-blue-900 mb-6 uppercase tracking-tight">
                    Other Openings
                  </h4>
                  <div className="space-y-4">
                    {otherJobs.map((otherJob) => (
                      <Link
                        key={otherJob._id}
                        to={`/careers/${otherJob.slug}`}
                        className="block p-5 bg-white rounded-2xl border border-blue-100 hover:border-primary-green transition-all group"
                      >
                        <h5 className="font-black text-blue-900 mb-1 group-hover:text-primary-green transition-colors text-sm uppercase tracking-tight">
                          {otherJob.title}
                        </h5>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-none">
                          {otherJob.location}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default SingleJobPage;
