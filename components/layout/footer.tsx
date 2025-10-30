import { Button } from "@/components/ui/button";
import { FaInstagram, FaTripadvisor, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { Mail } from "lucide-react";
import { BiSolidPhone } from "react-icons/bi";
import { li, section, ul } from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import { time } from "console";

export const Footer = () => {
  const footerIcons = [
    {
      name: FaInstagram,
      link: "/",
    },
    {
      name: FaTripadvisor,
      link: "/",
    },
    {
      name: FaXTwitter,
      link: "/",
    },
    {
      name: FaFacebookF,
      link: "/",
    },
  ];
  const contactInfo = [
    {
      icon: MdLocationOn,
      info: "123 Ocean View Drive, Palm Bay",
    },
    {
      icon: BiSolidPhone,
      info: "+1 248 338-0000 ",
    },
    {
      icon: Mail,
      info: "info@silverpalmresort.com",
    },
  ];

  const footerLinks = [
    {
      heading: "Useful Links",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Accommodation", href: "/accommodation" },
        { name: "Gallery", href: "/gallery" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Explore",
      links: [
        { name: "Dining & Bars", href: "/diningandbars" },
        { name: "Spa & Wellness", href: "/spa and wellness" },
        { name: "Events & Weddings", href: "/eventsandweddings" },
        { name: "Offers & Packages", href: "/offersandpackages" },
      ],
    },
  ];

  const openingHours = [
    {
      heading: "Opening Hours",
      services: [
        { name: "Resort Reception:", time: "Open 24/7" },
        { name: "Restaurant:", time: "7:00 AM - 10:00 PM" },
        { name: "Spa & Wellness:", time: "9:00 AM - 8:00 PM" },
      ],
    },
  ];

  return (
    <section className="border-t border-neutral-50/15 bg-[var(--footer-bg)]">
      <div className="max-w-[1350px]  mx-auto px-6 lg:px-8 py-[45px] grid grid-cols-1 gap-[45px] text-[var(--minor-text)]">
        <div className="flex flex-wrap items-center gap-[25px] ">
          <ul className="grid grid-cols-1 gap-2">
            <li className="font-medium text-[var(--major-text)] text-base xl:text-lg">
              Subscribe to our <span className="text-primary">Newsletter</span>
            </li>
            <li className="text-sm sm:text-[15px]">
              Be the first to know about special packages and seasonal getaways.
            </li>
          </ul>
          <input
            type="email"
            placeholder="Enter your email"
            className="text-neutral-90 text-sm sm:text-[15px] bg-neutral-10 rounded-lg px-[20px] w-[250px] md:w-[270px] py-2  overflow-x-auto focus:ring-primary focus:ring-2 focus:outline-none "
          />
          <Button variant="outline" size="lg">
            Subscribe
          </Button>
        </div>
        <div className="flex flex-wrap gap-12 items-center justify-between">
          <div className="space-y-[25px]">
            <div className="space-y-3">
              <Image
                src="/svg/silver-palm-logo.svg"
                alt="silver palm logo img"
                width={140}
                height={75}
              />
              <p className="capitalize text-[var(--major-text)] text-h6 font-semibold">
                Silver palm resort
              </p>
              <p className="text-sm sm:text-[15px] ">
                Creating memories wrapped in comfort and nature
              </p>
            </div>
            <div className="space-y-[30px]">
              <ul className="grid grid-cols-1 gap-[15px] items-center">
                {contactInfo.map((info, index) => (
                  <li
                    key={index}
                    className="text-sm sm:text-[15px] flex items-center gap-[15px]"
                  >
                    <info.icon className="w-6 h-6 text-primary" />
                    <span className="text-[var(--major-text)]">
                      {info.info}
                    </span>
                  </li>
                ))}
              </ul>
              <ul className="flex gap-5 items-center">
                {footerIcons.map((Icon, index: number) => (
                  <Link
                    href={Icon.link}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <li className="p-3 rounded-full border border-primary text-primary hover:text-neutral-10 hover:bg-primary transition-colors duration-300 cursor-pointer">
                      <Icon.name className="w-5 h-5 " />
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap items-start gap-[50px] md:gap-[100px]">
            {footerLinks.map((item, index) => (
              <div key={index} className="grid grid-cols-1 gap-4">
                <p className="text-[var(--major-text)] text-base xl:text-lg font-medium capitalize">
                  {item.heading}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {item.links.map((link, linkIndex) => (
                    <Link key={linkIndex} href={link.href}>
                      <p className="text-sm sm:text-[15px] hover:text-primary transition-colors">
                        {link.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            {openingHours.map((item, index) => (
              <div key={index} className="grid grid-cols-1 gap-4">
                <p className="text-[var(--major-text)] text-base xl:text-lg font-medium capitalize">
                  {item.heading}
                </p>
                <div className="grid grid-cols-1 gap-4">
                  {item.services.map((link, linkIndex) => (
                    <ul key={linkIndex}>
                      <li className="text-bodyRegular text-primary transition-colors">
                        {link.name}
                      </li>
                      <li className="uppercase text-sm sm:text-[15px]">
                        {link.time}
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center text-sm sm:text-[15px] text-[var(--major-text)] border-t border-neutral-50/15 pt-8">
          <p className="capitalize">
            © 2025 <span className="font-medium">Silver Palm Resort.</span> All
            rights reserved
          </p>
          <p>
            Designed by{" "}
            <span className="text-primary font-medium">DABTECH</span>
          </p>
        </div>
      </div>
    </section>
  );
};
