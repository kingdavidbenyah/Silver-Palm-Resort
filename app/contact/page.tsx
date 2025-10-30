"use client";
import { FaFacebookF, FaInstagram, FaTripadvisor } from "react-icons/fa";
import { FaXTwitter, FaPhone } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import { Send, MapPin } from "lucide-react";
import { HiOutlineMail } from "react-icons/hi";
import { PageHeader } from "@/components/pageHeader";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ul } from "framer-motion/client";
import CountUp from "@/components/animations/count-up";

export default function AccommodationPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading (in real app, this would be actual data fetching)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  const socialIcons = [FaInstagram, FaTripadvisor, FaXTwitter, FaFacebookF];
  const contactCards = [
    {
      Icon: FaPhone,
      action: "Call Us",
      detail: "+1 (248) 338-0000",
      extraInfo: "Response in 2-4 hours",
      href: "tel:+12483380000",
    },
    {
      Icon: HiOutlineMail,
      action: "Email Us",
      detail: "info@silverpalmresort.com",
      extraInfo: "Available 9AM - 6PM EST",
      href: "mailto:info@silverpalmresort",
    },
    {
      Icon: MapPin,
      action: "Visit Our Resort",
      detail: "123 Ocean View Drive, Palm Bay",
      extraInfo: "Open Monday - Friday",
      href: "https://maps.app.goo.gl/5Api3BjUnKdzQcxm9",
    },
  ];
  const contactStats = [
    {
      statTitle: "Average Response",
      stat: 24,
    },
    {
      statTitle: "Client Satisfaction",
      stat: 98,
    },
    {
      statTitle: "Stays Completed",
      stat: 4500,
    },
  ];
  return (
    <main>
      <PageHeader
        header="Contact"
        subHeader="Contact"
        image="https://i.pinimg.com/736x/4a/34/e9/4a34e9ddb347cbd27d2ffeb7842978a9.jpg"
        imgClassName="bg-[50%_25%]"
      />
      <section className="container-wide section-padding flex flex-col lg:flex-row items-center lg:items-end justify-center gap-[50px] xl:gap-[100px]">
        {/* Connect with Us and form */}
        <div className="space-y-[25px]">
          {/* Connect with Us */}
          <div className="space-y-4">
            <p className="text-bodyRegular font-medium text-center text-[var(--major-text)]">
              Connect With Us
            </p>
            <ul className="flex-center gap-[22px]">
              {socialIcons.map((Icon, index) => (
                <li
                  key={index}
                  className="cursor-pointer transition-all duration-300 group text-primary hover:text-neutral-10 hover:bg-primary p-3 bg-primary/8 rounded-xl border border-primary/10"
                >
                  <Icon className="w-5 h-5 transition-all duration-300 " />
                </li>
              ))}
            </ul>
          </div>
          {/* Form */}
          <div className="bg-[var(--bg-shade)] space-y-[45px] py-6 sm:py-8 px-5 sm:px-7 sm:p-10 rounded-3xl border-t-[3px] border-primary">
            {/* Have any Questions */}
            <ul className="space-y-4">
              <ul className="p-2.5 rounded-xl bg-primary mx-auto w-fit">
                <li>
                  <AiFillMessage className="w-[25px] h-[25px] text-neutral-10" />
                </li>
              </ul>
              <li className="text-h5 text-[var(--major-text)] text-center font-semibold">
                Have any Questions?
              </li>
              <li className="text-[var(--minor-text)] text-bodySmall max-w-[400px] text-center">
                Reach out to us using the form below — we’re always happy to
                help!
              </li>
            </ul>
            {/* Inputs */}
            <div className="space-y-5">
              <ul className="space-y-[15px]">
                <ul className="w-full flex-center gap-4">
                  <li>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      className="text-[var(--minor-text)] text-bodySmall bg-[var(--background)] border border-[var(--testimonial-border)] py-[14px] px-[15px] rounded-[10px] w-full focus:outline-none focus:ring-[1.5px] focus:ring-primary "
                    />
                  </li>
                  <li>
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      className="text-[var(--minor-text)] text-bodySmall bg-[var(--background)] border border-[var(--testimonial-border)] py-[14px] px-[15px] rounded-[10px] w-full focus:outline-none focus:ring-[1.5px] focus:ring-primary "
                    />
                  </li>
                </ul>
                <li>
                  <input
                    type="text"
                    placeholder="Enter Subject"
                    className="text-[var(--minor-text)] text-bodySmall bg-[var(--background)] border border-[var(--testimonial-border)] py-[14px] px-[15px] rounded-[10px] w-full focus:outline-none focus:ring-[1.5px] focus:ring-primary "
                  />
                </li>
                <li>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Enter Message"
                    maxLength={150}
                    className="text-[var(--minor-text)] text-bodySmall bg-[var(--background)] border border-[var(--testimonial-border)] py-[14px] px-[15px] rounded-[10px] w-full focus:outline-none focus:ring-[1.5px] focus:ring-primary  overflow-y-auto"
                  />
                </li>
              </ul>
              <Button
                variant="primary"
                size="lg"
                btnClassName="w-full"
                childClassName="flex-center gap-[10px]"
              >
                <span> Send Message </span> <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
        {/* Need Immediate assistance */}
        <div className="space-y-10 px-2">
          {/* Intro */}
          <div className="space-y-5">
            <p className="text-[24px] sm:text-[28px] lg:text-3xl md:text-[32px] text-[var(--major-text)] font-semibold">
              Need Immediate Assistance?
            </p>
            <p className="text-bodyRegular text-[var(--minor-text)]">
              Choose the fastest way to reach our Silver Palm Resort team below.
            </p>
          </div>
          {/* Cards */}
          <div className="grid grid-cols-1 space-y-5">
            {contactCards.map((card, index: number) => (
              <Link href={card.href} target="_blank" key={index}>
                <ul className="transition-all duration-300 cursor-pointer p-5 group hover:border-primary/15 shadow-contact-card bg-[var(--bg-shade)] border border-[var(--contact-card-border)] rounded-[20px] flex items-center justify-start gap-6">
                  <li className="transition-all duration-300 w-fit p-3 bg-primary/15 text-primary group-hover:bg-primary group-hover:text-neutral-10  rounded-xl border border-primary/10">
                    <card.Icon className="w-5 h-5 " />
                  </li>
                  <ul className="space-y-1.5 text-[var(--major-text)]">
                    <li className="text-herosub font-medium">{card.action}</li>
                    <li className="text-sm sm:text-[15px] font-semibold">
                      {card.detail}
                    </li>
                    <li className="mt-0.5 text-caption text-[var(--minor-text)]">
                      {card.extraInfo}
                    </li>
                  </ul>
                </ul>
              </Link>
            ))}
          </div>
          {/* Stats */}
          <div className="px-5 py-6 flex items-center rounded-[20px] gap-6 bg-gradient-to-br from-primary/5 to-[#354A53]/5 border border-[var(--contact-card-border)]">
            {contactStats.map((stat, index) => (
              <ul key={index} className="text-center">
                <li className="text-[22px] sm:text-[24px] font-semibold text-primary tracking-wide">
                  <CountUp
                    from={0}
                    to={stat.stat}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  <span>
                    {stat.statTitle.toLowerCase().includes("response") && "h"}
                    {stat.statTitle.toLowerCase().includes("satisfaction") &&
                      "%"}
                    {stat.statTitle.toLowerCase().includes("completed") && "+"}
                  </span>
                </li>
                <li className="text-caption text-[var(--minor-text)]">
                  {stat.statTitle}
                </li>
              </ul>
            ))}
          </div>
        </div>
      </section>
      <section className="container-wide py-10 sm:py-14 md:py-20">
        <div className="px-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15927.883232265478!2d39.87712921432409!3d-3.5941672423200997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x183fdc31958a7be7%3A0x1fe266cad2d79025!2sSilver%20Palm%20Spa%20And%20Resort%2C%20Kilifi!5e0!3m2!1sen!2sgh!4v1761118008187!5m2!1sen!2sgh"
            width="600"
            height="420"
            className="w-full  "
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Silver Palm Resort"
          />
        </div>
      </section>
    </main>
  );
}
