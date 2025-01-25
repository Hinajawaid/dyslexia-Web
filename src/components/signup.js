"use client";
import React, { useState } from "react";
import googleImg from "../assets/signIn/ri_google-fill.png";
import Image from "next/image";
import logo from "../assets/logo.png";

export default function Signup1() {
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(null);

  return (
    <>
      {/* <div className="flex items-center justify-center h-[100vh] bg-gray-100"> */}
      <div className="w-[80%] pr-6 pl-6 pt-6 pb-6 bg-white h-[90%]">
        <h1 className=" text-3xl font-bold text-center text-dyslexia-signIn-darkblue font-poppoin">
          {/* <Image src={logo} className="w-[100] h-[100]"></Image> */}
          Sign Up
        </h1>
        <h2 className="mb-4 font-medium text-center font-poppoin text-dyslexia-signIn-lightblue">
          Enter your details
        </h2>
        <form>
          {/* name */}
          <div className="mb-1.5">
            <label className="text-md text-dyslexia-signIn-credentials font-poppoin">
              Name:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={`w-full font-poppoin p-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500}`}
            />
          </div>
          {/* Email Input */}
          <div className="mb-1.5">
            <label className="text-md text-dyslexia-signIn-credentials font-poppoin">
              Email:
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className={`w-full font-poppoin p-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
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
          <div className="mb-1.5">
            <label className=" text-md font-poppoin text-dyslexia-signIn-credentials">
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`w-full font-poppoin p-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* confirm password */}

          <div className="mb-1.5">
            <label className="text-md font-poppoin text-dyslexia-signIn-credentials">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              className={`w-full font-poppoin p-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.confirm_password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirm_password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirm_password}
              </p>
            )}
          </div>

          {/* Sign In Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="text-md w-full  py-2.5 font-poppoin text-white bg-dyslexia-purple rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="flex items-center mt-2.5 mb-2">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-4 text-gray-600">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <div className="flex flex-col items-center mt-2">
          <button className="w-full py-2.5 font-poppoin text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none flex items-center justify-center">
            <Image
              className="mr-2 text-md"
              crossOrigin="anonymous"
              src={googleImg}
              alt="Google Icon"
            />
            Sign Up with Google
          </button>
        </div>

        <div className="flex justify-center mt-1.5 text-sm">
          <p className="mr-2 text-gray-600 font-poppoin">
            Already have an account?
          </p>
          <a
            href="#"
            className="font-bold text-dyslexia-purple font-poppoin hover:underline"
          >
            Sign In
          </a>
        </div>
      </div>
    </>
  );
}
