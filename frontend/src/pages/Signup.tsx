import { SignupInput } from "aryantech-couchcritics-common";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Signup = () => {
  const [signupInputs, setSignupInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  return (
    
    <div className="flex justify-center items-center font-mono bg-slate-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md ">
        <div className="text-black mt-6 flex justify-center font-extrabold text-2xl">
          Sign up to your account
        </div>
        <div className="flex justify-center pb-4 text-base text-slate-700">
          or{" "}
          <Link className="underline pl-2" to={"/signin"}>
            {" "}
            sign in
          </Link>
        </div>
        <LabelInput
          label="Name"
          placeholder="aryan"
          onChange={(e) => {
            setSignupInputs({
              ...signupInputs,
              name: (e.target as HTMLInputElement).value,
            });
          }}
        />
        <LabelInput
          label="Email address"
          placeholder="aryantech158@gmail.com"
          onChange={(e) => {
            setSignupInputs({
              ...signupInputs,
              username: (e.target as HTMLInputElement).value,
            });
          }}
        />{" "}
        <LabelInput
          label="Password"
          placeholder="******"
          onChange={(e) => {
            setSignupInputs({
              ...signupInputs,
              password: (e.target as HTMLInputElement).value,
            });
          }}
        />
        <div className=" bg-black w-full text-white text text-center rounded-md mt-5 p-2">
          <button onClick={(e)=> {
            console.log(signupInputs)
          }}>Submit</button>
        </div>
      </div>
    </div>
  );
};

interface labelInputType {
  label: string;
  placeholder: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export function LabelInput({ label, placeholder, onChange }: labelInputType) {
  return (
    <div>
      <label className="block mb-1 text-sm mt-4 font-medium text-gray-900 ">
        {label}
      </label>
      <input
        onChange={onChange}
        type="text"
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
