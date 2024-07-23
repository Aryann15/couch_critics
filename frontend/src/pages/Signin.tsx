import { Link } from "react-router-dom";
import { LabelInput } from "./Signup";
import { useState } from "react";
import { SigninInput } from "aryantech-couchcritics-common";

export const Signin = () => {
    const [signinInputs, setSigninInputs] = useState<SigninInput>({
        username : "",
        password : ""
    })
  return (
    <div className="flex justify-center items-center font-mono bg-slate-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md ">
        <div className="text-black mt-6 flex justify-center font-extrabold text-2xl">
          Sign in to your account
        </div>
        <div className="flex justify-center pb-4 text-base text-slate-700">
          or{" "}
          <Link className="underline pl-2" to={"/signup"}>
            {" "}
            sign up
          </Link>
        </div>
        <LabelInput
          label="username"
          placeholder="aryantech158@gmail.com"
          onChange={(e) => {
            setSigninInputs({
              ...signinInputs,
              username: (e.target as HTMLInputElement).value,
            });
          }}
        />{" "}
        <LabelInput
          label="password"
          placeholder="******"
          onChange={(e) => {
            setSigninInputs({
              ...signinInputs,
              password: (e.target as HTMLInputElement).value,
            });
          }}
        />
        <div className=" bg-black w-full text-white text text-center rounded-md mt-5 p-2">
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};
