import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { UserIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
// import SearchBar from "../SearchBar"; // optional if you want search in navbar

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // ✅ mobile menu toggle
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 transition-all duration-300
        ${scrolled ? "bg-white shadow-lg" : "bg-transparent backdrop-blur-md"}
      `}
    >
      {/* Logo */}
      <h1 className="font-bold text-3xl text-red-700">
        Byte<span className="text-orange-400">Feast</span>
      </h1>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8 text-xl">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold text-orange-400" : "hover:text-orange-400 transition"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive ? "font-bold text-orange-400" : "hover:text-orange-400 transition"
          }
        >
          Menu
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "font-bold text-orange-400" : "hover:text-orange-400 transition"
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? "font-bold text-orange-400" : "hover:text-orange-400 transition"
          }
        >
          Orders
        </NavLink>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center space-x-6">
        <NavLink to="/signup" className="hover:text-orange-400 transition">
          <UserIcon className="h-6 w-6" aria-label="Signup/Profile" />
        </NavLink>

        <NavLink to="/cart" className="relative hover:text-orange-400 transition">
          <FaShoppingCart size={23} aria-label="Cart" />
          {totalQuantity > 0 && (
            <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
              {totalQuantity}
            </span>
          )}
        </NavLink>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-black"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <FaBars size={26} />
      </button>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start p-4 md:hidden">
          <NavLink to="/" className="py-2 text-black hover:text-orange-400">
            Home
          </NavLink>
          <NavLink to="/menu" className="py-2 text-black hover:text-orange-400">
            Menu
          </NavLink>
          <NavLink to="/profile" className="py-2 text-black hover:text-orange-400">
            Profile
          </NavLink>
          <NavLink to="/orders" className="py-2 text-black hover:text-orange-400">
            Orders
          </NavLink>
          <NavLink to="/signup" className="py-2 text-black hover:text-orange-400">
            Signup
          </NavLink>
          <NavLink to="/cart" className="py-2 text-black hover:text-orange-400">
            Cart ({totalQuantity})
          </NavLink>
          {/* Optional: SearchBar in mobile menu */}
          {/* <SearchBar /> */}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
