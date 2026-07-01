export default function StatsCard({ label, value, icon: Icon, accent }) {
  return (
    <div
      className={`flex shrink-0 snap-start flex-col gap-2 rounded-md-lg p-4 md:min-w-0 md:w-full ${accent.bg}`}
    >
      <div className="flex items-center justify-between">
        <span className={`${accent.iconColor}`} aria-hidden="true">
          <Icon className="h-5 w-5" />
        </span>
        <p className={`text-2xl font-medium leading-none ${accent.value}`}>
          {value}
        </p>
      </div>
      <p className="text-xs font-medium uppercase tracking-wide text-md-on-surface-variant dark:text-md-dark-on-surface-variant">
        {label}
      </p>
    </div>
  )
}
