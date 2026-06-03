import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function RecentApplications({ applications }) {
  const getStatusColor = (status) => {
    const value = status?.toLowerCase();

    if (value === "accepted")
      return "bg-green-500/20 text-green-400";

    if (value === "offer")
      return "bg-purple-500/20 text-purple-400";

    if (value === "interview")
      return "bg-yellow-500/20 text-yellow-400";

    if (value === "rejected")
      return "bg-red-500/20 text-red-400";

    return "bg-slate-700 text-slate-300";
  };

  return (
    <div
      className="
      bg-white dark:bg-slate-900
      border border-slate-200 dark:border-slate-800
      rounded-2xl overflow-hidden
    "
    >
      <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-semibold">
          Recent Applications
        </h2>

        <Link
          to="/applications"
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="p-12 text-center text-slate-400">
          No applications found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="recent-applications-table w-full">
            <thead className="bg-slate-100 dark:bg-slate-800/50">
              <tr>
                <th className="text-left px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">
                  Company
                </th>

                <th className="text-left px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">
                  Role
                </th>

                <th className="text-left px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {applications.slice(0, 5).map((app) => (
                <tr
                  key={app._id}
                  className="
                    recent-applications-row

                    border-t border-slate-200 dark:border-slate-800
                    hover:bg-slate-100 dark:hover:bg-slate-800/40
                    transition
                  ">
                  <td className="px-6 py-4 font-medium">
                    {app.company}
                  </td>

                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    {app.role}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecentApplications;