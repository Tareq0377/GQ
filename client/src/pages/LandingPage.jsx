import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fefcf9] text-[#1f3d3d] flex flex-col font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
            <div className="text-left w-full md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold leading-snug mb-4 text-[#1a3a3a]">
                Holistic End-of-Life Planning Made Simple
              </h1>
              <p className="text-lg text-[#445555] mb-6">
                Take our HELP Quiz to receive personalized guidance on planning your future care.
              </p>
              <Link to="/quiz">
                <button className="bg-[#4aa69d] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#3d8f8a] transition">
                  Take the Quiz
                </button>
              </Link>
            </div>
            <div className="w-full md:w-1/2">
              <img
                src="/assets/hero-hands-heart.svg"
                alt="Hands holding heart"
                className="w-3/4 mx-auto md:w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <HeroCarousel />

      {/* Resources Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-dark mb-12">
            Helpful Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                emoji: "📘",
                title: "Planning Toolkit",
                desc: "Download a step-by-step guide to advance care planning.",
              },
              {
                emoji: "⚖️",
                title: "Legal Support",
                desc: "Access resources on wills, power of attorney, and rights.",
              },
              {
                emoji: "🧘‍♀️",
                title: "Emotional Support",
                desc: "Find local support groups or talk to trained facilitators.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
              >
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
