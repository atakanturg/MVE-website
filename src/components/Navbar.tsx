import { Link, useLocation } from "wouter";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Investment Summit", href: "/investment-summit" },
    { name: "SFERE", href: "/sfere" },
    { name: "REASON", href: "/reason" },
    { name: "MVE Fund", href: "/investment-challenge" },
    { name: "Competitions", href: "/competitions" },
  ];

  const handleContactClick = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: scrollDirection === "down" && !isAtTop ? -100 : 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex flex-col md:flex-row md:items-center justify-between px-6 py-4 md:px-12 transition-colors duration-300 bg-transparent border-transparent`}
    >
      <div className="flex items-center justify-between w-full md:w-auto md:order-2">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground mr-4 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="text-primary font-extrabold text-2xl tracking-[0.2em] font-sans transition-colors duration-300"
        >
          MVE
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 md:order-1 h-full">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={`text-sm font-bold uppercase tracking-wider transition-colors flex items-center h-full ${
              location === link.href
                ? "text-primary"
                : "text-foreground/80 hover:text-primary"
            }`}
          >
            {link.name}
          </Link>
        ))}
        <Link
          to="/contact"
          className={`text-sm font-bold uppercase tracking-wider transition-colors flex items-center h-full ${
            location === "/contact"
              ? "text-primary"
              : "text-foreground/80 hover:text-primary"
          }`}
        >
          Contact
        </Link>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden flex flex-col items-start pt-6 pb-2 gap-4 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-bold uppercase tracking-wider transition-colors w-full ${
                  location === link.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={handleContactClick}
              className={`text-sm font-bold uppercase tracking-wider transition-colors w-full ${
                location === "/contact"
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
