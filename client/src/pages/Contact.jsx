import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful form submission
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-16 px-6 font-sans flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 md:p-10 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-dark text-center">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 max-w-xl mx-auto">
          We'd love to hear from you — whether it's feedback, support, or collaboration opportunities.
        </p>

        {submitted ? (
          <div className="text-center text-green-600 text-lg font-medium pt-4">
            ✅ Message sent successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                required
                rows="4"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Send Message
              </button>
            </div>
          </form>
        )}

        <div className="text-center text-sm text-gray-500 pt-6">
          Or email us directly at{" "}
          <a href="mailto:support@helpendoflife.org" className="text-primary underline hover:text-primary-dark">
            support@helpendoflife.org
          </a>
        </div>
      </div>
    </div>
  );
}
