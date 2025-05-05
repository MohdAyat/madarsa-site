import { FaPhoneAlt, FaEnvelope, FaCopyright } from "react-icons/fa";

const ContactRightSide = () => {
  return (
    <div>
        <div className="flex flex-col items-start md:items-start mt-4 md:mt-0">
            <div className="flex items-center gap-1 p-0 m-0">
              <FaPhoneAlt className="text-black size-3" />
              <span className="">+91 9759951540</span>
            </div>
            <div className="flex items-center gap-1 mt-2 m-0 p-0">
              <FaEnvelope className="text-black size-4" />
              <span className="">info@example.com</span>
            </div>
        </div>
    </div>
  )}

  export default ContactRightSide;