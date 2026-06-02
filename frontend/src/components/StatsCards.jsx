import {
  Briefcase,
  CheckCircle,
  Calendar,
  Trophy,
  XCircle,
} from "lucide-react";

function StatsCards({ analytics }) {
  const stats = [
    {
      title: "Total",
      value: analytics.totalApplications,
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Accepted",
      value: analytics.accepted,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Interviews",
      value: analytics.interview,
      icon: Calendar,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Offers",
      value: analytics.offer,
      icon: Trophy,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Rejected",
      value: analytics.rejected,
      icon: XCircle,
      color: "from-red-500 to-rose-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-800
              rounded-2xl p-6
              hover:border-slate-300 dark:hover:border-slate-700
              transition
            "
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className={`bg-gradient-to-r ${item.color} p-3 rounded-xl`}
              >
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;