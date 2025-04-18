import React, { useState } from "react";
import Input from "../../components/Input";
import ButtonSm from "../../components/ButtonSm";
import { sendRequest } from "../../config/request";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigation = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const loginHandler = async () => {
    if (!validateEmail(credentials.email)) {
      setError("Invalid Email Address");
      return;
    }

    if (credentials.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await sendRequest({ 
        method: "POST", 
        route: "/auth/admin/login", // Correct route
        body: credentials 
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", "admin"); // Store admin role

      navigation("/admin"); // Redirect to admin dashboard
    } catch (error) {
      console.log(error);
      setError("Incorrect Email/Password");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 mb-1 text-3xl font-extrabold text-secondary text-center">
            Admin Panel
          </h2>
          <p className="text-center text-gray-500">SecureLandChain</p>
          <div className="w-36 h-1.5 bg-gradient-to-r from-primary to-black mx-auto"></div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <Input 
            label="Email" 
            placeholder="Enter your email" 
            type="email" 
            value={credentials.email} 
            onChange={(email) => setCredentials({ ...credentials, email })}
          />
          <Input 
            label="Password" 
            placeholder="Enter your password" 
            type="password" 
            value={credentials.password} 
            onChange={(password) => setCredentials({ ...credentials, password })}
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="flex justify-center">
            <ButtonSm onClick={loginHandler} buttonText="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
