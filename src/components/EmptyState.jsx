const EMPTY_STATE_CONFIG = {
  'no-tasks': {
    icon: '📝',
    title: 'No tasks yet',
    description:
      'Tap the + button to add your first task and start organizing your day.',
  },
  'no-results': {
    icon: '🔍',
    title: 'No matching tasks',
    description:
      'Try changing your search or filters, or reset filters to see everything.',
  },
  'all-completed': {
    icon: '✨',
    title: 'All caught up!',
    description:
      'You completed everything. Add a new task whenever you are ready.',
  },
}

export default function EmptyState({ variant }) {
  const config = EMPTY_STATE_CONFIG[variant] || EMPTY_STATE_CONFIG['no-tasks']

  return (
    <div className="flex flex-col items-center justify-center rounded-md-lg border border-dashed border-md-outline-variant/40 bg-md-surface-container/50 px-6 py-14 text-center dark:border-md-dark-outline-variant/40 dark:bg-md-dark-surface-container/50">
      <span
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-md-primary-container text-3xl dark:bg-md-dark-primary-container"
        aria-hidden="true"
      >
        {config.icon}
      </span>
      <h3 className="text-lg font-medium text-md-on-surface dark:text-md-dark-on-surface">
        {config.title}
      </h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-md-on-surface-variant dark:text-md-dark-on-surface-variant">
        {config.description}
      </p>
    </div>
  )
}
