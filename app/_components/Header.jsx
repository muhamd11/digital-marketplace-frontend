"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../_context/CartContext";
import cartApis from "../_utils/cartApis";
import Cart from './Cart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { cart, setCart } = useContext(CartContext);

  const [isCartOpen, setIsCartOpen] = useState(false)

  const { user } = useUser();

  const getUserCartItems_ = () => {
    cartApis
      .getUserCartItems(user.primaryEmailAddress.emailAddress)
      .then((res) => {
        res?.data?.data?.forEach((cartItem) => {
          setCart((oldCart) => [
            ...oldCart,
            {
              id: cartItem.id,
              product: cartItem?.attributes?.products?.data[0],
            },
          ]);
        });
      });
  };  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartOpen = () => {
    setIsCartOpen(!isCartOpen)
  }

  useEffect(() => {
    user && getUserCartItems_();
  }, [user]);

  useEffect(() => {
    setIsLoggedIn(
      window.location.href.toString().includes("sign-in") ||
        window.location.href.toString().includes("sign-up")
    );
  }, []);

  return (
    !isLoggedIn && (
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href={"/"} className="md:flex md:items-center md:gap-12">
              <Image src="/logo.svg" alt="logo" width={85} height={85} />
            </Link>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      Home
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      Explore
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      About Us
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-5">
                {user && (
                  <h2 onClick={handleCartOpen} className="flex items-center gap-2 cursor-pointer">
                    <ShoppingCart  className="hover:cursor-pointer" />
                    ({cart?.length || 0})
                  </h2>
                )}

                {!user ? (
                  <div className="sm:flex sm:gap-4">
                    <a
                      className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow"
                      href="/sign-in"
                    >
                      Login
                    </a>

                    <div className="hidden sm:flex">
                      <a
                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary"
                        href="/sign-up"
                      >
                        Register
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>
                    <UserButton afterSignOutUrl="/" />
                    <Cart isCartOpen={isCartOpen} />
                  </div>
                )}
              </div>

              <div className="block md:hidden">
                <button
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                  onClick={toggleMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {isMenuOpen && (
              <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 z-10">
                <ul className="flex flex-col items-center gap-4 py-4 ">
                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      Explore
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    )
  );
};

export default Header;
