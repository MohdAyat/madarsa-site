import MainBannerImage from "../components/MainBannerImage";
import TextBlock from "../components/TextBlock";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx"; // Adjust the path as necessary
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// filepath: d:\Projects\madarsa-site\frontend\src\pages\Login.jsx

const Login = () => {
    const {setIsLoggedIn, setUser} = useContext(AuthContext); // Adjust the path as necessary
    const [loading, setLoading] = useState(false); // Loader state
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loader

        try {
            const formData = new FormData(e.target);
            const response = await axios.post(`${import.meta.env.VITE_USER_API_ENDPOINT}/login`, 
                {
                email: formData.get("email"),
                password: formData.get("password"),
                role: formData.get("role"),
                }
                , {withCredentials: true});
            console.log("in_login_response: ", response);
            
            if (response.status === 200) {
                setIsLoggedIn(true);
                setUser(response.data.user); // Assuming the backend sends user info
                setLoading(false); // Hide loader
                alert("Login successful!");
                navigate("/");
                // Handle successful login, e.g., update context or redirect
            }
        } catch (error) {
            console.error('Login error:', error);
            alert(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <MainBannerImage />
            <TextBlock heading={"Login"} content={""} />
            <div className="pl-5">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 w-1/2 mx-au ml-10 pl-10"
                >
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
                    <select
                        name="role"
                        className="block w-full p-2 border border-gray-700 rounded"
                        required
                    >
                        <option value="" disabled selected>
                            Select Role
                        </option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                    <div className="pl-1">
                        {loading && <div className="loader">Loading...</div>} {/* Loader */}
                        <button
                            type="submit"
                            className="block w-1/2 md:w-1/4 p-2 bg-green-700 text-white rounded cursor-pointer"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;