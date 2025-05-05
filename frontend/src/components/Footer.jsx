import React from "react";
import { FaPhoneAlt, FaEnvelope, FaCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="bg-black h-0.5"></div>
      <footer className="bg-green-800 text-black py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Contact Details */}
          <div className="flex flex-col items-start text-left md:items-start md:text-left md:order-1">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-black" />
              <span>+91 9759951540</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <FaEnvelope className="text-black" />
              <span>info@example.com</span>
            </div>
          </div>

          {/* Logo Section */}
          <div className="flex items-center justify-center order-1 md:order-none my-4 md:my-0">
            <img
              src="/head-logo-jamia-aneesul-uloom.jpg"
              alt="Logo"
              className="w-20 h-20 rounded-full"
            />
          </div>

          {/* Copyright Section */}
          <div className="flex flex-col items-end text-right md:items-end md:text-right md:order-2">
            <div className="flex items-center gap-2">
              <FaCopyright />
              <span>Copyright @2025</span>
            </div>
            <div>All rights reserved.</div>
          </div>
        </div>

        {/* Responsive Behavior */}
        <style jsx>{`
          @media (max-width: 768px) {
            .md\\:order-1 {
              order: 1;
            }
            .md\\:order-none {
              order: 2;
            }
            .md\\:order-2 {
              order: 3;
            }
          }
        `}</style>
      </footer>
    </div>
  );
};

export default Footer;
