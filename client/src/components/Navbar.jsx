import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsMobileMenuOpen(false);
    setShowProfileDropdown(false);
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `relative transition-colors duration-200 ease-in-out
     ${isActive ? "text-primary font-semibold" : "hover:text-primary-dark"}
     after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 
     after:bg-primary after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-primary tracking-wide">
          <NavLink to="/">HELP</NavLink>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-base font-semibold text-gray-800">
          <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
          <NavLink to="/quiz" className={navLinkClass}>Quiz</NavLink>
          <NavLink to="/resources" className={navLinkClass}>Resources</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact Us</NavLink>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 text-sm focus:outline-none"
              >
                <img
                  src={user.picture || '/default-user.png'}
                  alt="profile"
                  className="w-8 h-8 rounded-full border object-cover bg-white shadow-sm"
                />
                <span className="font-semibold text-base text-gray-800 hidden sm:inline">{user.name}</span>
              </button>
              {showProfileDropdown && (
                <div
                  className="absolute right-0 mt-2 w-52 bg-white border rounded-md shadow-md z-50"
                  onMouseLeave={() => setShowProfileDropdown(false)}
                >
                  <div className="px-4 py-2 text-sm text-gray-800 border-b">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500 truncate">{user.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-primary text-white px-4 py-1.5 rounded-full hover:bg-primary-dark transition font-medium shadow-sm"
            >
              Login
            </NavLink>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="flex flex-col items-start gap-4 px-4 pb-4 text-base font-medium bg-white border-t md:hidden">
          <NavLink to="/about" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>About Us</NavLink>
          <NavLink to="/quiz" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Quiz</NavLink>
          <NavLink to="/resources" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Resources</NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Contact Us</NavLink>
          {user ? (
            <div className="flex items-center gap-3">
              <img src={user.picture || '/default-user.png'} alt="profile" className="w-6 h-6 rounded-full border" />
              <span>{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-primary text-white px-4 py-1.5 rounded-full hover:bg-primary-dark transition font-medium mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
}
