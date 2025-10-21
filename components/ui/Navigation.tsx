"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import LoginModal from "./LoginModal";
// ChevronDown and MapPin icons are now inline SVG elements

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isMobileLocationsOpen, setIsMobileLocationsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Over", href: "/over" },
    { name: "Diensten", href: "/diensten" },
    {
      name: "Locaties",
      href: "#",
      submenu: [
        { name: "Keerbergen", href: "/keerbergen" },
        { name: "Mechelen", href: "/mechelen" },
        { name: "Leuven", href: "/leuven" },
        { name: "Putte", href: "/putte" },
        { name: "Bonheiden", href: "/bonheiden" },
        { name: "Rijmenam", href: "/rijmenam" }
      ]
    },
    { name: "Contact", href: "/contact" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLocationsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/20 backdrop-blur-md shadow-soft border-b border-gray-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 pt-4">
          {/* Logo */}
          <div 
            className="flex items-center group cursor-pointer"
            onClick={() => setIsLoginModalOpen(true)}
            title="Klik voor admin login"
          >
            <Image
              src="/images/logo-yannova.png"
              alt="Yannova Bouw Logo"
              width={250}
              height={125}
              className="h-20 w-auto transition-transform duration-200 group-hover:scale-105 mt-2 mb-1"
              priority
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.submenu ? (
                <div key={item.name} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsLocationsOpen(!isLocationsOpen)}
                    className="flex items-center text-white hover:text-yannova-primary transition-colors duration-200 font-medium group focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2"
                    aria-haspopup="true"
                    aria-label={`${item.name} submenu`}
                  >
                    {item.name}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`ml-1 transition-transform duration-200 ${isLocationsOpen ? 'rotate-180' : ''}`} aria-hidden="true">
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </button>

                  {/* Desktop Dropdown */}
                  {isLocationsOpen && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-medium border border-gray-100 py-2 animate-scale-in"
                      aria-label={`${item.name} submenu`}
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-yannova-primary/5 hover:text-yannova-primary transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-yannova-primary" aria-hidden="true">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-yannova-primary transition-colors duration-200 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yannova-primary transition-all duration-200 group-hover:w-full"></span>
                </Link>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:text-yannova-primary hover:bg-white/10 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2"
            aria-label={isOpen ? "Sluit menu" : "Open menu"}
            aria-controls="mobile-menu"
          >
            {isOpen ?
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              :
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            }
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden pb-6 border-t border-gray-200/30 bg-gray-900/20 backdrop-blur-md animate-slide-in-from-left"
            role="navigation"
            aria-label="Hoofdmenu"
          >
            <div className="flex flex-col space-y-2 pt-4">
              {navItems.map((item) => (
                item.submenu ? (
                  <div key={item.name}>
                    <button
                      onClick={() => setIsMobileLocationsOpen(!isMobileLocationsOpen)}
                      className="flex items-center justify-between w-full px-2 py-3 text-white hover:text-yannova-primary transition-colors duration-200 font-medium focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2"
                      aria-haspopup="listbox"
                      aria-label={`${item.name} submenu`}
                    >
                      {item.name}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`ml-1 transition-transform duration-200 ${isMobileLocationsOpen ? 'rotate-180' : ''}`} aria-hidden="true">
                        <polyline points="6,9 12,15 18,9"></polyline>
                      </svg>
                    </button>

                    {/* Mobile Submenu */}
                    {isMobileLocationsOpen && (
                      <div 
                        className="ml-4 space-y-1 animate-fade-in"
                        aria-label={`${item.name} submenu`}
                      >
                        {item.submenu.map((subItem) => (
                          <div key={subItem.name} onClick={() => {
                            setIsOpen(false);
                            setIsMobileLocationsOpen(false);
                          }}>
                            <Link
                              href={subItem.href}
                              className="flex items-center px-2 py-2 text-gray-200 hover:text-yannova-primary transition-colors duration-200 text-sm focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-yannova-primary" aria-hidden="true">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                              </svg>
                              {subItem.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div key={item.name} onClick={() => setIsOpen(false)}>
                    <Link
                      href={item.href}
                      className="block px-2 py-3 text-white hover:text-yannova-primary transition-colors duration-200 font-medium rounded-lg hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2"
                    >
                      {item.name}
                    </Link>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </nav>
  );
}
