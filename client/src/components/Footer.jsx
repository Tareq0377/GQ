export default function Footer() {
    return (
      <footer className="bg-white border-t py-4 px-6 mt-auto text-sm text-gray-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Logo/Brand */}
          <div className="font-semibold text-indigo-600 text-base">HELP</div>
  
          {/* Center: Links */}
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
  
          {/* Right: Copyright */}
          <div className="text-xs text-gray-500 text-center md:text-right">
            © {new Date().getFullYear()} HELP | Healthy End-of-Life Planning
          </div>
        </div>
      </footer>
    );
  }
  