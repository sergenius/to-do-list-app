import { formatFriendlyDate } from '../utils/taskHelpers'
import { IconTask, IconDarkMode, IconLightMode } from './Icons'

export default function Header({ darkMode, onToggleDarkMode }) {
  return (
    <header className="m-app-bar">
      <div className="mx-auto flex max-w-[1000px] items-center gap-3 px-4 py-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-md-primary-container text-md-on-primary-container dark:bg-md-dark-primary-container dark:text-md-dark-on-primary-container"
          aria-hidden="true"
        >
          <IconTask className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[22px] font-normal leading-tight text-md-on-surface dark:text-md-dark-on-surface">
            TaskFlow
          </h1>
          <p className="hidden truncate text-sm text-md-on-surface-variant dark:text-md-dark-on-surface-variant sm:block">
            Plan your day with clarity
          </p>
        </div>

        <p className="hidden text-xs text-md-on-surface-variant dark:text-md-dark-on-surface-variant md:block lg:text-sm">
          {formatFriendlyDate()}
        </p>

        <button
          type="button"
          onClick={onToggleDarkMode}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className="m-btn-icon"
        >
          {darkMode ? <IconLightMode /> : <IconDarkMode />}
        </button>
      </div>
    </header>
  )
}
