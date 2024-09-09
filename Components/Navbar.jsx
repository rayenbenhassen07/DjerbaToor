"use client";

import { FaRegNewspaper } from "react-icons/fa6";
import { IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-neutral-800 w-full fixed left-0 top-0 z-40 py-4">
      <div className="flex justify-between items-center max-w-[1500px] px-2 ml-auto mr-auto">
        <a href="/" className="font-semibold text-lg">
          <div className="text-2xl text-white p-2">Jediwa</div>
        </a>

        <div className="flex items-center gap-7 lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>

        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } lg:flex bg-neutral-800 text-white w-full h-full items-center justify-center gap-10`}
        >
          <Link href="/">
            <li className="cursor-pointer">
              <div className="text-sm lg:text-base">Home</div>
            </li>
          </Link>

          <a href="/product-category/excursions">
            <li className="cursor-pointer">
              <div className="text-sm lg:text-base">Excursions</div>
            </li>
          </a>

          <a href="#Statistic">
            <li className="cursor-pointer">
              <div className="text-sm lg:text-base">Events</div>
            </li>
          </a>

          <a href="#Examples">
            <li className="cursor-pointer">
              <div className="text-sm lg:text-base">Blog</div>
            </li>
          </a>

          <a href="#Services">
            <li className="cursor-pointer">
              <div className="text-sm lg:text-base">Contact</div>
            </li>
          </a>
        </ul>

        <div className="hidden lg:flex justify-center items-center gap-7">
          <a href="#calendly">
            <button className="p-3 w-40 rounded-xl text-sm bg-blue-500 text-white font-extrabold hover:bg-blue-600 transition">
              <div className="flex justify-center items-center gap-2">
                <FaRegNewspaper size={20} className="text-white" />
                Book Now
              </div>
            </button>
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-neutral-800 text-white flex flex-col items-center justify-center gap-10 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-white"
        >
          <IoClose size={24} />
        </button>
        <Link href="/" onClick={toggleMenu}>
          <div className="text-lg">Home</div>
        </Link>
        <a href="/product-category/excursions" onClick={toggleMenu}>
          <div className="text-lg">Excursions</div>
        </a>
        <a href="#Statistic" onClick={toggleMenu}>
          <div className="text-lg">Events</div>
        </a>
        <a href="#Examples" onClick={toggleMenu}>
          <div className="text-lg">Blog</div>
        </a>
        <a href="#Services" onClick={toggleMenu}>
          <div className="text-lg">Contact</div>
        </a>
        <a href="#calendly">
          <button className="p-3 w-40 rounded-xl text-sm bg-blue-500 text-white font-extrabold hover:bg-blue-600 transition">
            <div className="flex justify-center items-center gap-2">
              <FaRegNewspaper size={20} className="text-white" />
              Book Now
            </div>
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
