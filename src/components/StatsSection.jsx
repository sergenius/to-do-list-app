import StatsCard from './StatsCard'
import { STAT_ACCENTS } from '../utils/constants'

export default function StatsSection({ stats }) {
  return (
    <section aria-label="Task statistics">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label="Total tasks"
          value={stats.total}
          icon="📋"
          accent={STAT_ACCENTS.total}
        />
        <StatsCard
          label="Completed"
          value={stats.completed}
          icon="✅"
          accent={STAT_ACCENTS.completed}
        />
        <StatsCard
          label="Pending"
          value={stats.pending}
          icon="⏳"
          accent={STAT_ACCENTS.pending}
        />
        <StatsCard
          label="High priority"
          value={stats.highPriority}
          icon="🔥"
          accent={STAT_ACCENTS.highPriority}
        />
      </div>

      <div className="mt-4 rounded-2xl border border-white/30 bg-white/50 p-4 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/40">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-600 dark:text-slate-300">
            Progress
          </span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {stats.completionPercent}%
          </span>
        </div>
        <div
          className="h-2.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-700/80"
          role="progressbar"
          aria-valuenow={stats.completionPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Task completion progress"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500 ease-out"
            style={{ width: `${stats.completionPercent}%` }}
          />
        </div>
      </div>
    </section>
  )
}
