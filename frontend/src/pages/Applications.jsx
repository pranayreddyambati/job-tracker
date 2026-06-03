import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Download, ArrowLeft, Plus, LogOut } from "lucide-react";

import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ApplicationsStats from "../components/ApplicationsStats";
import ApplicationsTable from "../components/ApplicationsTable";
import AddApplicationModal from "../components/AddApplicationModal";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const response =
        await api.get("/applications");

      setApplications(response.data);
    } catch (error) {
      console.error(error);

      localStorage.removeItem("token");

      window.location.href = "/";
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (id) => {
    const confirmed = window.confirm(
      "Delete this application?"
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/applications/${id}`
      );

      setApplications(
        applications.filter(
          (app) => app._id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await api.patch(
        `/applications/${id}/status`,
        {
          status,
        }
      );

      await loadApplications();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredApplications =
    applications
      .filter((app) => {
        const search =
          searchTerm.toLowerCase();

        const matchesSearch =
          app.company
            ?.toLowerCase()
            .includes(search) ||
          app.role
            ?.toLowerCase()
            .includes(search);

        const matchesStatus =
          statusFilter === "All"
            ? true
            : app.status ===
            statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      })
      .sort((a, b) => {
        if (
          sortBy === "salary-high"
        ) {
          return (
            Number(b.salary) -
            Number(a.salary)
          );
        }

        if (
          sortBy === "salary-low"
        ) {
          return (
            Number(a.salary) -
            Number(b.salary)
          );
        }

        if (sortBy === "company") {
          return a.company.localeCompare(
            b.company
          );
        }

        return 0;
      });

  const exportJSON = async () => {
    try {
      const response =
        await api.get(
          "/applications/export/json"
        );

      const blob = new Blob(
        [
          JSON.stringify(
            response.data,
            null,
            2
          ),
        ],
        {
          type: "application/json",
        }
      );

      const url =
        window.URL.createObjectURL(
          blob
        );

      const a =
        document.createElement(
          "a"
        );

      a.href = url;

      a.download =
        "applications.json";

      a.click();

      window.URL.revokeObjectURL(
        url
      );
    } catch (error) {
      console.error(error);
    }
  };

  const exportCSV = async () => {
    try {
      const response =
        await api.get(
          "/applications/export/csv",
          {
            responseType:
              "blob",
          }
        );

      const url =
        window.URL.createObjectURL(
          new Blob([
            response.data,
          ])
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        "applications.csv";

      link.click();

      window.URL.revokeObjectURL(
        url
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <h2 className="text-xl">
          Loading Applications...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto h-screen">
        <Topbar />

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <Link
              to="/dashboard"
              className="
                inline-flex items-center gap-2
                text-cyan-500
                hover:text-cyan-400
                mb-3
              "
            >
              <ArrowLeft size={16} />
              Dashboard
            </Link>

            <h1 className="text-4xl font-bold">
              Applications
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Manage and track all
              your job applications
            </p>
          </div>

          <div className="flex gap-3 items-center">
            {/* Download Dropdown */}

            <div className="relative group">
              <button
                className="
                  flex items-center gap-2
                  px-5 py-3
                  rounded-xl

                  bg-white
                  dark:bg-slate-900

                  border
                  border-slate-200
                  dark:border-slate-800

                  hover:bg-slate-100
                  dark:hover:bg-slate-800

                  transition
                "
              >
                <Download size={18} />
                Download
              </button>

              <div
                className="
                  absolute
                  right-0
                  top-full
                  mt-2
                  w-48

                  bg-white
                  dark:bg-slate-900

                  border
                  border-slate-200
                  dark:border-slate-800

                  rounded-xl
                  shadow-xl

                  opacity-0
                  invisible

                  group-hover:opacity-100
                  group-hover:visible

                  transition-all
                  duration-200

                  z-50
                "
              >
                <button
                  onClick={exportCSV}
                  className="
                    w-full
                    text-left
                    px-4
                    py-3

                    text-slate-700
                    dark:text-slate-300

                    hover:bg-slate-100
                    dark:hover:bg-slate-800

                    rounded-t-xl
                  "
                >
                  Export CSV
                </button>

                <button
                  onClick={exportJSON}
                  className="
                    w-full
                    text-left
                    px-4
                    py-3

                    text-slate-700
                    dark:text-slate-300

                    hover:bg-slate-100
                    dark:hover:bg-slate-800

                    rounded-b-xl
                  "
                >
                  Export JSON
                </button>
              </div>
            </div>

            {/* Add Application */}

            <button
              onClick={() =>
                setShowModal(true)
              }
              className="
                add-application

                flex items-center gap-2

                bg-gradient-to-r
                from-blue-600
                to-cyan-500

                px-5 py-3
                rounded-xl

                text-white
                font-medium

                hover:scale-[1.02]
                transition
              "
            >
              <Plus size={18} />
              Add Application
            </button>
          </div>

        </div>


        {/* Stats */}

        <ApplicationsStats
          applications={applications}
        />

        {/* Filters */}

        <div
          className="
            bg-white dark:bg-slate-900
            border border-slate-200
            dark:border-slate-800
            rounded-2xl
            p-6
            mb-8
          "
        >
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search company or role..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="
                px-4 py-3 rounded-xl
                border border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
              "
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="
                px-4 py-3 rounded-xl
                border border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
              "
            >
              <option value="All">
                All Status
              </option>

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

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value
                )
              }
              className="
                px-4 py-3 rounded-xl
                border border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
              "
            >
              <option value="">
                Sort By
              </option>

              <option value="salary-high">
                Salary High → Low
              </option>

              <option value="salary-low">
                Salary Low → High
              </option>

              <option value="company">
                Company A → Z
              </option>
            </select>
          </div>

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            {
              filteredApplications.length
            }{" "}
            of {applications.length}{" "}
            applications
          </p>
        </div>

        {/* Table */}

        <ApplicationsTable
          applications={
            filteredApplications
          }
          deleteApplication={
            deleteApplication
          }
          updateStatus={
            updateStatus
          }
          setSelectedApplication={
            setSelectedApplication
          }
          setShowModal={
            setShowModal
          }
        />

        {showModal && (
          <AddApplicationModal
            application={
              selectedApplication
            }
            onClose={() => {
              setShowModal(false);

              setSelectedApplication(
                null
              );

              loadApplications();
            }}
          />
        )}
      </main>
    </div>
  );
}

export default Applications;