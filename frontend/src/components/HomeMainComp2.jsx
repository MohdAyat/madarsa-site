import { FaBookOpen, FaUniversity, FaLandmark, FaSchool } from "react-icons/fa";
import { useState, useEffect } from "react";

const features = [
  {
    title: "Admission",
    description:
      "New students seeking admission to the Madarsa are selected on the basis of their results in the qualifying entrance test.",
    icon: <FaBookOpen className="text-green-500 text-3xl" />,
    color: "green",
  },
  // {
  //   title: "Departments->",
  //   description:
  //     "There are many departments in Madarsa. Mufti Shareeful Haque Darul Ifta is one of them.",
  //   icon: <FaUniversity className="text-blue-500 text-3xl" />,
  //   color: "blue",
  // },
  {
    title: "Library",
    description:
      "From the very beginning, Jamia has been providing students with prescribed textbooks. A rich collection awaits.",
    icon: <FaLandmark className="text-yellow-500 text-3xl" />,
    color: "yellow",
  },
  // {
  //   title: "Ashrafia School->",
  //   description:
  //     "Ashrafia Girls High School is administered by the Society of Darul Uloom Ahle Sunnat.",
  //   icon: <FaSchool className="text-red-500 text-3xl" />,
  //   color: "red",
  // },
];

const updates = [
  "Admissions are now open for the academic year 2025!",
  "This is the latest webisite of jamia aneesul uloom.",
  // "New books added to the Ashrafia Library for students.",
  // "Examination results will be announced on April 10, 2025.",
  // "hello"
];

export default function HomeMainComp2() {
  const [currentUpdate, setCurrentUpdate] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentUpdate((prev) => (prev + 1) % updates.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  return (
    <div className="pt-15 pb-15 max-w-6xl mx-auto">
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-3 gap-7 ">
        {/* Left Side - Info Tabs */}
        <div className="col-span-1 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className={`border-2 border-${item.color}-500 p-5 pb-7 mb-2 rounded-lg shadow-md transition-all duration-300 
              hover:bg-${item.color}-500 hover:bg-green-600 cursor-pointer flex items-start space-x-4`}
            >
              <div className="bg-gray-100 p-3 rounded-full">{item.icon}</div>
              <div>
                <h3 className="text-xl font-semibold underline">{item.title}</h3>
                <p className="text-sm mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Latest Updates */}
        <div className="border col-span-2 mb-2 border-gray-300 rounded-lg shadow-md p-4 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700 bg-white">Latest Updates</h3>
          <div
            className="mt-2 text-gray-800 text-sm font-medium p-3 bg-white rounded-lg border border-gray-200"
          >
            {updates.map((update,ind) => (
                <div key={ind} className="text-black bg-white pt-2 ">
                    <p>• <a href="/" className="text-blue-700 underline"> {update}</a></p>
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet & Mobile Layout */}
      <div className="md:hidden flex flex-col gap-7 pl-7 pr-7">
        {/* All Info Tabs in One Column */}
        {features.map((item, index) => (
          <div
            key={index}
            className={`border-2 border-${item.color}-500 p-6 rounded-lg shadow-md transition-all duration-300 
            hover:bg-${item.color}-500 hover:text-white cursor-pointer flex items-start space-x-4`}
          >
            <div className="bg-gray-100 p-3 rounded-full">{item.icon}</div>
            <div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-sm mt-1">{item.description}</p>
            </div>
          </div>
        ))}

        {/* Latest Updates - Full Width */}
        <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700">Latest Updates</h3>
          <div
            className="mt-2 text-gray-800 text-sm font-medium p-3 bg-white rounded-lg border border-gray-200"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {updates[currentUpdate]}
          </div>
        </div>
      </div>
    </div>
  );
}
