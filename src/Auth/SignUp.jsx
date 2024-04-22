import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firestoreConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearInput = () => {
    formData.email = "";
    formData.password = "";
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        let data = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
      } else {
        let data = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        localStorage.setItem("userId", data.user.uid);
        navigate("/product");
      }
      toast.success("User authenticated successfully!");
      clearInput();
    } catch (error) {
      toast.error(error.message);
      clearInput();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#222A3A] to-[#080113]">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[80%] sm:w-[40vw]   "
      >
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute top-0 bottom-1/4 right-0 flex items-center px-4 text-black focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between flex-col md:flex-row">
          <button
            className="bg-[#94D3C2] hover:bg-[#69A6A8] duration-300 text-[#080113] font-semibold text-sm  rounded-full shadow-sm p-2 w-1/3"
            type="submit"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <button
            className=" hover:bg-gray-900 text-white  py-2 font-thin px-4 rounded focus:outline-none focus:shadow-outline underline"
            type="button"
            onClick={() => setIsSignUp((prev) => !prev)}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Need an account? Sign Up"}
          </button>
        </div>
        <div className="testCredentials  mt-4 flex flex-col gap-1 font-thin ">
          <h4 className="font-bold text-gray-400">Test Credentials : </h4>
          <p className="text-gray-300">Email : krishnamahato092001@gmail.com</p>
          <p className="text-gray-300"> Password : Krishna@01</p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
