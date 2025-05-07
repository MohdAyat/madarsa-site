import { useContext } from "react";
import { FaRegUser } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext"; // Adjust the path as necessary
import { CiFacebook,CiTwitter } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const {isLoggedIn , setIsLoggedIn , setUser, user} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_USER_API_ENDPOINT}/logout`, {
        withCredentials: true, // Include cookies for session-based auth
      });

      // console.log("in_handleLogout_response: ",response);

      if (response.status === 201) {
        // console.log("Logout successful:", response.data);
        alert("Logout successful!");
        setIsLoggedIn(false);
        setUser(null); // Clear user data from context
        navigate('/');
      }
    } catch (error) {
      alert("Logout failed. Please try again.");
      console.error("Error during logout:", error);
    }
  };

    return (
        <>
      <header className="bg-green-900 text-gray-300 text-sm py-2 px-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Left Section: Date & Language Selection */}
        <div className="flex items-center gap-2">
          <span>16 March, 2025</span>
          <span className="border-l border-gray-500 h-4 mx-2"></span>
          <span>Language: </span>
          <a href="#" className="text-white hover:underline">اردو</a> |
          <a href="#" className="text-white hover:underline"> English</a> |
          {/* <a href="#" className="text-white hover:underline"> العربية</a> */}
        </div>
  
        {/* Right Section: Login/Register & Social Icons */}
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <FaRegUser className="text-white" />
              <span>{user?.fullName || "User"}</span>
              <button onClick={handleLogout} className="border-2 p-1 rounded-xl hover:bg-white hover:text-green-900 cursor-pointer">Logout</button>
            </div>
          ):(
            <>
              <a href="/login" className="hover:underline">Login</a>
              <span>|</span>
              <a href="/register" className="hover:underline">Register</a>
            </>
          )}
          
          <span className="border-l border-gray-500 h-4 mx-2"></span>
  
          {/* Social Icons (Replace with proper icons from Lucide or FontAwesome) */}
          <div className="flex gap-3">
            <a href="#" className="hover:text-white"><CiFacebook /></a> {/* Facebook */}
            <a href="#" className="hover:text-white"><CiTwitter /></a> {/* Twitter */}
          </div>
        </div>
      </header>
      </>
    );
  };
  
  export default Header;
  