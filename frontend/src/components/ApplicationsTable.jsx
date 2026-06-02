import {
  Pencil,
  Trash2,
} from "lucide-react";

function ApplicationsTable({
  applications,
  deleteApplication,
  updateStatus,
  setSelectedApplication,
  setShowModal,
}) {
  const statusClasses = (status) => {
    switch (status) {
      case "Interview":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";

      case "Offer":
        return "bg-purple-500/20 text-purple-500 border-purple-500/30";

      case "Accepted":
        return "bg-green-500/20 text-green-500 border-green-500/30";

      case "Rejected":
        return "bg-red-500/20 text-red-500 border-red-500/30";

      default:
        return "bg-slate-500/20 text-slate-500 border-slate-500/30";
    }
  };

  return (
    <div
      className="
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        rounded-2xl overflow-hidden
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="text-left px-6 py-4">
                Company
              </th>

              <th className="text-left px-6 py-4">
                Role
              </th>

              <th className="text-left px-6 py-4">
                Location
              </th>

              <th className="text-left px-6 py-4">
                Salary
              </th>

              <th className="text-left px-6 py-4">
                Applied On
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-left px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr
                key={app._id}
                className="
                  border-t border-slate-200
                  dark:border-slate-800
                  hover:bg-slate-50
                  dark:hover:bg-slate-800/40
                  transition
                "
              >
                <td className="px-6 py-4 font-medium">
                  {app.company}
                </td>

                <td className="px-6 py-4">
                  {app.role}
                </td>

                <td className="px-6 py-4">
                  {app.location}
                </td>

                <td className="px-6 py-4">
                  ₹{app.salary}
                </td>

                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                  {app.createdAt
                    ? new Date(
                        app.createdAt
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-4">
                  <select
                    value={app.status}
                    onChange={(e) =>
                      updateStatus(
                        app._id,
                        e.target.value
                      )
                    }
                    className={`
                      px-3 py-2
                      rounded-lg
                      border
                      text-sm
                      outline-none
                      ${statusClasses(
                        app.status
                      )}
                    `}
                  >
                    <option value="Applied">
                      Applied
                    </option>

                    <option value="Interview">
                      Interview
                    </option>

                    <option value="Offer">
                      Offer
                    </option>

                    <option value="Accepted">
                      Accepted
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>
                  </select>
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedApplication(
                          app
                        );

                        setShowModal(true);
                      }}
                      className="
                        p-2
                        rounded-lg
                        bg-blue-500
                        text-white
                        hover:bg-blue-600
                        transition
                      "
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() =>
                        deleteApplication(
                          app._id
                        )
                      }
                      className="
                        p-2
                        rounded-lg
                        bg-red-500
                        text-white
                        hover:bg-red-600
                        transition
                      "
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {applications.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            No applications found
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationsTable;