import { useState } from "react";
import { NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../config/firebase";
import { signIn } from "../services/auth.api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    try {
      setIsLoading(true);
      setError("");
      const userCredidentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (userCredidentials) {
        const firebaseToken = await userCredidentials.user.getIdToken();
        const response = await signIn(firebaseToken);
        toast.success(response.message);
        // We rely on the useEffect above to navigate once Redux state updates.
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent successfully");
      navigate("/login");
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
    finally{
      setIsLoading(false)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl min-h-[700px]">
        <div className="relative w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-[url('/loginPage.png')] bg-cover bg-center min-h-[300px] lg:min-h-full">
          <div className="absolute inset-0 bg-black/60 z-0"></div>

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

          <div className="relative z-10 mt-16 lg:mt-0 lg:mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Welcome <br /> Back!
            </h1>
            <div className="w-12 h-1 bg-[#539144] mb-6"></div>
            <p className="text-gray-200 text-lg max-w-xs">
              Login to your account and continue cooking with AI.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            {/* Header */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
            <div className="w-8 h-1 bg-[#539144] mb-8"></div>

            <form className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Email
                </label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
                    placeholder="Enter your password"
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-end mt-4">
                <button
                  type="button"
                  onClick={handleForgetPassword}
                  href="#"
                  className="text-sm text-[#539144] hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                disabled={isLoading}
                type="submit"
                onClick={handleLogin}
                className="w-full bg-[#539144] hover:bg-[#437736] text-white font-semibold py-3.5 rounded-xl transition-colors mt-6"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-400">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center mt-8 text-sm text-gray-600">
              Don't have an account?{" "}
              <NavLink
                to="/signup"
                className="text-[#539144] font-semibold hover:underline"
              >
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
