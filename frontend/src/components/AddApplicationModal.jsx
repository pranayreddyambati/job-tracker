import { useState } from "react";
import { X } from "lucide-react";
import api from "../services/api";

function AddApplicationModal({
  onClose,
  application,
}) {
  const [company, setCompany] =
    useState(application?.company || "");

  const [role, setRole] =
    useState(application?.role || "");

  const [location, setLocation] =
    useState(application?.location || "");

  const [salary, setSalary] =
    useState(application?.salary || "");

  const saveApplication = async () => {
    try {
      if (application) {
        await api.put(
          `/applications/${application._id}`,
          {
            company,
            role,
            location,
            salary,
          }
        );
      } else {
        await api.post(
          "/applications",
          {
            company,
            role,
            location,
            salary,
            status: "Applied",
          }
        );
      }

      onClose();

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div
        className="
          w-full max-w-xl
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          rounded-3xl
          p-8
          shadow-2xl
        "
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            {application
              ? "Edit Application"
              : "Add Application"}
          </h2>

          <button
            onClick={onClose}
            className="
              p-2 rounded-lg
              hover:bg-slate-100
              dark:hover:bg-slate-800
            "
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Company
            </label>

            <input
              value={company}
              onChange={(e) =>
                setCompany(e.target.value)
              }
              className="
                w-full
                px-4 py-3
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
              "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Role
            </label>

            <input
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="
                w-full
                px-4 py-3
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
              "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Location
            </label>

            <input
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              className="
                w-full
                px-4 py-3
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
              "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Salary
            </label>

            <input
              type="number"
              value={salary}
              onChange={(e) =>
                setSalary(e.target.value)
              }
              className="
                w-full
                px-4 py-3
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
              "
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="
              px-5 py-3 rounded-xl
              bg-slate-200
              dark:bg-slate-800
            "
          >
            Cancel
          </button>

          <button
            onClick={saveApplication}
            className="
              px-5 py-3 rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              text-white
            "
          >
            {application
              ? "Update"
              : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddApplicationModal;