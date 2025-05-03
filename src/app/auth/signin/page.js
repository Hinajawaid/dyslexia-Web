"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import googleImg from "../../../assets/signIn/ri_google-fill.png";
import Image from "next/image";
// import background_img from "../../assets/signIn/signin_background1.jpg";
import background_img from "../../../assets/signIn/signin_background1.jpg";

import { Button } from "@/components/ui/Button";

export default function Signin() {
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(null);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    console.log(formData);
    try {
      const response = await axios.post(
        "http://192.168.1.75:4000/user/login",
        formData
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        alert("user logged in");
        router.push("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login Error:", error);

      if (error.response) {
        // Log the full error response for debugging
        console.log("Error Response:", error.response);

        if (error.response.status === 400) {
          setErrors(error.response.data.errors || {});
        } else {
          alert("Invalid credentials or server error. Please try again.");
        }
      } else if (error.request) {
        alert("No response from server. Please check your connection.");
      } else {
        alert("Request failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-[100vh] w-[100%] bg-white  flex flex-row">
        <div className="w-full md:w-[55%] lg:w-[64%]  hidden md:block h-full items-center justify-center">
          <Image
            src={background_img}
            className=" h-[100%] w-[100%]"
            alt="background"
          ></Image>
        </div>
        <div className="w-full md:w-[45%] lg:w-[36%]  flex items-center justify-center">
          <div className="w-[80%] pr-6 pl-6 pt-6 pb-6 bg-white  h-[85%]">
            <h1 className=" text-3xl font-bold text-center text-dyslexia-signIn-darkblue font-poppoin">
              Sign In
            </h1>
            <h2 className="mb-6 font-medium font-poppoin text-center text-dyslexia-signIn-lightblue">
              Enter your credentials
            </h2>
            <form>
              {/* Email Input */}
              <div className="mb-2">
                <label className="text-dyslexia-signIn-credentials font-poppoin">
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className={`w-full font-poppoin p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm font-poppoin text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="mb-2">
                <label className="font-poppoin text-dyslexia-signIn-credentials">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className={`w-full font-poppoin p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Sign In Button */}
              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full py-3 font-poppoin text-white bg-dyslexia-purple rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  Sign In
                </button>
              </div>
            </form>

            {/* forget password */}
            <div className="mb-2 mt-2">
              <p className="text-right font-poppoin text-dyslexia-forgot-pass">
                Forgot Password?
              </p>
            </div>
            <div className="flex items-center my-2">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="mx-4 text-gray-600">Or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <button className="w-full py-3 font-poppoin text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none flex items-center justify-center">
                <Image
                  className="mr-2"
                  crossOrigin="anonymous"
                  src={googleImg}
                  alt="Google Icon"
                />
                Sign In with Google
              </button>
            </div>

            <div className="flex  whitespace-nowrap justify-center mt-2 ">
              <p className="mr-2  text-gray-600 font-poppoin">
                Don&apos;t have an account?
              </p>
              <a
                href="/auth/signup"
                className="font-bold text-dyslexia-purple font-poppoin hover:underline"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
