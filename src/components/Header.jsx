import { formatFriendlyDate } from '../utils/taskHelpers'

export default function Header({ darkMode, onToggleDarkMode }) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-2xl backdrop-blur-sm"
          aria-hidden="true"
        >
          ✦
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            TaskFlow
          </h1>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Plan your day with clarity
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:flex-col sm:items-end">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          {formatFriendlyDate()}
        </p>
        <button
          type="button"
          onClick={onToggleDarkMode}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/60 text-lg shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-white/80 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600/50 dark:bg-slate-800/60 dark:hover:bg-slate-700/80"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}
