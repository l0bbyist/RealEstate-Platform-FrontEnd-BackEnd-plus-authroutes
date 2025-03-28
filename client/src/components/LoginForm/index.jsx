import React, { useState } from "react";
import Input from "../Input";
import ButtonSm from "../ButtonSm";
import { sendRequest } from "../../config/request";  // Assuming sendRequest has the API prefix '/api' already
import { useNavigate, Link } from "react-router-dom";

const LoginForm = ({ onToggle }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const loginHandler = async () => {
    setError(null); // Clear any previous errors

    if (!validateEmail(credentials.email)) {
      setError("Invalid Email Address");
      return;
    }

    if (credentials.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      // Send request to the backend login endpoint
      const response = await sendRequest({
        method: "POST",
        route: "/auth/user/login", // Updated route for login (prefixed with /auth)
        body: credentials,
      });

      // Assuming response includes the token and user details
      const { token, user } = response.data;

      // Store token and user data in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to the dashboard or home page after successful login
      navigate("/dashboard");

    } catch (error) {
      // Error handling for failed login attempts
      console.error("Login Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Incorrect Email/Password");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/">
            <h2 className="mt-6 mb-1 text-center text-3xl font-extrabold text-secondary">
              Lebanon Real Estate Insights
            </h2>
            <div className="w-36 h-1.5 bg-gradient-to-r from-primary to-black"></div>
          </Link>
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
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <span className="cursor-pointer text-secondary font-semibold" onClick={() => onToggle()}>
              Register here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
