import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import { useTheme } from "../context/ThemeContext";


import api from "../services/api";

function AnalyticsCharts({ analytics }) {
  const { darkMode } = useTheme();
  const [trendData, setTrendData] =
    useState([]);

  useEffect(() => {
    loadTrendData();
  }, []);

  const loadTrendData = async () => {
    try {
      const response =
        await api.get(
          "/analytics/trend"
        );

      setTrendData(
        response.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  const statusData = [
    {
      name: "Accepted",
      value: analytics.accepted || 0,
    },
    {
      name: "Interview",
      value: analytics.interview || 0,
    },
    {
      name: "Offer",
      value: analytics.offer || 0,
    },
    {
      name: "Rejected",
      value: analytics.rejected || 0,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#a855f7",
    "#ef4444",
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
      {/* Status Chart */}

      <div
        className="
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          rounded-2xl p-6
        "
      >
        <h2 className="text-xl font-semibold mb-6">
          Application Status
        </h2>

        <div className="status-chart h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={90}
              >
                {statusData.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[index]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {statusData.map(
            (item, index) => (
              <div
                key={item.name}
                className="flex items-center gap-2"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[
                        index
                      ],
                  }}
                />

                <span className="text-slate-700 dark:text-slate-300 text-sm">
                  {item.name}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Trend Chart */}

      <div
        className="
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          rounded-2xl p-6
        "
      >
        <h2 className="text-xl font-semibold mb-6">
          Application Trend
        </h2>

        <div className="trend-chart h-72">
          <ResponsiveContainer>
            <LineChart
              data={trendData}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#cbd5e1"
              />

              <XAxis
                dataKey="month"
              />

              <YAxis
                stroke="#94a3b8"
                allowDecimals={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode
                    ? "#0f172a"
                    : "#ffffff",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                }}
                labelStyle={{
                  color: darkMode
                    ? "#ffffff"
                    : "#0f172a",
                }}
                itemStyle={{
                  color: "#06b6d4",
                }}
              />

              <Line
                type="monotone"
                dataKey="applications"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCharts;