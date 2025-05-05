import { useState } from "react";
import { FiMenu, FiX, FiPlus, FiMinus } from "react-icons/fi";

const navItems = [
  { label: "Home", link: "/" },
  {
    label: "About Us",
    subItems: [
      { label: "Jamia Aneesul Uloom", link: "/aljamia" },
      { label: "Committee", link: "/committee" },
      // { label: "Buildings", link: "/buildings" },
    ],
  },
  { 
    label: "Education", 
    subItems: [
      { label: "Admission", link: "/admission" },
      { label: "Syllabus", link: "/syllabus" },
      { label: "Result", link: "/buildings" },
      // { label: "Library", link: "/buildings" },
    ],
   },
  { label: "Gallery", link: "/gallery" },
  { label: "Donation", link: "/donation" },
  // { label: "Alumni", link: "/alumni" },
  { label: "Contact Us", link: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setOpenSubMenuIndex(null); // Reset submenus when toggling main menu
  };

  const handleSubMenuToggle = (index) => {
    // If the clicked submenu is already open, close it; otherwise, open it
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };

  return (
    <nav className="bg-gray-800 text-gray-200">
      {/* Top container with brand and hamburger */}
      <div className="flex items-center justify-between px-4 py-3 md:py-4 md:hidden">
        {/* Logo/Brand */}
        {/* <div className="text-xl font-bold tracking-wide">Madarsa Logo</div> */}

        {/* Hamburger icon (mobile only) */}
        <button
          className="md:hidden text-2xl focus:outline-none cursor-pointer"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Desktop Menu */} 
      <div className="hidden md:flex justify-center space-x-15 pt-2 pb-2">
        {navItems.map((item, index) => (
        <div key={index} className="relative group">  {/* Add `relative group` here */}
          <a
            href={item.link || "#"}
            className="px-3 py-2 hover:bg-green-800 rounded inline-block"
          >
          {item.label}
          </a>

          {/* Submenu on desktop (hover) */}
          {item.subItems && (
            <div className="absolute left-0 top-full hidden group-hover:block bg-gray-800 shadow-lg rounded w-48 z-10">
              {item.subItems.map((subItem, subIndex) => (
                <a
                  key={subIndex}
                  href={subItem.link}
                  className="block px-4 py-2 hover:bg-green-800"
                >
                  {subItem.label}
                </a>
              ))}
            </div>
          )}
        </div>
        ))}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-700">
          {navItems.map((item, index) => (
            <div key={index} className="px-4 py-2 border-b border-gray-700">
              {/* Parent item */}
              {item.subItems ? (
                <div className="flex justify-between items-center" onClick={() => handleSubMenuToggle(index)} >
                  <a href={item.link || "#"}>{item.label}</a>
                  <button
                    className="focus:outline-none"
                    
                    aria-label="Toggle Submenu"
                  >
                    {openSubMenuIndex === index ? <FiMinus /> : <FiPlus />}
                  </button>
                </div>
              ) : (
                <a href={item.link}>{item.label}</a>
              )}

              {/* Submenu on mobile (click) */}
              {item.subItems && openSubMenuIndex === index && (
                <div className="mt-2 ml-4 space-y-2">
                  {item.subItems.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.link}
                      className="block text-gray-300 hover:text-white"
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
