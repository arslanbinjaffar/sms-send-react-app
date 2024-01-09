import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function SignInForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    checked: false,
  });
  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault();
      const { email, password, checked } = formData;
      if (email !== "" && password !== "" && checked == false) {
        toast.error("you must filled all fields");
      }
      const res = await axios.post(
        "admin/login",
        {
          email: email,
          password: password,
        },
        );
      const token = res.data?.token;
      const role=res.data?.user.role
      localStorage.setItem("token", token);
      localStorage.setItem("role",role)
      if (res.status == 200) {
        navigate("/");
        toast.success("login successfully");
      }
      if (res.status !== 200) {
        toast.error("login check credientials");
      }
    } catch (error) {
      toast.error("login in failed "+error.message)
    }
  };
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              logIn Account
            </h1>
            <form action=""  className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}>
            <div>
  <label
    htmlFor="email"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Your email
  </label>
  <input
    type="email"
    name="email"
    id="email"
    value={formData.email}
    onChange={(e) => {
      setFormData({ ...formData, email: e.target.value });
    }}
    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="name@company.com"
    required  // Add the required attribute here
  />
</div>

<div>
  <label
    htmlFor="password"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Password
  </label>
  <input
    type="password"
    name="password"
    id="password"
    value={formData.password}
    onChange={(e) => {
      setFormData({ ...formData, password: e.target.value });
    }}
    placeholder="••••••••"
    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    required  // Add the required attribute here
  />
</div>

<div className="flex items-center justify-between">
  <div className="flex items-start">
    <div className="flex items-center h-5">
      <input
        id="remember"
        aria-describedby="remember"
        type="checkbox"
        className="w-4 h-4 border border-gray-300 rounded"
        required  // Add the required attribute here
        checked={formData.checked}
        onChange={(e) => {
          setFormData({ ...formData, checked: e.target.checked });
        }}
      />
    </div>
    <div className="ml-3 text-sm">
      <label htmlFor="remember" className="text-gray-500">
        Remember me
      </label>
    </div>
  </div>
  <a
    href="#"
    className="text-sm font-medium text-primary-600 hover:underline"
  >
    Forgot password?
  </a>
</div>

<button
  type="submit"
  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
>
  Sign in
</button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInForm;
