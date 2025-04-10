import { Link } from "react-router-dom";

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

      {/* Carousel Placeholder */}
      <section className="px-6 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl h-52 bg-gradient-to-r from-[#4aa69d] to-[#78c5b6] flex items-center justify-center text-white text-xl">
            Image Carousel Placeholder
          </div>
          <div className="flex justify-center mt-4 gap-2">
            <span className="h-2 w-2 rounded-full bg-white/70"></span>
            <span className="h-2 w-2 rounded-full bg-white/30"></span>
            <span className="h-2 w-2 rounded-full bg-white/30"></span>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-[#1a3a3a]">Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: "💡",
                title: "Guides & Articles",
                desc: "Learn about end-of-life planning",
              },
              {
                icon: "💚",
                title: "Support Services",
                desc: "Access local national support",
              },
              {
                icon: "📅",
                title: "Workshops & Events",
                desc: "Join our educational events",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition text-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-1 text-[#1f3d3d]">{item.title}</h3>
                <p className="text-sm text-[#4d5c5c]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
