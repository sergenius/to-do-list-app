export default function StatsCard({ label, value, icon, accent }) {
  return (
    <div
      className={`rounded-2xl border p-4 backdrop-blur-sm transition-all duration-200 ${accent.bg} ${accent.border}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className={`mt-1 text-3xl font-bold ${accent.value}`}>{value}</p>
        </div>
        <span className={`text-2xl ${accent.icon}`} aria-hidden="true">
          {icon}
        </span>
      </div>
    </div>
  )
}
