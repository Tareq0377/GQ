import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // you can use any icon set, this is just for demo


function Navbar() {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
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
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `relative transition-colors duration-200 ease-in-out
     ${isActive ? "text-indigo-600 font-semibold" : "hover:text-indigo-500"}
     after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 
     after:bg-indigo-500 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600 tracking-wide">
          <NavLink to="/">HELP</NavLink>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-10 text-base font-medium">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/quiz" className={navLinkClass}>Quiz</NavLink>
          <NavLink to="/resources" className={navLinkClass}>Resources</NavLink>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 text-sm focus:outline-none"
              >
                <img
                  src={user.picture || '/default-user.png'}
                  alt="profile"
                  className="w-8 h-8 rounded-full border object-cover"
                />
                <span className="font-medium hidden sm:inline">{user.name}</span>
              </button>

              {showDropdown && (
                <div
                  className="absolute right-0 mt-2 w-52 bg-white border rounded-md shadow-md z-50"
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <div className="px-4 py-2 text-sm text-gray-800 border-b">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500 truncate">{user.email}</div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className={navLinkClass}>Login</NavLink>
          )}

        </nav>

        {/* Mobile Toggle Button */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="flex flex-col items-start gap-4 px-4 pb-4 text-base font-medium bg-white border-t md:hidden">
          <NavLink to="/" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/quiz" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Quiz</NavLink>
          <NavLink to="/resources" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Resources</NavLink>
          {user ? (
            <div className="flex items-center gap-3">
              <img src={user.picture} alt="profile" className="w-6 h-6 rounded-full border" />
              <span>{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Login</NavLink>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
