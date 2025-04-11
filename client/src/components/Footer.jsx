import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#4aa69d] text-white py-8 text-center mt-auto">
      <div className="space-x-6 text-sm mb-2">
        <Link to="/about" className="hover:underline transition">About Us</Link>
        <Link to="/quiz" className="hover:underline transition">Quiz</Link>
        <Link to="/resources" className="hover:underline transition">Resources</Link>
        <Link to="/contact" className="hover:underline transition">Contact</Link>
      </div>
      <p className="text-xs text-white/80">
        © {new Date().getFullYear()} HELP. All rights reserved.
      </p>
    </footer>
  );
}
