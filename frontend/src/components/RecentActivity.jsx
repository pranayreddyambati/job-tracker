import { useEffect, useState } from "react";
import api from "../services/api";

function RecentActivity() {
  const [activities, setActivities] =
    useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const response =
        await api.get("/activities");

      setActivities(
        response.data.slice(0, 10)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getIcon = (activity) => {
    if (
      activity.type === "created"
    ) {
      return "📝";
    }

    if (
      activity.newStatus ===
      "Interview"
    ) {
      return "📅";
    }

    if (
      activity.newStatus ===
      "Offer"
    ) {
      return "🎉";
    }

    if (
      activity.newStatus ===
      "Accepted"
    ) {
      return "✅";
    }

    if (
      activity.newStatus ===
      "Rejected"
    ) {
      return "❌";
    }

    return "📌";
  };

  const clearActivities =
    async () => {
      try {
        await api.delete(
          "/activities"
        );

        setActivities([]);
      } catch (error) {
        console.error(error);
      }
    };

  const formatActivityTime = (date) => {
    const activityDate = new Date(date);
    const now = new Date();

    const isToday =
      activityDate.toDateString() ===
      now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(
      yesterday.getDate() - 1
    );

    const isYesterday =
      activityDate.toDateString() ===
      yesterday.toDateString();

    if (isToday) {
      return `Today at ${activityDate.toLocaleTimeString(
        [],
        {
          hour: "numeric",
          minute: "2-digit",
        }
      )}`;
    }

    if (isYesterday) {
      return `Yesterday at ${activityDate.toLocaleTimeString(
        [],
        {
          hour: "numeric",
          minute: "2-digit",
        }
      )}`;
    }

    return activityDate.toLocaleString(
      "en-IN",
      {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }
    );
  };

  return (
    <div
      className="
        absolute
        top-14
        right-0
        w-96
        max-h-[450px]
        overflow-y-auto
        z-50

        bg-white
        dark:bg-slate-900

        border
        border-slate-200
        dark:border-slate-800

        rounded-2xl
        shadow-xl
      "
    >
      <div
        className="
          sticky top-0
          bg-white
          dark:bg-slate-900

          p-4

          border-b
          border-slate-200
          dark:border-slate-800

          flex
          justify-between
          items-center
        "
      >
        <h3 className="font-semibold text-lg">
          Recent Activity
        </h3>

        {activities.length > 0 && (
          <button
            onClick={
              clearActivities
            }
            className="
              text-xs
              px-3 py-1
              rounded-lg

              bg-slate-200
              text-black

              hover:bg-slate-300
              transition
            "
          >
            Clear All
          </button>
        )}
      </div>

      {activities.length === 0 ? (
        <div className="p-6 text-center text-slate-500">
          No activity yet
        </div>
      ) : (
        activities.map(
          (activity) => (
            <div
              key={activity._id}
              className="
                p-4
                border-b
                border-slate-100
                dark:border-slate-800

                hover:bg-slate-50
                dark:hover:bg-slate-800/50

                transition
              "
            >
              <div className="flex gap-3">
                <div className="text-xl">
                  {getIcon(
                    activity
                  )}
                </div>

                <div className="flex-1">
                  <p
                    className="
                      text-sm
                      font-medium
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {
                      activity.message
                    }
                  </p>

                  <p
                    className="
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                      mt-1
                    "
                  >
                    {formatActivityTime(
                      activity.createdAt
                    )}
                  </p>
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}

export default RecentActivity;