import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  Users,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useSettings } from "../../context/SettingsContext";
import { getApiUrl } from "../../utils/api";

const Contact = ({ showHeader = true }) => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryTypes = [
    { id: "general", label: "General Inquiry", icon: MessageSquare },
    { id: "partnership", label: "Partnership", icon: Users },
    { id: "donation", label: "Donation", icon: Send },
    { id: "volunteer", label: "Volunteer", icon: Users },
    { id: "media", label: "Media Inquiry", icon: MessageSquare },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading("Sending your message...");

    try {
      const response = await fetch(getApiUrl("/inquiries"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Message sent successfully!", { id: loadingToast });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        toast.error("Failed to send message. Please try again.", {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error("An error occurred. Please try again later.", {
        id: loadingToast,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        {/* Section Header */}
        {showHeader && (
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Get In <span className="text-primary-green">Touch</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
            >
              Reach out to us for collaborations, inquiries, or to learn more
              about our mission in Malawi.
            </motion.p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Contact Points */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-primary-green rounded-3xl lg:rounded-[3rem] p-8 lg:p-10 text-white shadow-2xl shadow-primary-green/20 relative overflow-hidden h-full flex flex-col">
              {/* Decorative Circle */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10 space-y-8 lg:space-y-12 h-full flex flex-col">
                {/* Offices */}
                <div>
                  <div className="flex items-center gap-4 mb-4 lg:mb-6">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <h4 className="text-lg lg:text-xl font-black uppercase tracking-tighter text-white">
                      Location
                    </h4>
                  </div>
                  <ul className="space-y-2 text-white/80 font-medium text-sm lg:text-base">
                    <li>{settings?.address || "Lilongwe, Malawi"}</li>
                  </ul>
                </div>

                {/* Phone */}
                <div>
                  <div className="flex items-center gap-4 mb-4 lg:mb-6">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center">
                      <Phone className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <h4 className="text-lg lg:text-xl font-black uppercase tracking-tighter text-white">
                      Direct Line
                    </h4>
                  </div>
                  <ul className="space-y-2 text-white/80 font-medium font-mono text-sm lg:text-base">
                    <li>{settings?.phone || "+265 996 654 088"}</li>
                    <li className="text-white/40 text-[9px] lg:text-[10px] font-black uppercase tracking-widest mt-2">
                      {settings?.workingHours || "Mon-Fri, 8AM-5PM"}
                    </li>
                  </ul>
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center gap-4 mb-4 lg:mb-6">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center">
                      <Mail className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <h4 className="text-lg lg:text-xl font-black uppercase tracking-tighter text-white">
                      Official Support
                    </h4>
                  </div>
                  <ul className="space-y-2 text-white/80 font-medium break-all text-sm lg:text-base">
                    <li>{settings?.email || "info@mthunzi.org"}</li>
                  </ul>
                </div>

                {/* Response Time */}
                <div className="mt-8 lg:mt-auto pt-8 lg:pt-10 border-t border-white/10">
                  <div className="flex items-center gap-4 mb-3 lg:mb-4 text-primary-yellow">
                    <Clock className="w-5 h-5 lg:w-6 lg:h-6" />
                    <h4 className="font-black uppercase tracking-widest text-[9px] lg:text-[10px]">
                      Quick Response
                    </h4>
                  </div>
                  <p className="text-white/60 text-[11px] lg:text-xs leading-relaxed">
                    Our team aims to respond to all inquiries within{" "}
                    <span className="text-white font-bold">
                      48 working hours
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white p-6 md:p-14 rounded-3xl lg:rounded-[3.5rem] shadow-2xl border border-gray-100 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-20 relative z-10"
                  >
                    <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <h3 className="text-4xl font-black text-blue-900 mb-4 tracking-tighter uppercase">
                      Inquiry Received!
                    </h3>
                    <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">
                      Thank you for reaching out. A representative will contact
                      you shortly using the details provided.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="relative z-10">
                    <h3 className="text-3xl font-black text-blue-900 mb-10 uppercase tracking-tighter">
                      Send us a{" "}
                      <span className="text-primary-green">Message</span>
                    </h3>

                    <div className="mb-10">
                      <label className="block text-blue-900 font-bold uppercase tracking-widest text-[10px] mb-4">
                        What is your inquiry about?
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {inquiryTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                subject: type.label,
                              }))
                            }
                            className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 border ${
                              formData.subject === type.label
                                ? "bg-blue-900 text-white border-blue-900 shadow-xl"
                                : "bg-gray-50 text-gray-500 border-gray-100 hover:border-primary-green hover:text-primary-green hover:bg-white"
                            }`}
                          >
                            <type.icon className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                              {type.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-blue-900/40 font-black uppercase tracking-widest text-[9px] ml-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-green outline-none transition-all text-gray-900 font-bold text-sm shadow-sm"
                            placeholder="John Doe"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-blue-900/40 font-black uppercase tracking-widest text-[9px] ml-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-green outline-none transition-all text-gray-900 font-bold text-sm shadow-sm"
                            placeholder="hello@world.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-blue-900/40 font-black uppercase tracking-widest text-[9px] ml-2">
                            Phone (Optional)
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-green outline-none transition-all text-gray-900 font-bold text-sm shadow-sm"
                            placeholder="+265..."
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-blue-900/40 font-black uppercase tracking-widest text-[9px] ml-2">
                            Custom Subject
                          </label>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-green outline-none transition-all text-gray-900 font-bold text-sm shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-blue-900/40 font-black uppercase tracking-widest text-[9px] ml-2">
                          Your Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows="5"
                          className="w-full px-6 py-4 rounded-3xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-green outline-none transition-all text-gray-900 font-medium text-sm shadow-sm resize-none"
                          placeholder="How can we help your community today?"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full">
                          * Direct Dispatch
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-blue-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-primary-green transition-all flex items-center gap-3 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                          {isSubmitting ? "Dispatching..." : "Send Message"}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
