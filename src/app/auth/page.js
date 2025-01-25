import Image from "next/image";
import logo from "../../assets/logo.png";
import SignIn1 from "../../components/SignIn";
import Signin from "./signin/page";

import SignUp1 from "../../components/signup";
// import background_img from "../../assets/signIn/signin_background1.jpg";
import background_img from "../../assets/signIn/signin_background1.jpg";

import { Button } from "@/components/ui/Button";

export default function Auth() {
  return (
    <>
      <div className="h-[100vh] w-[100%] bg-white  flex flex-row">
        <Signin />
      </div>
    </>
  );
}
