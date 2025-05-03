"use client";
// import React, { useState } from "react";
import googleImg from "../../../assets/signIn/ri_google-fill.png";
// import Image from "next/image";
import background_img from "../../../assets/signIn/signin_background1.jpg";
// import { Button } from "@/components/ui/Button";

// export default function Signup() {
//   const [errors, setErrors] = useState(false);
//   const [loading, setLoading] = useState(null);
//   return (
//     <>
//       <div className="h-[100vh] w-[100%] bg-white  flex flex-row">
//         <div className="w-full md:w-[55%] lg:w-[64%]  hidden md:block h-full items-center justify-center">
//           <Image
//             src={background_img}
//             className=" h-[100%] w-[100%]"
//             alt="background"
//           ></Image>
//         </div>
//         <div className="w-full md:w-[45%] lg:w-[36%]  flex items-center justify-center">
//           <div className="w-[80%] pr-6 pl-6 pt-4 pb-6 bg-white h-[90%]">
//             <h1 className=" text-3xl font-bold text-center text-dyslexia-signIn-darkblue font-poppoin">
//               {/* <Image src={logo} className="w-[100] h-[100]"></Image> */}
//               Sign Up
//             </h1>
//             <h2 className="mb-4 font-medium text-center font-poppoin text-dyslexia-signIn-lightblue">
//               Enter your details
//             </h2>
//             <form>
//               {/* name */}
//               <div className="mb-1.5">
//                 <label className="text-md text-dyslexia-signIn-credentials font-poppoin">
//                   Name:
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   className={`w-full font-poppoin p-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500}`}
//                 />
//               </div>
//               {/* Email Input */}
//               <div className="mb-1.5">
//                 <label className="text-md text-dyslexia-signIn-credentials font-poppoin">
//                   Email:
//                 </label>
//                 <input
//                   type="text"
//                   name="email"
//                   placeholder="Email"
//                   className={`w-full font-poppoin p-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
//                     errors.email ? "border-red-500" : "border-gray-300"
//                   }`}
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm font-poppoin text-red-500">
//                     {errors.email}
//                   </p>
//                 )}
//               </div>

//               {/* Password Input */}
//               <div className="mb-1.5">
//                 <label className=" text-md font-poppoin text-dyslexia-signIn-credentials">
//                   Password:
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   className={`w-full font-poppoin p-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
//                     errors.password ? "border-red-500" : "border-gray-300"
//                   }`}
//                 />
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-500">{errors.password}</p>
//                 )}
//               </div>

//               {/* confirm password */}

//               <div className="mb-1.5">
//                 <label className="text-md font-poppoin text-dyslexia-signIn-credentials">
//                   Confirm Password:
//                 </label>
//                 <input
//                   type="password"
//                   name="confirm_password"
//                   placeholder="Confirm Password"
//                   className={`w-full font-poppoin p-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
//                     errors.confirm_password
//                       ? "border-red-500"
//                       : "border-gray-300"
//                   }`}
//                 />
//                 {errors.confirm_password && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.confirm_password}
//                   </p>
//                 )}
//               </div>

//               {/* Sign In Button */}
//               <div className="mt-4">
//                 <button
//                   type="submit"
//                   className="text-md w-full  py-2.5 font-poppoin text-white bg-dyslexia-purple rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             </form>

//             <div className="flex items-center mt-2.5 mb-2">
//               <div className="flex-1 border-t border-gray-300"></div>
//               <span className="mx-4 text-gray-600">Or</span>
//               <div className="flex-1 border-t border-gray-300"></div>
//             </div>
//             <div className="flex flex-col items-center mt-2">
//               <button className="w-full py-2.5 font-poppoin text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none flex items-center justify-center">
//                 <Image
//                   className="mr-2 w-4 h-4 md:w-5 md:h-5"
//                   crossOrigin="anonymous"
//                   src={googleImg}
//                   alt="Google Icon"
//                 />
//                 Sign Up with Google
//               </button>
//             </div>

//             <div className="flex  whitespace-nowrap justify-center mt-1.5 text-sm">
//               <p className="mr-2 text-gray-600 font-poppoin">
//                 Already have an account?
//               </p>
//               <a
//                 href="/auth/signin"
//                 className="font-bold text-dyslexia-purple font-poppoin hover:underline"
//               >
//                 Sign In
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

// import background_img from "@/public/background_img.png"; // Adjust the import based on your file path
// import googleImg from "@/public/googleImg.png"; // Adjust the import based on your file path

export default function Signup() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    console.log(inputData);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    e.preventDefault();
    // Add form validation and submission logic here
    try {
      console.log(inputData);

      const response = await axios.post(
        "http://192.168.1.75:4000/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResponseMessage(response.data.message); // Handle the response
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Something went wrong.");
    }
    console.log("Form submitted");
  };
  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  return (
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
                className="w-full font-poppoin p-1 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-sm "
              />
            </div>

            {/* Age Field */}
            <div className="mb-1.5">
              <label className="text-sm text-dyslexia-signIn-credentials font-poppoin">
                Age:
              </label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                className="w-full placeholder:text-sm font-poppoin p-1 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
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
              >
                Sign Up
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
            <button className="w-full py-2 text-sm font-poppoin text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none flex items-center justify-center">
              <Image
                className="mr-2 w-4 h-4 md:w-5 md:h-5"
                src={googleImg}
                alt="Google Icon"
              />
              Sign Up with Google
            </button>
          </div>

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
  );
}
