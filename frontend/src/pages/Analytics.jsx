import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import AnalyticsCharts from "../components/AnalyticsCharts";
import AnalyticsStats from "../components/AnalyticsStats";

function Analytics() {
    const [analytics, setAnalytics] =
        useState(null);

    const [topCompanies, setTopCompanies] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {

            const analyticsResponse =
                await api.get("/analytics");

            const companiesResponse =
                await api.get(
                    "/analytics/companies"
                );

            setAnalytics(
                analyticsResponse.data
            );

            setTopCompanies(
                companiesResponse.data
            );

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (
        loading ||
        !analytics
    ) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading Analytics...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto h-screen">
                <Topbar />

                {/* Header */}

                <div className="mb-8">
                    <Link
                        to="/dashboard"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-cyan-500
                            hover:text-cyan-400
                            mb-3
                            "
                    >
                        <ArrowLeft size={16} />
                        Dashboard
                    </Link>

                    <h1 className="text-4xl font-bold">
                        Analytics
                    </h1>

                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        Insights into your job
                        search progress
                    </p>
                </div>

                {/* Stats */}

                <AnalyticsStats
                    analytics={analytics}
                />

                {/* Charts */}

                <AnalyticsCharts
                    analytics={analytics}
                />

                <div
                    className="
    mt-8
    bg-white
    dark:bg-slate-900
    border
    border-slate-200
    dark:border-slate-800
    rounded-2xl
    p-6
  "
                >
                    <h2 className="text-xl font-semibold mb-6">
                        Top Companies Applied
                    </h2>

                    <div className="space-y-4">
                        {topCompanies.map(
                            (company, index) => (
                                <div
                                    key={company.company}
                                    className="
            flex
            justify-between
            items-center
            p-4
            rounded-xl
            bg-slate-50
            dark:bg-slate-800
          "
                                >
                                    <div className="flex gap-3 items-center">
                                        <span
                                            className="
                w-8 h-8
                rounded-full
                bg-cyan-500
                text-white
                flex
                items-center
                justify-center
                text-sm
              "
                                        >
                                            {index + 1}
                                        </span>

                                        <span>
                                            {company.company}
                                        </span>
                                    </div>

                                    <span className="font-semibold text-cyan-500">
                                        {company.count}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Analytics;