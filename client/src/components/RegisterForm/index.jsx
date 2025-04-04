import React, { useState } from "react";
import Input from "../Input";
import ButtonSm from "../ButtonSm";
import { sendRequest } from "../../config/request";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = ({ onToggle }) => {
  const navigation = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "", 
    nida: "", // National ID
    email: "", 
    password: "", 
    phone: "", // Phone number
    
  });

  const [error, setError] = useState(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const registerHandler = async () => {
    setError(null);

    if (!credentials.name) return setError("Name is required");
    if (!credentials.nida) return setError("NIDA ID is required");
    if (!validateEmail(credentials.email)) return setError("Invalid Email Address");
    if (!validatePassword(credentials.password)) return setError("Password must be at least 8 characters");
    if (!credentials.phone) return setError("Phone number is required");
    

    try {
      const response = await sendRequest({
        method: "POST",
        route: "/auth/user/register",
        body: credentials,
      });

      localStorage.setItem("token", response.token);
      navigation("/auth"); // Redirect to dashboard after signup
    } catch (error) {
      console.log(error);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/">
            <h2 className="mt-6 mb-1 text-center text-3xl font-extrabold text-secondary">
              Muungano Properties by Ministry of Lands
            </h2>
          </Link>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <Input label="Full Name" placeholder="Enter your name" value={credentials.name} onChange={(name) => setCredentials({ ...credentials, name })} />
          <Input label="NIDA ID" placeholder="Enter your NIDA number" value={credentials.nida} onChange={(nida) => setCredentials({ ...credentials, nida })} />
          <Input label="Email" placeholder="Enter your email" type="email" value={credentials.email} onChange={(email) => setCredentials({ ...credentials, email })} />
          <Input label="Password" placeholder="Enter your password" type="password" value={credentials.password} onChange={(password) => setCredentials({ ...credentials, password })} />
          <Input label="Phone Number" placeholder="Enter your phone number" value={credentials.phone} onChange={(phone) => setCredentials({ ...credentials, phone })} />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="flex justify-center items-center">
            <ButtonSm onClick={registerHandler} buttonText="Signup" />
          </div>
        </form>
        <p className="mt-2 text-center text-gray-600">
          Already have an account?{" "}
          <span className="cursor-pointer text-secondary font-semibold" onClick={onToggle}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
