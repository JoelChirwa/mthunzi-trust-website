import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  Users,
  MessageSquare,
} from "lucide-react";

const Contact = ({ showHeader = true }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactPoints = [
    {
      icon: MapPin,
      title: "Our Offices",
      details: [
        "P. O. Box 12, Chileka",
        "Blantyre, Malawi",
        "Lilongwe, Malawi",
      ],
      color: "text-green-600 bg-green-100",
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+265 996 654 088", "+265 881 234 567", "Mon-Fri, 8AM-5PM"],
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "mthunzitrust.mw@gmail.com",
        "info@mthunzitrust.org",
        "partnerships@mthunzitrust.org",
      ],
      color: "text-yellow-600 bg-yellow-100",
    },
  ];

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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
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
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Reach out to us for collaborations, inquiries, or to learn more
              about our work
            </motion.p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Contact Points */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-primary-green rounded-[3rem] p-10 text-white shadow-2xl shadow-primary-green/20 relative overflow-hidden h-full flex flex-col">
              {/* Decorative Circle */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10 space-y-12 h-full flex flex-col">
                {/* Offices */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-tighter">
                      Our Offices
                    </h4>
                  </div>
                  <ul className="space-y-2 text-white/80 font-medium">
                    <li>P. O. Box 12, Chileka</li>
                    <li>Blantyre, Malawi</li>
                    <li>Lilongwe, Malawi</li>
                  </ul>
                </div>

                {/* Phone */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-tighter">
                      Phone Numbers
                    </h4>
                  </div>
                  <ul className="space-y-2 text-white/80 font-medium">
                    <li>+265 996 654 088</li>
                    <li>+265 881 234 567</li>
                    <li className="text-white/40 text-sm mt-2 italic">
                      Mon-Fri, 8AM-5PM
                    </li>
                  </ul>
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-tighter">
                      Email Addresses
                    </h4>
                  </div>
                  <ul className="space-y-2 text-white/80 font-medium break-all">
                    <li>mthunzitrust.mw@gmail.com</li>
                    <li>info@mthunzi.org</li>
                    <li>partnerships@mthunzi.org</li>
                  </ul>
                </div>

                {/* Response Time - Integrated */}
                <div className="mt-auto pt-12 border-t border-white/10">
                  <div className="flex items-center gap-4 mb-4 text-primary-yellow">
                    <Clock className="w-6 h-6" />
                    <h4 className="font-black uppercase tracking-widest text-xs">
                      Response Time
                    </h4>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    We typically respond to inquiries within{" "}
                    <span className="text-white font-bold">24-48 hours</span>.
                    For urgent matters, please call our hotline.
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
            <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-100 relative overflow-hidden">
              {/* Subtle background decoration for the form */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 relative z-10"
                >
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-4xl font-black text-blue-900 mb-4 tracking-tighter uppercase">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">
                    Thank you for reaching out. We've received your message and
                    will get back to you within 24-48 hours.
                  </p>
                  <motion.div
                    animate={{ width: ["0%", "100%"] }}
                    transition={{ duration: 3 }}
                    className="h-1.5 bg-primary-green rounded-full max-w-[200px] mx-auto"
                  />
                </motion.div>
              ) : (
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-blue-900 mb-10 uppercase tracking-tighter">
                    Send us a{" "}
                    <span className="text-primary-green">Message</span>
                  </h3>

                  {/* Inquiry Types */}
                  <div className="mb-12">
                    <label className="block text-blue-900 font-bold uppercase tracking-widest text-[11px] mb-5">
                      What is your inquiry about?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
                          className={`p-4 rounded-2xl text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 border ${
                            formData.subject === type.label
                              ? "bg-blue-900 text-white border-blue-900 shadow-xl scale-105"
                              : "bg-gray-50 text-gray-500 border-gray-100 hover:border-primary-green hover:text-primary-green hover:bg-white"
                          }`}
                        >
                          <type.icon
                            className={`w-5 h-5 ${
                              formData.subject === type.label
                                ? "text-primary-green"
                                : ""
                            }`}
                          />
                          <span className="text-[10px] font-black uppercase tracking-tight">
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="block text-blue-900 font-bold uppercase tracking-widest text-[11px]">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-green focus:ring-4 focus:ring-primary-green/10 outline-none transition-all text-gray-900 placeholder:text-gray-400 font-medium"
                          placeholder="Your name"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block text-blue-900 font-bold uppercase tracking-widest text-[11px]">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-green focus:ring-4 focus:ring-primary-green/10 outline-none transition-all text-gray-900 placeholder:text-gray-400 font-medium"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="block text-blue-900 font-bold uppercase tracking-widest text-[11px]">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-6 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-green focus:ring-4 focus:ring-primary-green/10 outline-none transition-all text-gray-900 placeholder:text-gray-400 font-medium"
                          placeholder="+265 123 456 789"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block text-blue-900 font-bold uppercase tracking-widest text-[11px]">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-green focus:ring-4 focus:ring-primary-green/10 outline-none transition-all text-gray-900 placeholder:text-gray-400 font-medium"
                          placeholder="How can we help?"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-blue-900 font-bold uppercase tracking-widest text-[11px]">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full px-6 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-green focus:ring-4 focus:ring-primary-green/10 outline-none transition-all text-gray-900 placeholder:text-gray-400 resize-none font-medium"
                        placeholder="Tell us about your inquiry..."
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        * Required fields
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-900/20 hover:bg-primary-green hover:shadow-primary-green/20 transition-all flex items-center gap-4 group/btn overflow-hidden relative"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                              Send Message
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Find Our Offices
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="h-48 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary-green mx-auto mb-3" />
                      <p className="font-semibold text-gray-900">
                        Blantyre Office
                      </p>
                      <p className="text-gray-600 text-sm">
                        P. O. Box 12, Chileka
                      </p>
                    </div>
                  </div>
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary-blue mx-auto mb-3" />
                      <p className="font-semibold text-gray-900">
                        Lilongwe Office
                      </p>
                      <p className="text-gray-600 text-sm">Central Lilongwe</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
