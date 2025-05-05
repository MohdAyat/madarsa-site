export default function MainBannerImage() {
  return (
    <div>
    <div className="relative">
      <img
        src="/inner-main-hall-aljamia-tahirpur-cropped.jpg" 
        alt="Main Banner"
        className="w-full h-[250px] object-cover object-top border"
      />
      <div className="absolute inset-0 bg-black opacity-30"></div>
      {/* <div className="absolute inset-0 flex items-center justify-start text-white pl-5 pt-80"> */}
        {/* <h1 className="text-xl border-1 p-1">Jamia Aneesul Uloom</h1> */}
      {/* </div> */}
      {/* <div className="w-full h-2 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div> */}
    </div>
    <div className="bg-black h-0.5"></div>
    </div>
  );
}