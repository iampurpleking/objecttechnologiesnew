"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/#services" },
  { name: "Blog", href: "/blog" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Products", href: "/products" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className={`w-full font-inter sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-brand-white/95 backdrop-blur-md shadow-lg border-b border-brand-orange/10' 
        : 'bg-brand-white border-b border-brand-orange/20'
    }`}>
      <div className="container-max flex items-center justify-between py-4">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img 
              src="/logo.svg" 
              alt="Object Technologies Logo" 
              className="h-10 w-10 object-contain transform group-hover:scale-110 transition-transform duration-300 md:ml-0 ml-2" 
            />
          </div>
          <div className="hidden md:block">
            <span className="text-xl font-bold text-brand-orange font-poppins">Object Technologies</span>
            <div className="text-xs text-brand-gray-500 font-medium">Digital Innovation</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`relative font-medium transition-all duration-300 hover:text-brand-orange group ${
                isActive(link.href) ? 'text-brand-orange' : 'text-brand-gray-700'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-orange transition-all duration-300 ${
                isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/dashboard" className="text-brand-gray-600 hover:text-brand-orange transition-colors font-medium">
            Dashboard
          </Link>
          <Link href="/login" className="btn-primary">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden flex flex-col gap-1.5 p-2 group" 
          onClick={() => setOpen(!open)} 
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-brand-gray-700 transition-all duration-300 ${
            open ? 'rotate-45 translate-y-2 bg-brand-orange' : 'group-hover:bg-brand-orange'
          }`}></span>
          <span className={`block w-6 h-0.5 bg-brand-gray-700 transition-all duration-300 ${
            open ? 'opacity-0' : 'group-hover:bg-brand-orange'
          }`}></span>
          <span className={`block w-6 h-0.5 bg-brand-gray-700 transition-all duration-300 ${
            open ? '-rotate-45 -translate-y-2 bg-brand-orange' : 'group-hover:bg-brand-orange'
          }`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        open 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="bg-brand-white border-t border-brand-orange/10 px-4 pb-6">
          <div className="flex flex-col gap-4 mt-4">
            {/* Logo on mobile menu */}
            <div className="flex items-center justify-center mb-2">
              <img src="/logo.svg" alt="Logo" className="h-10 w-10 object-contain ml-2" />
            </div>
            {navLinks.map(link => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-lg font-medium transition-colors py-2 ${
                  isActive(link.href) ? 'text-brand-orange' : 'text-brand-gray-700 hover:text-brand-orange'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-brand-gray-200 pt-4 mt-2 space-y-3">
              <Link 
                href="/dashboard" 
                className="block text-brand-gray-600 hover:text-brand-orange transition-colors font-medium"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/login" 
                className="block btn-primary text-center"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
