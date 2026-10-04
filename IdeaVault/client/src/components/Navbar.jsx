import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  // NavLink adds the "active" class to the current page link
  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to={user ? "/dashboard" : "/login"} className="brand" onClick={closeMenu}>
          <span className="brand-icon" aria-hidden="true">💡</span>
          IdeaVault
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {user ? (
            <>
              <NavLink to="/dashboard" className={linkClass} onClick={closeMenu}>
                Home
              </NavLink>
              <NavLink to="/ideas" end className={linkClass} onClick={closeMenu}>
                My Ideas
              </NavLink>
              <NavLink to="/favorites" className={linkClass} onClick={closeMenu}>
                Favorites
              </NavLink>
              <NavLink to="/profile" className={linkClass} onClick={closeMenu}>
                Profile
              </NavLink>
              <button className="nav-link nav-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass} onClick={closeMenu}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkClass} onClick={closeMenu}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
