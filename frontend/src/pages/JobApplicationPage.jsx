import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Upload,
  Send,
  CheckCircle,
  User,
  Mail,
  Phone,
  Paperclip,
  ArrowRight,
  Plus,
  X,
  Users,
  Calendar,
  MapPin,
  Heart,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { getApiUrl } from "../utils/api";
import SEO from "../components/SEO";

const JobApplicationPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedIn: "",
    gender: "",
    age: "",
    location: "",
    disabilityStatus: "",
    coverLetter: "",
  });
  const [cvFile, setCvFile] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchJobDetails();
  }, [slug]);

  const fetchJobDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000/api"
        }/jobs/slug/${slug}`
      );
      const data = await response.json();
      setJob(data);
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCertificateUpload = (e) => {
    const files = Array.from(e.target.files);
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    const validFiles = [];
    const invalidFiles = [];

    files.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        invalidFiles.push(file.name);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      toast.error(`Files too large (max 5MB): ${invalidFiles.join(", ")}`);
    }

    if (validFiles.length > 0) {
      setCertificates((prev) => [...prev, ...validFiles]);
    }
  };

  const removeCertificate = (index) => {
    setCertificates((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    // Only validate if fields are filled
    if (formData.phone) {
      const phoneRegex = /^(\+265|265|0)?[1-9]\d{8}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
        errors.phone =
          "Please enter a valid Malawi phone number (e.g., +265 999 000 000)";
      }
    }

    // Validate email format if provided
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Please enter a valid email address";
      }
    }

    // Validate LinkedIn URL if provided
    if (formData.linkedIn && !formData.linkedIn.includes("linkedin.com")) {
      errors.linkedIn = "Please enter a valid LinkedIn profile URL";
    }

    // Validate age range if provided
    if (formData.age && (formData.age < 18 || formData.age > 100)) {
      errors.age = "Age must be between 18 and 100";
    }

    // Validate cover letter length if provided
    if (formData.coverLetter && formData.coverLetter.length < 50) {
      errors.coverLetter = "Cover letter should be at least 50 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("image", file); // Backend expects "image" field for all uploads

    const response = await fetch(getApiUrl("upload"), {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload ${file.name}`);
    }

    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading("Validating your application...");

    // Run all validations
    if (!validateForm()) {
      setIsSubmitting(false);
      toast.error("Please fix the errors in the form.", { id: loadingToast });
      return;
    }

    // Validate certificates
    if (certificates.length === 0) {
      setIsSubmitting(false);
      toast.error("Please upload at least one educational certificate.", {
        id: loadingToast,
      });
      return;
    }

    // Validate CV
    if (!cvFile) {
      setIsSubmitting(false);
      toast.error("Please upload your CV/Resume.", { id: loadingToast });
      return;
    }

    // Validate CV file size (5MB max)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (cvFile.size > MAX_FILE_SIZE) {
      setIsSubmitting(false);
      toast.error("CV file is too large. Maximum size is 5MB.", {
        id: loadingToast,
      });
      return;
    }

    try {
      // 1. Upload CV
      toast.loading("Uploading CV...", { id: loadingToast });
      const cvUrl = await uploadFile(cvFile);

      // 2. Upload Certificates
      toast.loading("Uploading certificates...", { id: loadingToast });
      const certificateUrls = await Promise.all(
        certificates.map((file) => uploadFile(file))
      );

      // 3. Submit Application
      toast.loading("Finalizing application...", { id: loadingToast });
      const applicationData = {
        ...formData,
        jobId: job._id,
        cvUrl,
        certificates: certificateUrls,
      };

      const response = await fetch(getApiUrl("applications"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Application dispatched!", { id: loadingToast });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Parse error response
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseError) {
          errorData = { message: "Failed to submit application" };
        }

        // Handle duplicate application (show as success since it was already submitted)
        if (response.status === 409) {
          setIsSubmitted(true);
          toast.success(
            "Good news! You've already applied for this position. We have your application on file.",
            { id: loadingToast, duration: 5000 }
          );
          window.scrollTo({ top: 0, behavior: "smooth" });
          return; // Exit early, don't throw error
        }

        // Handle other errors
        throw new Error(errorData.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error.message || "An error occurred while submitting your application",
        {
          id: loadingToast,
          duration: 5000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-16 h-16 text-primary-green animate-spin mb-4" />
        <p className="text-gray-400 font-black uppercase tracking-widest text-sm">
          Preparing form...
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
      <SEO
        title={job ? `Apply for ${job.title}` : "Job Application"}
        description={`Submit your application for the ${
          job?.title || "job"
        } position at Mthunzi Trust. Join our team and make a difference in Malawi.`}
        url={`/careers/${slug}/apply`}
      />
      {/* Cinematic Hero */}
      <section className="relative min-h-[30vh] md:min-h-[40vh] flex items-center overflow-hidden bg-blue-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1454165833767-027ffea10c37?w=1600&auto=format&fit=crop&q=80"
            alt="Apply Hero"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-32">
          <Link
            to={`/careers/${slug}`}
            className="inline-flex items-center gap-2 text-white/60 hover:text-primary-yellow transition-colors mb-6 font-bold uppercase tracking-widest text-xs"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Job Details
          </Link>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 tracking-tighter uppercase">
              Apply for <span className="text-primary-green">{job.title}</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white p-8 md:p-16 rounded-[3.5rem] shadow-2xl border border-gray-100"
                >
                  <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Personal Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="block text-[11px] font-black text-blue-900 uppercase tracking-widest ml-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            required
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            type="text"
                            placeholder="John Doe"
                            className="w-full pl-16 pr-8 py-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-green focus:shadow-xl focus:shadow-primary-green/5 transition-all outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="block text-[11px] font-black text-blue-900 uppercase tracking-widest ml-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="john@example.com"
                            className={`w-full pl-16 pr-8 py-5 rounded-2xl bg-gray-50 border-2 transition-all outline-none ${
                              validationErrors.email
                                ? "border-red-300 focus:border-red-500"
                                : "border-transparent focus:bg-white focus:border-primary-green focus:shadow-xl focus:shadow-primary-green/5"
                            }`}
                          />
                          {validationErrors.email && (
                            <p className="text-red-500 text-xs mt-1 ml-2">
                              {validationErrors.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="block text-[11px] font-black text-blue-900 uppercase tracking-widest ml-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="tel"
                            placeholder="+265 999 000 000"
                            className={`w-full pl-16 pr-8 py-5 rounded-2xl bg-gray-50 border-2 transition-all outline-none ${
                              validationErrors.phone
                                ? "border-red-300 focus:border-red-500"
                                : "border-transparent focus:bg-white focus:border-primary-green focus:shadow-xl focus:shadow-primary-green/5"
                            }`}
                          />
                          {validationErrors.phone && (
                            <p className="text-red-500 text-xs mt-1 ml-2">
                              {validationErrors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="block text-[11px] font-black text-blue-900 uppercase tracking-widest ml-2">
                          LinkedIn Profile (Optional)
                        </label>
                        <div className="relative">
                          <ArrowRight className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            name="linkedIn"
                            value={formData.linkedIn}
                            onChange={handleChange}
                            type="url"
                            placeholder="https://linkedin.com/in/..."
                            className={`w-full pl-16 pr-8 py-5 rounded-2xl bg-gray-50 border-2 transition-all outline-none ${
                              validationErrors.linkedIn
                                ? "border-red-300 focus:border-red-500"
                                : "border-transparent focus:bg-white focus:border-primary-green focus:shadow-xl focus:shadow-primary-green/5"
                            }`}
                          />
                          {validationErrors.linkedIn && (
                            <p className="text-red-500 text-xs mt-1 ml-2">
                              {validationErrors.linkedIn}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="block text-[11px] font-black text-blue-900 uppercase tracking-widest ml-2">
                          Gender
                        </label>
                        <div className="relative">
                          <Users className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            required
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full pl-16 pr-8 py-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-green focus:shadow-xl focus:shadow-primary-green/5 transition-all outline-none appearance-none"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="block text-[11px] font-black text-blue-900 uppercase tracking-widest ml-2">
                          Age
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            required
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            type="number"
                            min="18"
                            max="100"
                            placeholder="Your Age"
                            className={`w-full pl-16 pr-8 py-5 rounded-2xl bg-gray-50 border-2 transition-all outline-none ${
                              validationErrors.age
                                ? "border-red-300 focus:border-red-500"
                                : "border-transparent focus:bg-white focus:border-primary-green focus:shadow-xl focus:shadow-primary-green/5"
                            }`}
                          />
                          {validationErrors.age && (
                            <p className="text-red-500 text-xs mt-1 ml-2">
                              {validationErrors.age}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="block text-[11px] font-black text-blue-900 uppercase tracking-widest ml-2">
                          Location (Where are you from?)
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            required
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            type="text"
                            placeholder="e.g. Lilongwe, Malawi"
                            className="w-full pl-16 pr-8 py-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-green focus:shadow-xl focus:shadow-primary-green/5 transition-all outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="block text-[11px] font-black text-blue-900 uppercase tracking-widest ml-2">
                          Do you have any Disability?
                        </label>
                        <div className="relative">
                          <Heart className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            required
                            name="disabilityStatus"
                            value={formData.disabilityStatus}
                            onChange={handleChange}
                            className="w-full pl-16 pr-8 py-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-green focus:shadow-xl focus:shadow-primary-green/5 transition-all outline-none appearance-none"
                          >
                            <option value="">Select Status</option>
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-4">
                      <label className="block text-[11px] font-black text-blue-900 uppercase tracking-widest ml-2">
                        CV / Resume (PDF Only)
                      </label>
                      <div className="relative group">
                        <input
                          required
                          type="file"
                          accept=".pdf"
                          onChange={(e) => setCvFile(e.target.files[0])}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-full p-12 rounded-[2.5rem] border-2 border-dashed border-gray-100 bg-gray-50 flex flex-col items-center justify-center gap-4 group-hover:bg-white group-hover:border-primary-green transition-all">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                              cvFile
                                ? "bg-primary-green text-white"
                                : "bg-primary-green/10 text-primary-green"
                            }`}
                          >
                            {cvFile ? (
                              <CheckCircle className="w-8 h-8" />
                            ) : (
                              <Upload className="w-8 h-8" />
                            )}
                          </div>
                          <div className="text-center">
                            <p className="text-blue-900 font-bold">
                              {cvFile ? cvFile.name : "Click to upload CV"}
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                              PDF only, Max 5MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Certificates Multi-Upload */}
                    <div className="space-y-4">
                      <label className="block text-[11px] font-black text-blue-900 uppercase tracking-widest ml-2">
                        Educational Certificates & Awards (Required)
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <AnimatePresence>
                          {certificates.map((file, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="flex items-center justify-between p-4 bg-primary-green/5 rounded-2xl border border-primary-green/20 group/file"
                            >
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-10 h-10 rounded-xl bg-primary-green/10 flex items-center justify-center flex-shrink-0">
                                  <Paperclip className="w-5 h-5 text-primary-green" />
                                </div>
                                <span className="text-blue-900 font-bold text-xs truncate max-w-[150px]">
                                  {file.name}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeCertificate(index)}
                                className="w-8 h-8 rounded-full bg-white text-red-500 shadow-sm flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover/file:opacity-100"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        {/* Add More Button */}
                        <div className="relative group min-h-[80px]">
                          <input
                            type="file"
                            multiple
                            accept=".pdf,image/*"
                            onChange={handleCertificateUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="w-full h-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center gap-3 group-hover:bg-white group-hover:border-primary-green transition-all">
                            <Plus className="w-5 h-5 text-gray-400 group-hover:text-primary-green" />
                            <span className="text-gray-400 font-bold text-xs group-hover:text-primary-green">
                              Add Certificates
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest ml-2">
                        Upload as many certificates as relevant (PDF, JPG, PNG)
                      </p>
                    </div>

                    {/* Cover Letter */}
                    <div className="space-y-4">
                      <label className="block text-[11px] font-black text-blue-900 uppercase tracking-widest ml-2">
                        Why are you a good fit?
                      </label>
                      <textarea
                        required
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        rows="6"
                        placeholder="Tell us about your passion and relevant experience..."
                        className={`w-full px-8 py-5 rounded-[2.5rem] bg-gray-50 border-2 transition-all outline-none resize-none ${
                          validationErrors.coverLetter
                            ? "border-red-300 focus:border-red-500"
                            : "border-transparent focus:bg-white focus:border-primary-green focus:shadow-xl focus:shadow-primary-green/5"
                        }`}
                      ></textarea>
                      {validationErrors.coverLetter && (
                        <p className="text-red-500 text-xs mt-1 ml-2">
                          {validationErrors.coverLetter}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-blue-900 text-white p-6 rounded-2xl font-black uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-4 transition-all shadow-2xl relative overflow-hidden group ${
                          isSubmitting
                            ? "opacity-70"
                            : "hover:bg-primary-green hover:shadow-primary-green/20"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application{" "}
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-12 md:p-24 rounded-[4rem] shadow-2xl border border-gray-100 text-center"
                >
                  <div className="w-24 h-24 bg-primary-green text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-primary-green/30 animate-bounce">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-6 uppercase tracking-tighter">
                    Application Sent!
                  </h2>
                  <p className="text-gray-500 text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                    Thank you for applying to{" "}
                    <span className="text-blue-900 font-bold">{job.title}</span>
                    . Our team will review your application and get back to you
                    within 5-7 working days.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/careers"
                      className="bg-blue-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary-green transition-all shadow-xl"
                    >
                      View More Jobs
                    </Link>
                    <Link
                      to="/"
                      className="bg-gray-100 text-blue-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
                    >
                      Back to Home
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Trust Badge */}
      <section className="pb-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 rounded-full border border-blue-100">
            <Paperclip className="w-4 h-4 text-blue-600" />
            <span className="text-blue-900 text-[10px] font-black uppercase tracking-widest">
              Secure & Confidential Recruitment Process
            </span>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default JobApplicationPage;
