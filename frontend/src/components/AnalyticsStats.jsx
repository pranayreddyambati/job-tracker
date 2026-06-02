function AnalyticsStats({
  analytics,
}) {
  const offerRate =
    analytics.totalApplications > 0
      ? (
          (analytics.offer /
            analytics.totalApplications) *
          100
        ).toFixed(1)
      : 0;

  const acceptanceRate =
    analytics.totalApplications > 0
      ? (
          (analytics.accepted /
            analytics.totalApplications) *
          100
        ).toFixed(1)
      : 0;

  const interviewRate =
    analytics.totalApplications > 0
      ? (
          (analytics.interview /
            analytics.totalApplications) *
          100
        ).toFixed(1)
      : 0;

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <p className="text-slate-500">
          Total Applications
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {
            analytics.totalApplications
          }
        </h2>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <p className="text-slate-500">
          Offer Rate
        </p>

        <h2 className="text-3xl font-bold mt-2 text-purple-500">
          {offerRate}%
        </h2>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <p className="text-slate-500">
          Interview Rate
        </p>

        <h2 className="text-3xl font-bold mt-2 text-yellow-500">
          {interviewRate}%
        </h2>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <p className="text-slate-500">
          Acceptance Rate
        </p>

        <h2 className="text-3xl font-bold mt-2 text-green-500">
          {acceptanceRate}%
        </h2>
      </div>
    </div>
  );
}

export default AnalyticsStats;