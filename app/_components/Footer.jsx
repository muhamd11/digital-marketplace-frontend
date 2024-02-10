'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";


const Footer = () => {
  const { user } = useUser()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(window.location.href.toString().includes("sign-in") || window.location.href.toString().includes("sign-up"));
  }, []);
  
  return !isLoggedIn && (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-teal-600 sm:justify-start">
            <Image src="/logo.svg" alt="logo" width={85} height={85} />
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; {new Date().getFullYear()}. Developed By{" "}
            <a
              className="text-primary"
              href="https://www.linkedin.com/in/muhamed-medhat-484658252/"
              target="blank"
            >
              Muhamed
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
