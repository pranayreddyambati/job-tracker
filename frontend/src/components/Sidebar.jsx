import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const links = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      className: "dashboard-nav-link",
    },
    {
      name: "Applications",
      icon: Briefcase,
      path: "/applications",
      className: "application-nav-link",
    },

    {
      name: "Analytics",
      icon: BarChart3,
      path: "/analytics",
      className: "analytics-nav-link",
    },
  ];

  return (
    <aside
      className="
        w-72
        h-screen
        bg-white
        dark:bg-slate-900
        border-r
        border-slate-200
        dark:border-slate-800
        sticky
        top-0
        flex
        flex-col
      "
    >
      {/* Logo */}

      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          JobTracker
        </h1>

        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Application Manager
        </p>
      </div>

      {/* Navigation */}

      <nav className="px-4">
        {links.map((item) => {
          const Icon = item.icon;

          const active =
            location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`
                ${item.className}

                flex items-center gap-3
                px-4 py-3
                mb-2
                rounded-xl
                transition-all

                ${active
                  ? "bg-cyan-600 text-white shadow-lg"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }
              `}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Card */}

      <div className="mt-auto p-4">
        <div
          className="
            bg-slate-100
            dark:bg-slate-800
            rounded-2xl
            p-4
          "
        >
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Stay Organized
          </h3>

          <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-5">
            Track interviews, offers and applications in one place.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;