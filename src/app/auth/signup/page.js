"use client";
import googleImg from "../../../assets/signIn/ri_google-fill.png";
import background_img from "../../../assets/signIn/signin_background1.jpg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function Signup() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    console.log("HANDLE SUBMIT CALLED");
    console.log(inputData);
    e.preventDefault();

    if (inputData.password !== e.target.confirm_password.value) {
      setErrors({ confirm_password: "Passwords do not match" });
      return;
    }

    const formData = {
      name: inputData.name,
      email: inputData.email,
      password: inputData.password,
    };
    try {
      console.log("Sending to backend:", JSON.stringify(formData, null, 2));
      const response = await axios.post(
        "http://localhost:4000/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResponseMessage(response.data.message);
      router.push("/auth/signin");
    } catch (error) {
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        setResponseMessage(error.response.data.message || "Error occurred");
      } else {
        console.error("Other error:", error.message);
        setResponseMessage("Something went wrong.");
      }
    }
    console.log("Form submitted");
  };

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("Google Client ID:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    console.log("Google Credential Response:", credentialResponse);
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/user/google",
        { token: credentialResponse.credential },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResponseMessage(response.data.message);
      router.push("/dashboard"); // Redirect to dashboard or desired page
    } catch (error) {
      console.error("Google Sign-In error:", error);
      setResponseMessage(
        error.response?.data?.message || "Google Sign-In failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setResponseMessage("Google Sign-In was unsuccessful. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      
      <div className="h-[100vh] w-[100%] bg-white flex flex-row">
        {/* Background Image */}
        <div className="w-full md:w-[55%] lg:w-[64%] hidden md:block h-full">
          <Image
            src={background_img}
            className="h-[100%] w-[100%]"
            alt="background"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-[45%] lg:w-[36%] flex items-center justify-center">
          <div className="w-[80%] pr-6 pl-6 pt-2 pb-6 bg-white h-[90%]">
            <h1 className="text-3xl font-bold text-center text-dyslexia-signIn-darkblue font-poppoin">
              Sign Up
            </h1>
            <h2 className="mb-4 font-medium text-center font-poppoin text-dyslexia-signIn-lightblue">
              Enter your details
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-1.5">
                <label className="text-sm text-dyslexia-signIn-credentials font-poppoin">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  className="w-full font-poppoin p-1 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-sm"
                />
              </div>

              {/* Email Field */}
              <div className="mb-1.5">
                <label className="text-sm text-dyslexia-signIn-credentials font-poppoin">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className={`w-full placeholder:text-sm font-poppoin p-1 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm font-poppoin text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-1.5">
                <label className="text-sm font-poppoin text-dyslexia-signIn-credentials">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full placeholder:text-sm font-poppoin p-1 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="mb-1.5">
                <label className="text-sm font-poppoin text-dyslexia-signIn-credentials">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  className={`w-full placeholder:text-sm font-poppoin p-1 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.confirm_password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.confirm_password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirm_password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="text-md w-full py-2 font-poppoin text-white bg-dyslexia-purple rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Sign Up"}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center mt-2.5 mb-2">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="mx-4 text-gray-600">Or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Google Sign-Up */}
            <div className="flex flex-col items-center mt-2">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled || loading}
                    className="w-full py-2 text-sm font-poppoin text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none flex items-center justify-center"
                  >
                    <Image
                      className="mr-2 w-4 h-4 md:w-5 md:h-5"
                      src={googleImg}
                      alt="Google Icon"
                    />
                    {loading ? "Processing..." : "Sign Up with Google"}
                  </button>
                )}
              />
            </div>

            {/* Response Message */}
            {responseMessage && (
              <p className="mt-2 text-sm text-center font-poppoin text-red-500">
                {responseMessage}
              </p>
            )}

            {/* Redirect to Sign In */}
            <div className="flex whitespace-nowrap justify-center mt-1.5 text-sm">
              <p className="mr-2 text-gray-600 font-poppoin">
                Already have an account?
              </p>
              <Link
                href="/auth/signin"
                className="font-bold text-dyslexia-purple font-poppoin hover:underline"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}