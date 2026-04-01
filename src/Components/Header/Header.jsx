import React, { useState, useEffect } from "react";
import "./Header.css";
import { Search, User, Menu, X } from "lucide-react";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Change header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "header-black" : ""}`}>
      <div className="header-left">
        <div className="logo">
          <h2>JOYVIEW</h2>
        </div>
        
        {/* Navigation - toggles 'nav-active' class on mobile */}
        <nav className={`nav ${isMobile ? "nav-active" : ""}`}>
          <ul>
            <li><a href="#" onClick={() => setIsMobile(false)}>Home</a></li>
            <li><a href="#" onClick={() => setIsMobile(false)}>Shows</a></li>
            <li><a href="#" onClick={() => setIsMobile(false)}>Movies</a></li>
            <li><a href="#" onClick={() => setIsMobile(false)}>Games</a></li>
            <li><a href="#" onClick={() => setIsMobile(false)}>MyList</a></li>
          </ul>
        </nav>
      </div>

      <div className="header-right">
        {/* Search Box */}
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input type="text" placeholder="Search" />
        </div>
        
        {/* User Actions */}
        <ul className="user-nav">
          <li className="kids-label">Kids</li>
          <li><User className="user-icon" size={22} /></li>
        </ul>

        {/* Hamburger Menu Toggle */}
        <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Header;