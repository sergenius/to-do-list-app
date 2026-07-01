import { useState } from 'react'
import {
  PRIORITIES,
  CATEGORIES,
  PRIORITY_LABELS,
  CATEGORY_LABELS,
  SORT_OPTIONS,
  STATUS_FILTERS,
} from '../utils/constants'
import { hasActiveFilters } from '../utils/taskHelpers'
import { IconSearch, IconFilter, IconCheck } from './Icons'

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
  const [expanded, setExpanded] = useState(false)
  const filtersActive = hasActiveFilters({
    searchQuery,
    statusFilter,
    priorityFilter,
    categoryFilter,
    sortBy,
  })

  const selectClass =
    'w-full min-h-12 rounded-md-sm border border-md-outline-variant/50 bg-md-surface-container-highest px-3 text-sm text-md-on-surface focus:border-md-primary focus:outline-none focus:ring-2 focus:ring-md-primary/30 dark:border-md-dark-outline-variant dark:bg-md-dark-surface-container-highest dark:text-md-dark-on-surface md:w-auto'

  return (
    <section className="m-card p-4 md:p-5" aria-label="Task filters">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-lg font-normal text-md-on-surface dark:text-md-dark-on-surface">
          Tasks
        </h2>
        <p className="text-xs text-md-on-surface-variant dark:text-md-dark-on-surface-variant sm:text-sm">
          {filteredCount} / {totalCount}
        </p>
      </div>

      <div className="m-search-bar mb-3">
        <IconSearch className="h-5 w-5 shrink-0 text-md-on-surface-variant dark:text-md-dark-on-surface-variant" />
        <label htmlFor="search-tasks" className="sr-only">
          Search tasks
        </label>
        <input
          id="search-tasks"
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="m-search-input"
        />
      </div>

      <div className="-mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide">
        {STATUS_FILTERS.map(({ value, label }) => {
          const selected = statusFilter === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => onStatusChange(value)}
              className={`m-filter-chip shrink-0 ${selected ? 'm-chip-selected' : ''}`}
              aria-pressed={selected}
            >
              {selected && <IconCheck className="h-4 w-4" />}
              {label}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mb-3 flex w-full min-h-12 items-center justify-between rounded-md-md px-3 text-sm font-medium text-md-on-surface-variant transition-colors hover:bg-md-on-surface/5 dark:text-md-dark-on-surface-variant dark:hover:bg-md-dark-on-surface/10 md:hidden"
        aria-expanded={expanded}
      >
        <span className="flex items-center gap-2">
          <IconFilter className="h-5 w-5" />
          More filters
          {filtersActive && (
            <span className="rounded-full bg-md-primary px-2 py-0.5 text-xs text-md-on-primary dark:bg-md-dark-primary dark:text-md-dark-on-primary">
              Active
            </span>
          )}
        </span>
        <span aria-hidden="true">{expanded ? '▲' : '▼'}</span>
      </button>

      <div className={`space-y-3 ${expanded ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="filter-priority"
              className="mb-1 block text-xs font-medium text-md-on-surface-variant dark:text-md-dark-on-surface-variant"
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
              className="mb-1 block text-xs font-medium text-md-on-surface-variant dark:text-md-dark-on-surface-variant"
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
              className="mb-1 block text-xs font-medium text-md-on-surface-variant dark:text-md-dark-on-surface-variant"
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

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onResetFilters}
            disabled={!filtersActive}
            className="m-btn-text !min-h-10 !px-4 disabled:opacity-40"
          >
            Reset filters
          </button>
          <button
            type="button"
            onClick={onClearCompleted}
            disabled={completedCount === 0}
            className="m-btn-text !min-h-10 !px-4 !text-md-error disabled:opacity-40 dark:!text-red-400"
          >
            Clear completed
          </button>
        </div>
      </div>
    </section>
  )
}
