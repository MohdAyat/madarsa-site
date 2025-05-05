import React from "react";
import { useNavigate } from "react-router-dom";

const HomeTombComp = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full bg-green-700 pb-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: "url('/')", // Replace with actual path
        }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative flex flex-col md:flex-row items-center max-w-7xl mx-auto pt-20 pl-10 pr-20 gap-20">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center pb-3">
          <img
            src="/white-tomb (1).png" // Replace with actual path
            alt="Aljamiatul Ashrafia"
            className="w-full max-w-sm md:max-w-md"
          />
        </div>

        {/* Right Side - Text */}
        <div className="w-full md:w-1/2 text-white px-6 py-8">
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-4 ">
            Jamia Aneesul Uloom at a glance
          </h2>
          <p className="text-black text-sm md:text-lg leading-relaxed font-extralight">
            Jamai Aneesul Uloom is the leading academic and charitable religious
            educational institution located at Tahirpur in the district of
            U.P. in India.The degree holders of this institution are performing
            teaching, organizational and preaching works in different cities of India.
          </p>

          {/* Button */}
          <div className="mt-6">
            <button
              className="bg-green-800 cursor-pointer text-black font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-green-800"
              onClick={() => navigate("/aljamia")}
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTombComp;
