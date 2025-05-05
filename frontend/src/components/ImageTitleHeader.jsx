import { Link } from "react-router-dom";
const ImageTitleHeader = () => {
    return (
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-10 lg:gap-20 p-4 pb-2 pt-2">
        {/* <img src="/ashrafiya-logo-1.webp" alt="Image 1" className=" " /> */}
        <Link to="/">
          <div className="flex flex-col items-center text-center md:pr-5">
            <h1 className="text-lg md:text-xl text-green-700 uppercase tracking-wider font-bold">جامعہ</h1>
            <h1 className="text-md md:text-3xl font-bold text-green-700 uppercase tracking-wider">انیس العلوم</h1>
          </div>
          </Link>
          <Link to="/">
          <div className="flex justify-center items-center">
            <img src="/head-logo-jamia-aneesul-uloom.jpg" alt="Image 2" className="w-20 md:w-30 object-contain" />
          </div>
          </Link>
          {/* <img src="/aljamiatul-ashrafia-logo.webp" alt="Image 3" className=" " /> */}
          <Link to="/">
          <div className="flex flex-col items-center text-center md:pl-5">
            <h1 className="text-lg md:text-xl text-green-700 uppercase tracking-wider font-bold">jamia</h1>
            <h1 className="text-md md:text-3xl font-bold text-green-700 uppercase tracking-wider">aneesul uloom</h1>
          </div>
        </Link>
      </div>
    );
  };
  
  export default ImageTitleHeader;
  