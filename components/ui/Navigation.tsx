"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, MapPin } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isMobileLocationsOpen, setIsMobileLocationsOpen] = useState(false);
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-3xl font-bold gradient-text group-hover:scale-105 transition-transform duration-200">
              Yannova
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.submenu ? (
                <div key={item.name} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsLocationsOpen(!isLocationsOpen)}
                    className="flex items-center text-gray-700 hover:text-yannova-primary transition-colors duration-200 font-medium group"
                  >
                    {item.name}
                    <ChevronDown
                      size={16}
                      className={`ml-1 transition-transform duration-200 ${isLocationsOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Desktop Dropdown */}
                  {isLocationsOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-medium border border-gray-100 py-2 animate-scale-in">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-yannova-primary/5 hover:text-yannova-primary transition-colors duration-200"
                          onClick={() => setIsLocationsOpen(false)}
                        >
                          <MapPin size={16} className="mr-3 text-yannova-primary" />
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
                  className="text-gray-700 hover:text-yannova-primary transition-colors duration-200 font-medium relative group"
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
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-yannova-primary hover:bg-gray-100 transition-colors duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t border-gray-100 animate-slide-in-from-left">
            <div className="flex flex-col space-y-2 pt-4">
              {navItems.map((item) => (
                item.submenu ? (
                  <div key={item.name}>
                    <button
                      onClick={() => setIsMobileLocationsOpen(!isMobileLocationsOpen)}
                      className="flex items-center justify-between w-full px-2 py-3 text-gray-700 hover:text-yannova-primary transition-colors duration-200 font-medium"
                    >
                      {item.name}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isMobileLocationsOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Mobile Submenu */}
                    {isMobileLocationsOpen && (
                      <div className="ml-4 space-y-1 animate-fade-in">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => {
                              setIsOpen(false);
                              setIsMobileLocationsOpen(false);
                            }}
                            className="flex items-center px-2 py-2 text-gray-600 hover:text-yannova-primary transition-colors duration-200 text-sm"
                          >
                            <MapPin size={14} className="mr-3 text-yannova-primary" />
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
                    onClick={() => setIsOpen(false)}
                    className="px-2 py-3 text-gray-700 hover:text-yannova-primary transition-colors duration-200 font-medium rounded-lg hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
