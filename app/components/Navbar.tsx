"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Products", href: "/products" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full bg-brand-white border-b border-brand-orange/20 font-poppins sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo only on mobile, logo and brand name on desktop */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-brand-orange">
          <img src="/logo.svg" alt="Object Technologies Logo" width={30} height={30} className="h-12 w-12 object-contain" />
          <span className="hidden md:inline">Object Technologies</span>
        </Link>
        {/* Desktop nav: always visible on md+ */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map(link => (
            <Link key={link.name} href={link.href} className="hover:text-brand-orange transition-colors font-medium">
              {link.name}
            </Link>
          ))}
          <Link href="/login" className="ml-4 px-4 py-2 bg-brand-orange text-white rounded hover:bg-brand-black transition-colors font-semibold">Sign Up / Login</Link>
        </div>
        {/* Mobile menu toggle: only visible on mobile */}
        <button className="md:hidden flex flex-col gap-1 ml-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span className={`block w-6 h-0.5 bg-brand-black transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-brand-black transition-all ${open ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-brand-black transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>
      {/* Mobile nav menu: only visible on mobile and when open */}
      {open && (
        <div className="md:hidden bg-brand-white border-t border-brand-orange/20 flex flex-col items-center gap-4 py-4">
          {navLinks.map(link => (
            <Link key={link.name} href={link.href} className="text-lg hover:text-brand-orange transition-colors font-medium" onClick={() => setOpen(false)}>
              {link.name}
            </Link>
          ))}
          <Link href="/login" className="mt-2 px-4 py-2 bg-brand-orange text-white rounded hover:bg-brand-black transition-colors font-semibold" onClick={() => setOpen(false)}>
            Sign Up / Login
          </Link>
        </div>
      )}
    </nav>
  );
}
