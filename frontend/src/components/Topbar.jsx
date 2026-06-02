import {
  History,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import api from "../services/api";
import RecentActivity from "./RecentActivity";
import { useTheme } from "../context/ThemeContext";

function Topbar() {
  const { darkMode, setDarkMode } =
    useTheme();

  const [showActivity, setShowActivity] =
    useState(false);

  const [user, setUser] =
    useState(null);

  const activityRef =
    useRef(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response =
        await api.get("/profile");

      setUser(response.data);
    } catch (error) {
      console.error(
        "Failed to load profile",
        error
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        activityRef.current &&
        !activityRef.current.contains(
          event.target
        )
      ) {
        setShowActivity(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    window.location.href = "/";
  };

  return (
    <div className="flex justify-end items-center mb-8">
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="
            bg-white dark:bg-slate-900
            text-slate-900 dark:text-white
            border border-slate-200 dark:border-slate-800
            p-3 rounded-xl
            hover:bg-slate-100 dark:hover:bg-slate-800
            transition
          "
        >
          {darkMode ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

        {/* Activity */}

        <div
          ref={activityRef}
          className="relative"
        >
          <button
            onClick={() =>
              setShowActivity(
                !showActivity
              )
            }
            className="
              flex items-center gap-2
              bg-white dark:bg-slate-900
              text-slate-900 dark:text-white
              border border-slate-200 dark:border-slate-800
              p-3 rounded-xl
              hover:bg-slate-100 dark:hover:bg-slate-800
              transition
            "
          >
            <History size={18} />
          </button>

          {showActivity && (
            <RecentActivity />
          )}
        </div>

        {/* Profile */}

        <div
          className="
            flex items-center gap-3
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-800
            px-4 py-2 rounded-xl
          "
        >
          <div
            className="
              w-8 h-8
              rounded-full
              bg-cyan-500
              flex
              items-center
              justify-center
              text-white
              font-semibold
              text-sm
            "
          >
            {user?.firstName
              ?.charAt(0)
              ?.toUpperCase() ||
              "U"}
          </div>

          <div className="hidden md:block">
            <p
              className="
                text-sm
                font-medium
                text-slate-900
                dark:text-white
              "
            >
              {user?.firstName ||
                "User"}
            </p>

            <p
              className="
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              {user?.email}
            </p>
          </div>
        </div>

        {/* Logout */}

        <button
          onClick={logout}
          className="
            flex items-center gap-2
            px-4 py-3
            rounded-xl
            bg-slate-200 dark:bg-slate-800
            hover:bg-slate-300 dark:hover:bg-slate-700
            transition
          "
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
}

export default Topbar;