import StatsCard from './StatsCard'
import { STAT_ACCENTS } from '../utils/constants'
import { IconList, IconDone, IconPending, IconPriority } from './Icons'

export default function StatsSection({ stats }) {
  return (
    <section aria-label="Task statistics" className="space-y-3">
      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide md:mx-0 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4 [&>*]:min-w-[42%] [&>*]:sm:min-w-[180px] md:[&>*]:min-w-0">
        <StatsCard
          label="Total"
          value={stats.total}
          icon={IconList}
          accent={STAT_ACCENTS.total}
        />
        <StatsCard
          label="Done"
          value={stats.completed}
          icon={IconDone}
          accent={STAT_ACCENTS.completed}
        />
        <StatsCard
          label="Pending"
          value={stats.pending}
          icon={IconPending}
          accent={STAT_ACCENTS.pending}
        />
        <StatsCard
          label="High priority"
          value={stats.highPriority}
          icon={IconPriority}
          accent={STAT_ACCENTS.highPriority}
        />
      </div>

      <div className="m-card px-4 py-3">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-md-on-surface-variant dark:text-md-dark-on-surface-variant">
            Completion
          </span>
          <span className="font-medium text-md-primary dark:text-md-dark-primary">
            {stats.completionPercent}%
          </span>
        </div>
        <div
          className="m-linear-progress"
          role="progressbar"
          aria-valuenow={stats.completionPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Task completion progress"
        >
          <div
            className="m-linear-progress-bar"
            style={{ width: `${stats.completionPercent}%` }}
          />
        </div>
      </div>
    </section>
  )
}
