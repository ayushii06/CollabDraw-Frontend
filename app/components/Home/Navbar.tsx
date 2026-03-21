"use client";

import { useEffect, useState } from "react";
import { Menu, Pen, X } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/images/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Docs", href: "/docs" },
    { name: "Pricing", href: "/pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
      ${
        scrolled
          ? "bg-white/70 backdrop-blur-lg border-b border-gray-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[72px] grid grid-cols-3 items-center">

        {/* Logo */}
        <div className="flex items-center ">
          <Image
            src={logo}
            alt="Collab Draw logo"
            width={90}
            height={40}
            className=""
            priority
          />
          <span className="logo text-gray-600 font-semibold text-2xl">Collab Draw</span>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex justify-center gap-10">
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="text-gray-600 font-medium hover:text-black transition"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right Buttons */}
        <div className="hidden md:flex justify-end items-center gap-4">
          <button className="text-gray-700 hover:text-black transition">
            Sign In
          </button>

          <a className="px-5 flex justify-center items-center gap-2 py-2 rounded-xl bg-black text-white hover:scale-[1.02] transition" href="/room/createRoom">
             <Pen className="w-4"/>Start Drawing
          </a>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex justify-end">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </nav>
  );
}