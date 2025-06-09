import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Palette, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-gray-900/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Palette className="h-8 w-8 text-fuchsia-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
              ArtConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/hub" label="Artists" />
            <NavLink to="/gallery" label="Gallery" />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white rounded-lg hover:bg-gray-800 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <NavLink to="/" label="Home" isMobile />
          <NavLink to="/hub" label="Artists" isMobile />
          <NavLink to="/movements" label="Movements" isMobile />
          <NavLink to="/timeline" label="Timeline" isMobile />
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ to, label, isMobile = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        ${isMobile ? "py-2 block text-lg" : "text-sm"}
        font-medium transition-colors
        ${isActive ? "text-fuchsia-400" : "text-gray-300 hover:text-white"}
      `}
    >
      {label}
    </Link>
  );
};

export default Navbar;
