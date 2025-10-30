"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SignInModal } from "@/components/ui/sign-in-modal";
import { SignUpModal } from "@/components/ui/sign-up-modal";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { TbMenu3 } from "react-icons/tb";
import { useMenu } from "@/contexts/menu-context";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const { isMenuOpened, setIsMenuOpened } = useMenu();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Accommodation", href: "/accommodation" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const webScroll = () => {
    const scrolled = window.scrollY;
    setIsScrolled(scrolled > 10);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      menuRef.current &&
      !menuRef.current.contains(target) &&
      buttonRef.current &&
      !buttonRef.current.contains(target)
    ) {
      setIsMenuOpened(false);
    }
  };
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") setIsMenuOpened(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", webScroll);
    document.addEventListener("keydown", handleEsc);

    if (isMenuOpened) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    document.body.style.overflow = isMenuOpened ? "hidden" : "auto";

    return () => {
      window.removeEventListener("scroll", webScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isMenuOpened, webScroll, handleClickOutside]);

  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="fixed top-0 w-full z-60 pt-5 px-5">
      <div
        className={`max-w-7xl mx-auto py-2.5 md:py-3 px-5 
          ${
            isScrolled
              ? "bg-[var(--bg-shade)]/80 backdrop-blur-md "
              : "bg-[var(--bg-shade)]"
          }
          rounded-full flex-between`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/svg/silver-palm-logo.svg"
            alt="Silver Palm Resort Logo"
            width={115}
            height={70}
            className="w-20 h-auto"
          />
        </Link>

        {/* Navigation Links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href);
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`text-sm xl:text-[15px] hover:text-primary transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-[var(--major-text)]"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Side - Theme Toggle & Sign In Button */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          <ThemeToggle />
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsSignInModalOpen(true)}
          >
            Sign In
          </Button>
          <p
            ref={buttonRef}
            onClick={() => {
              setIsMenuOpened(!isMenuOpened);
            }}
            className="lg:hidden"
          >
            <TbMenu3
              className={`h-5.5 w-5.5 transition-colors duration-300 cursor-pointer ${
                isMenuOpened
                  ? "text-primary"
                  : "text-tertiary hover:text-primary"
              }`}
            />
          </p>
        </div>
      </div>

      {/* Auth Modals */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSwitchToSignUp={() => setIsSignUpModalOpen(true)}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSwitchToSignIn={() => setIsSignInModalOpen(true)}
      />

      {/* Overlay */}
      {/* {isMenuOpened && <div className="fixed inset-0 bg-black/40 z-40" />} */}

      {isMenuOpened && (
        <div className="lg:hidden mt-3 w-full flex justify-end">
          <div
            ref={menuRef}
            className={`${
              isMenuOpened
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10 pointer-events-none"
            } p-3 bg-[var(--bg-shade)]/90 backdrop-blur-xs rounded-xl sm:w-[220px] md:w-[250px] grid grid-cols-1 gap-1 mr-5`}
          >
            {navLinks.map((link, linkIndex) => {
              const isActive = isActiveLink(link.href);
              return (
                <Link
                  key={linkIndex}
                  href={link.href}
                  onClick={() => setIsMenuOpened(false)}
                >
                  <p
                    className={`text-bodySmall sm:text-navRegular p-2.5 rounded-lg text-center ${
                      isActive
                        ? "text-primary bg-[var(--mobilenav-active-bg)]"
                        : "text-[var(--major-text)] hover:text-primary hover:bg-primary/5"
                    } `}
                  >
                    {link.name}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};
