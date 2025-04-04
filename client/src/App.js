import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Landing from "./pages/Landing";
import Homes from "./pages/Homes";
import Lands from "./pages/Lands";
import Trends from "./pages/Trends";
import Authentication from "./pages/Authentication";
import PropertyDetails from "./pages/PropertyDetails";
import SideNav from "./components/SideNav";
import Profile from "./pages/Profile";
import AddProperty from "./pages/AddProperty";
import UserProperties from "./pages/UserProperties";
import GoogleCallback from "./pages/GoogleCallback";
import Schedule from "./pages/Schedule";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    console.log("Checking authentication state, token:", token);
    setIsAuthenticated(!!token);
    return !!token; // Return the auth status
  };

  // Update auth state with token and return status
  const handleLogin = (token) => {
    localStorage.setItem("token", token); // Set token directly
    const authenticated = checkAuth(); // Update state and get result
    console.log("Login handled, isAuthenticated:", authenticated);
    return authenticated; // Return for LoginForm to use
  };

  useEffect(() => {
    checkAuth();

    const checkStorage = setInterval(() => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      console.log("Token in storage:", token);
      if (!token && isAuthenticated) {
        console.warn("❌ Token removed! Logging out...");
        setIsAuthenticated(false);
      }
    }, 10000);

    return () => clearInterval(checkStorage);
  }, [isAuthenticated]);

  if (isAuthenticated === null) return <p>Loading...</p>;

  return (
    <Routes>
      <Route path="auth/google" element={<GoogleCallback />} />
      <Route path="auth" element={<Authentication onLogin={handleLogin} />} />
      <Route path="/" element={<Nav />}>
        <Route index element={<Landing />} />
        <Route path="houses" element={<Homes />} />
        <Route path="lands" element={<Lands />} />
        <Route path="property/:id" element={<PropertyDetails />} />
        <Route path="trends" element={<Trends />} />
        <Route
          path="dashboard/*"
          element={
            isAuthenticated ? <SideNav /> : <Navigate to="/auth" />
          }
        >
          <Route index element={<Profile />} />
          <Route path="add" element={<AddProperty />} />
          <Route path="properties" element={<UserProperties />} />
          <Route path="meetings" element={<Schedule />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
