import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-50 py-16 px-6 text-gray-800 font-sans">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark">
          About HELP
        </h1>

        <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto">
          At HELP (Holistic End-of-Life Planning), we believe that preparing for the end of life is an act of love, care, and clarity.
          Our mission is to empower individuals, families, and communities to have open, informed, and compassionate conversations about end-of-life decisions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {[
            {
              title: "Empowerment",
              text: "We aim to give people the tools and confidence to make informed decisions.",
            },
            {
              title: "Compassion",
              text: "We support conversations with empathy and kindness, even when they’re difficult.",
            },
            {
              title: "Community",
              text: "We believe end-of-life planning is best done with and for those we care about.",
            },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-left hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-primary mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
