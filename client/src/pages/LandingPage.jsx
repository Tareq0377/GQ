import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Plan for Peace of Mind</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Empower yourself with knowledge and tools to prepare for healthy end-of-life planning.
        </p>
        <Link to="/quiz">
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-indigo-100 transition">
            Take the Quiz
          </button>
        </Link>
      </section>

      {/* Resources Section */}
      <section className="py-16 px-4 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">Helpful Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-5xl mb-4">📘</div>
              <h3 className="text-xl font-semibold mb-2">Resource Title {i}</h3>
              <p className="text-gray-600 mb-4">A short description of this helpful resource.</p>
              <a href="#" className="text-indigo-600 hover:underline">Learn more →</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
