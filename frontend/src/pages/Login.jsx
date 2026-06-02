import { useState } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";
import { Mail, Lock, Briefcase } from "lucide-react";

import api from "../services/api";

function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoading(true);

      const response =
        await api.post("/login", {
          email,
          password,
        });

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-white
        dark:bg-slate-950
        flex
        items-center
        justify-center
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-800
          rounded-3xl
          p-8
          shadow-xl
        "
      >
        {/* Logo */}

        <div className="flex justify-center mb-6">
          <div
            className="
              h-16
              w-16
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              flex
              items-center
              justify-center
            "
          >
            <Briefcase
              size={28}
              className="text-white"
            />
          </div>
        </div>

        {/* Heading */}

        <div className="text-center mb-8">
          <h1
            className="
              text-3xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            Welcome Back
          </h1>

          <p
            className="
              text-slate-500
              dark:text-slate-400
              mt-2
            "
          >
            Sign in to continue managing
            your applications
          </p>
        </div>

        {/* Email */}

        <div className="mb-4">
          <label
            className="
              block
              mb-2
              text-sm
              font-medium
              text-slate-900
              dark:text-white
            "
          >
            Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="
                absolute
                left-3
                top-3.5
                text-slate-400
              "
            />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                pl-10
                pr-4
                py-3
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                text-slate-900
                dark:text-white
                placeholder:text-slate-400
                outline-none
                focus:border-cyan-500
              "
            />
          </div>
        </div>

        {/* Password */}

        <div className="mb-6">
          <label
            className="
              block
              mb-2
              text-sm
              font-medium
              text-slate-900
              dark:text-white
            "
          >
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="
                absolute
                left-3
                top-3.5
                text-slate-400
              "
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
                w-full
                pl-10
                pr-4
                py-3
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                text-slate-900
                dark:text-white
                placeholder:text-slate-400
                outline-none
                focus:border-cyan-500
              "
            />
          </div>
        </div>

        {/* Button */}

        <button
          onClick={login}
          disabled={loading}
          className="
            w-full
            py-3
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            text-white
            font-medium
            hover:scale-[1.02]
            transition
          "
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>

        {/* Footer */}

        <p
          className="
            text-center
            text-sm
            text-slate-500
            mt-6
          "
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="
              text-cyan-500
              hover:underline
            "
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;