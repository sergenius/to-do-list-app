import {
  PRIORITIES,
  CATEGORIES,
  PRIORITY_LABELS,
  CATEGORY_LABELS,
  SORT_OPTIONS,
  STATUS_FILTERS,
} from '../utils/constants'
import { hasActiveFilters } from '../utils/taskHelpers'

export default function Filters({
  searchQuery,
  statusFilter,
  priorityFilter,
  categoryFilter,
  sortBy,
  filteredCount,
  totalCount,
  completedCount,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onCategoryChange,
  onSortChange,
  onResetFilters,
  onClearCompleted,
}) {
  const selectClass =
    'w-full rounded-xl border border-slate-200/80 bg-white/80 px-3 py-2 text-sm text-slate-800 backdrop-blur-sm transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-600/50 dark:bg-slate-800/60 dark:text-slate-100 sm:w-auto'

  const chipClass = (active) =>
    `rounded-xl px-3.5 py-1.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
      active
        ? 'bg-indigo-600 text-white shadow-md'
        : 'bg-white/60 text-slate-600 hover:bg-white/90 dark:bg-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-700/90'
    }`

  return (
    <section
      className="rounded-2xl border border-white/30 bg-white/70 p-5 shadow-lg backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/60"
      aria-label="Task filters"
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Tasks
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {filteredCount}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {totalCount}
          </span>{' '}
          tasks
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="search-tasks" className="sr-only">
            Search tasks
          </label>
          <input
            id="search-tasks"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title or description..."
            className="w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 backdrop-blur-sm transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-600/50 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onStatusChange(value)}
              className={chipClass(statusFilter === value)}
              aria-pressed={statusFilter === value}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="filter-priority"
              className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              Priority
            </label>
            <select
              id="filter-priority"
              value={priorityFilter}
              onChange={(e) => onPriorityChange(e.target.value)}
              className={selectClass}
            >
              <option value="all">All priorities</option>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {PRIORITY_LABELS[p]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-category"
              className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              Category
            </label>
            <select
              id="filter-category"
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              className={selectClass}
            >
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-sort"
              className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              Sort by
            </label>
            <select
              id="filter-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className={selectClass}
            >
              {SORT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={onResetFilters}
            disabled={
              !hasActiveFilters({
                searchQuery,
                statusFilter,
                priorityFilter,
                categoryFilter,
                sortBy,
              })
            }
            className="rounded-xl border border-slate-200/80 bg-white/60 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600/50 dark:bg-slate-700/60 dark:text-slate-200 dark:hover:bg-slate-700/90"
          >
            Reset filters
          </button>
          <button
            type="button"
            onClick={onClearCompleted}
            disabled={completedCount === 0}
            className="rounded-xl border border-rose-200/80 bg-rose-50/80 px-4 py-2 text-sm font-medium text-rose-700 transition-all duration-200 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-950/60"
          >
            Clear completed
          </button>
        </div>
      </div>
    </section>
  )
}
