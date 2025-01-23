import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = Object.fromEntries(formData);

    try {
      dispatch({ type: "SHOW_LOADING" });
      await axios.post("/api/users/register", value);
      message.success("Registered Successfully!");
      navigate("/login");
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "HIDE_LOADING" });
      message.error(error.response.data.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-green-400 dark:border-green-800">
        <div className="px-8 py-10">
          <h1 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
            POS APP
          </h1>
          <h3 className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
            Register Page
          </h3>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-green-500 dark:focus:border-green-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-green-400"
              />
            </div>
            <div>
              <label
                htmlFor="userId"
                className="block mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              >
                User ID
              </label>
              <input
                type="text"
                name="userId"
                id="userId"
                placeholder="Enter your user ID"
                required
                className="w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-green-500 dark:focus:border-green-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-green-400"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-green-500 dark:focus:border-green-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-green-400"
              />
            </div>
            <div className="flex flex-col items-center mt-6 space-y-4">
              <button
                type="submit"
                className="w-full px-4 py-3 text-white bg-gradient-to-r from-green-600 to-teal-600 rounded-lg hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-green-400 dark:focus:ring-green-800"
              >
                Register
              </button>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Already registered? {" "}
                <Link
                  to="/login"
                  className="font-medium text-green-600 dark:text-green-400 underline"
                >
                  Login here!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
