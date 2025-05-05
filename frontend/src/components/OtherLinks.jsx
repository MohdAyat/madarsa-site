import React from "react";

const links = [
  {
    title: "Photo Gallery",
    image: "/front-building-view-aljamia-tahirpur-3.jpg",
    url: "#",
  },
  {
    title: "Donation",
    image: "/donation-image-3.png",
    url: "#",
  },
];

const OtherLinks = () => {
  return (
    <div className="w-full flex justify-center pt-15 pb-15">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-30 p-4 md:p-8 lg:p-12 max-w-6xl">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="group block relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 bg-green-700 border-5"
          >
            <img
              src={link.image}
              alt={link.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-opacity-40 flex items-end rounded-2xl">
              <h3 className="text-black text-lg font-semibold px-4 pb-3">
                {link.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default OtherLinks;
