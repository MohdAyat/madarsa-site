import { useState } from "react";
import emailjs from "emailjs-com";
import MainBannerImage from "../components/MainBannerImage";
import TextBlock from "../components/TextBlock";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [role, setRole] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [loading, setLoading] = useState(false); // Loader state
    const navigate = useNavigate();
    const { setIsLoggedIn, setUser } = useContext(AuthContext);

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        if (e.target.value !== "teacher") {
            setOtpSent(false);
            setOtpVerified(false);
        }
    };

    const generateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    };

    const handleOtpSend = () => {
        const principalEmail = import.meta.env.VITE_PRINCIPAL_EMAIL; // Replace with the principal's email
        setLoading(true); // Start loading
        const newOtp = generateOtp();
        setGeneratedOtp(newOtp);

        emailjs
            .send(
                `${import.meta.env.VITE_EMAILJS_SERVICE_ID}`, // Replace with your EmailJS service ID
                `${import.meta.env.VITE_EMAILJS_TEMPLATE_ID}`, // Replace with your EmailJS template ID
                {
                    to_email: principalEmail,
                    otp: newOtp,
                },
                `${import.meta.env.VITE_EMAILJS_USER_ID}` // Replace with your EmailJS user ID
            )
            .then(() => {
                console.log("OTP sent to principal's email");
                setLoading(false); // Stop loading
                alert("OTP sent to principal's email");
                setOtpSent(true);
            })
            .catch((error) => {
                setLoading(false); // Stop loading
                console.error("Error sending OTP:", error);
            });
    };

    const handleOtpVerify = () => {
        if (otp === generatedOtp) {
            console.log("OTP Verified");
            alert("OTP Verified,Now Click on Register Button");
            setOtpVerified(true);
        } else {
            alert("Invalid OTP");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (role === "teacher" && !otpVerified) {
            alert("Please verify OTP before submitting.");
            return;
        }

        const formData = new FormData(e.target);
        const data = {
            fullName: formData.get("fullName"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
            city: formData.get("city"),
            state: formData.get("state"),
            country: formData.get("country"),
            role: formData.get("role"),
        };

        // console.log("in_register_data(register.jsx): ", data);
        // console.log("formData(register.jsx): ", formData);

        setLoading(true); // Start loading
        try {
            const response = await axios.post(`${import.meta.env.VITE_USER_API_ENDPOINT}/register`, data, {withCredentials: true});
            // console.log("in_register_response:  ", response);

            if (response.status === 200) {
                const result = response.data;
                // console.log("Success:", result);
                setIsLoggedIn(true);
                setUser(result.user); // Assuming the backend sends user info
                alert("Registered successfully!");
                navigate("/");
            } else {
                console.error("Unexpected response:", response);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="">
            <MainBannerImage />
            <TextBlock heading={"Register"} content={""} />
            <div className="pl-5">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 w-1/2 mx-au ml-10 pl-10"
                >
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        className="block w-full p-2 border border-gray-700 rounded"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="block w-full p-2 border border-gray-700 rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="block w-full p-2 border border-gray-700 rounded"
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="block w-full p-2 border border-gray-700 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="block w-full p-2 border border-gray-700 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        className="block w-full p-2 border border-gray-700 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        className="block w-full p-2 border border-gray-700 rounded"
                        required
                    />
                    <select
                        name="role"
                        className="block w-full p-2 border border-gray-700 rounded"
                        required
                        onChange={handleRoleChange}
                    >
                        <option value="" disabled selected>
                            Select Role
                        </option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                    {role === "teacher" && (
                        <div>
                            {!otpSent ? (
                                <button
                                    type="button"
                                    onClick={handleOtpSend}
                                    className="block w-1/2 md:w-1/4 p-2 bg-blue-700 text-white rounded cursor-pointer"
                                >
                                    Send OTP
                                </button>
                            ) : (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        className="block w-full p-2 border border-gray-700 rounded"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleOtpVerify}
                                        className="block w-1/2 md:w-1/4 p-2 bg-green-700 text-white rounded cursor-pointer"
                                    >
                                        Verify OTP
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="pl-1">
                        {loading && <div className="loader">Loading...</div>} {/* Loader */}
                        <button
                            type="submit"
                            className="block w-full md:w-1/4 p-2 bg-green-700 text-white rounded cursor-pointer"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;