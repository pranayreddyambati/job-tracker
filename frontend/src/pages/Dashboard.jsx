import { useEffect, useState } from "react";
import { Plus, LogOut } from "lucide-react";

import api from "../services/api";
import AddApplicationModal from "../components/AddApplicationModal";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCards from "../components/StatsCards";
import RecentApplications from "../components/RecentApplications";
import AnalyticsCharts from "../components/AnalyticsCharts";


function Dashboard() {
    const [analytics, setAnalytics] = useState(null);
    const [applications, setApplications] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const analyticsResponse = await api.get("/analytics");
                const applicationsResponse = await api.get("/applications");

                setAnalytics(analyticsResponse.data);
                setApplications(applicationsResponse.data);
            } catch (error) {
                localStorage.removeItem("token");
                window.location.href = "/";
            }
        };

        loadData();
    }, []);

    if (!analytics) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center">
                <div className="text-slate-300 text-xl animate-pulse">
                    Loading Dashboard...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto h-screen">
                <Topbar />

                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold">
                            Dashboard
                        </h1>

                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            Track your applications and opportunities
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowModal(true)}
                            className="
                                flex items-center gap-2
                                bg-gradient-to-r
                                from-blue-600
                                to-cyan-500
                                px-5 py-3
                                rounded-xl
                                text-white
                            ">
                            <Plus size={18} />
                            Add Application
                        </button>
                    </div>
                </div>

                <StatsCards analytics={analytics} />

                <AnalyticsCharts analytics={analytics} />

                <RecentApplications
                    applications={applications}
                />

                {showModal && (
                    <AddApplicationModal
                        onClose={() => setShowModal(false)}
                    />
                )}
            </main>
        </div>
    );
}

export default Dashboard;
