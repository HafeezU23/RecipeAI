import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router";
import { toast } from "react-toastify";
import { register } from "../services/auth.api";
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName || !userName || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      toast.error(
        `following fields are required! ${!fullName ? "Full Name" : ""} ${!userName ? "User Name" : ""} ${!email ? "Email" : ""} ${!password ? "Password" : ""} ${!confirmPassword ? "Confirm Password" : ""}`,
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long!");
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const data = await register({
        fullname: fullName,
        username: userName,
        email: email,
        password: password,
      });
      if (data?.error) {
        setError(data.error);
        toast.error(data.error);
      } else {
        toast.success(data.message || "Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4 sm:p-8">
      {/* Main Card Container */}
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl min-h-[750px]">
        {/* Left Side: Image & Branding */}
        {/* Replace '/signup-bg.jpg' with your actual pizza/food background image path */}
        <div className="relative w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-[url('/signupPage.png')] bg-cover bg-center min-h-[300px] lg:min-h-full">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 z-0"></div>

          {/* Logo */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center">
              <NavLink
                to={"/"}
                className="text-white text-xl font-bold tracking-wide"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </NavLink>
            </div>
            <div className="flex flex-row items-center">
              <img src="/logo.png" alt="RecipeAI Logo" className="h-14" />
              <span className="text-white text-xl font-bold tracking-wide">
                RecipeAI
              </span>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="relative z-10 mt-16 lg:mt-0 lg:mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Create Your <br /> Account
            </h1>
            <div className="w-12 h-1 bg-[#539144] mb-6"></div>
            <p className="text-gray-200 text-lg max-w-sm">
              Join RecipeAI and start creating amazing recipes with AI.
            </p>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            {/* Header */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
            <div className="w-8 h-1 bg-[#539144] mb-8"></div>

            <form className="space-y-4">
              {/* Full Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Full Name
                </label>
                <input
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#539144] focus:ring-1 focus:ring-[#539144] transition-colors placeholder:text-gray-400"
                />
              </div>

              {/* Username Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Username
                </label>
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  type="text"
                  placeholder="Choose a username"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#539144] focus:ring-1 focus:ring-[#539144] transition-colors placeholder:text-gray-400"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#539144] focus:ring-1 focus:ring-[#539144] transition-colors placeholder:text-gray-400"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#539144] focus:ring-1 focus:ring-[#539144] transition-colors placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#539144] focus:ring-1 focus:ring-[#539144] transition-colors placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                onClick={handleSignup}
                disabled={isLoading}
                className="w-full bg-[#539144] hover:bg-[#437736] text-white font-semibold py-3.5 rounded-xl transition-colors mt-6"
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-400">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Login Link */}
            <p className="text-center mt-8 text-sm text-gray-600">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-[#539144] font-semibold hover:underline"
              >
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
