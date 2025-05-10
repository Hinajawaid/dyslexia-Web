import Image from "next/image";
import SignIn1 from "../../components/SignIn";
import Signin from "./signin/page";

import SignUp1 from "../../components/signup";
// import background_img from "../../assets/signIn/signin_background1.jpg";
import background_img from "../../assets/signIn/signin_background1.jpg";

import { Button } from "@/components/ui/Button";
import Signup from "./signup/page";

export default function Auth() {
  return (
    <>
      <div className="h-[100vh] w-[100%] bg-white  flex flex-row">
        <Signup />
      </div>
    </>
  );
}
