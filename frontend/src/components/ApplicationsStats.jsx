function ApplicationsStats({ applications }) {
  const total = applications.length;

  const interview = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const offer = applications.filter(
    (app) => app.status === "Offer"
  ).length;

  const accepted = applications.filter(
    (app) => app.status === "Accepted"
  ).length;

  const cards = [
    {
      title: "Total",
      value: total,
    },
    {
      title: "Interview",
      value: interview,
    },
    {
      title: "Offers",
      value: offer,
    },
    {
      title: "Accepted",
      value: accepted,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-800
            rounded-2xl p-6
          "
        >
          <p className="text-slate-500 dark:text-slate-400">
            {card.title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ApplicationsStats;