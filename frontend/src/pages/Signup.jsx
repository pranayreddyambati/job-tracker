import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Briefcase,
  User,
} from "lucide-react";

import api from "../services/api";

function Signup() {
  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const register = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/register",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      alert(
        "Account created successfully"
      );

      navigate("/");
    } catch (error) {
      alert(
        error?.response?.data
          ?.message ||
          "Registration failed"
      );
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
            Create Account
          </h1>

          <p
            className="
              text-slate-500
              dark:text-slate-400
              mt-2
            "
          >
            Start tracking your job
            applications today
          </p>
        </div>

        {/* Name Row */}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <User
              size={18}
              className="
                absolute
                left-3
                top-3.5
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) =>
                setFirstName(
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
                outline-none
                focus:border-cyan-500
              "
            />
          </div>

          <div className="relative">
            <User
              size={18}
              className="
                absolute
                left-3
                top-3.5
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) =>
                setLastName(
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
                outline-none
                focus:border-cyan-500
              "
            />
          </div>
        </div>

        {/* Email */}

        <div className="mb-4 relative">
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
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
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
              outline-none
              focus:border-cyan-500
            "
          />
        </div>

        {/* Password */}

        <div className="mb-6 relative">
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
            placeholder="Password"
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
              outline-none
              focus:border-cyan-500
            "
          />
        </div>

        {/* Button */}

        <button
          onClick={register}
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
            ? "Creating Account..."
            : "Create Account"}
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
          Already have an account?{" "}
          <Link
            to="/"
            className="
              text-cyan-500
              hover:underline
            "
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;