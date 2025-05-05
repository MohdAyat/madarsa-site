// filepath: d:\Projects\madarsa-site\frontend\src\App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aljamia from "./pages/Aljamia.jsx"; // Create this page
import Home from "./pages/Home.jsx"; // Create this page
import Header from "./components/Header.jsx";
import ImageTitleHeader from "./components/ImageTitleHeader.jsx"; // Create this component
import Footer from "./components/Footer.jsx"; // Create this component
import OtherLinks from "./components/OtherLinks.jsx"; // Create this component
import Navbar from "./components/Navbar.jsx";
import Committee from "./pages/Committee.jsx";
import Admission from "./pages/Admission.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Header/>
        <ImageTitleHeader ></ImageTitleHeader>
        <Navbar ></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aljamia" element={<Aljamia />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <OtherLinks></OtherLinks>
        <Footer></Footer>
      </Router>
    </AuthProvider>
  );
}

export default App;