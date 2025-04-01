import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode }) => {
  return (
    <nav
      className={`bg-navbar shadow-md border-b border-gray-200 h-16 flex items-center z-10`}
      style={{
        backgroundColor: "var(--bg-color)",
        borderColor: "var(--tile-border-empty)",
      }}
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold transition-colors duration-150"
            style={{ color: "var(--text-color)" }}
          >
            Wordle Game
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
