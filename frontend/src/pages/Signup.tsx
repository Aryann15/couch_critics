export const Signup = () => {
  return (
    <div className="flex justify-center items-center font-mono bg-slate-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md ">
        <div className="text-black mt-6 flex justify-center font-extrabold text-2xl">
          Sign up to your account
        </div>
        <div className="flex justify-center pb-4 text-base text-slate-700">
          or sign in
        </div>
        <div className="mt-6 font-semibold text-slate-700 text-sm pt-2">
            Name
        </div>
        <input
          className="w-full rounded-md border-solid border-black border p-2 mb-3"
          type="text"
        />
        <div className="font-semibold text-slate-700 text-sm pt-2">Email address</div>
        <input
          className=" w-full rounded-md border-solid border-black border p-2 mb-3 "
          type="email"
        />
        <div className="font-semibold text-slate-700 text-sm pt-2">Password</div>
        <input
          className=" w-full rounded-md border-solid border-black border p-2 mb-3 "
          type="password"
        />
        <div className=" bg-black w-full text-white text text-center rounded-md mt-5 p-2">
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};
