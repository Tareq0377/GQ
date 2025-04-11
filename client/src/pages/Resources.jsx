import React from "react";

const resources = [
  {
    title: "End-of-Life Planning Guide",
    description: "A downloadable PDF covering key documents and steps.",
    link: "#",
  },
  {
    title: "Legal Support Services",
    description: "Directory of services for wills, power of attorney, and more.",
    link: "#",
  },
  {
    title: "Cultural Considerations",
    description: "Resources tailored to diverse cultural and spiritual needs.",
    link: "#",
  },
  {
    title: "Support Groups & Events",
    description: "Find a community to talk to or join an event near you.",
    link: "#",
  },
  {
    title: "Palliative Care Explained",
    description: "Understand what it means and how to access it.",
    link: "#",
  },
  {
    title: "Your Rights in Healthcare",
    description: "Know your legal rights regarding treatment and consent.",
    link: "#",
  },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-neutral-50 py-16 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-primary-dark mb-12">
          Helpful Resources
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between transition hover:shadow-lg"
            >
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
              </div>
              <div className="mt-4">
                <a
                  href={item.link}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Learn more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
