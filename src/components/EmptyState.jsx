const EMPTY_STATE_CONFIG = {
  'no-tasks': {
    emoji: '🌱',
    title: 'No tasks yet',
    description:
      'Your dashboard is a blank canvas. Add your first task above and start planning with clarity.',
  },
  'no-results': {
    emoji: '🔍',
    title: 'No matching tasks',
    description:
      'Nothing matches your current search or filters. Try adjusting them or reset to see all tasks.',
  },
  'all-completed': {
    emoji: '🎉',
    title: 'All caught up!',
    description:
      'Every task is complete. Take a moment to celebrate, or add something new to keep the momentum going.',
  },
}

export default function EmptyState({ variant }) {
  const config = EMPTY_STATE_CONFIG[variant] || EMPTY_STATE_CONFIG['no-tasks']

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300/60 bg-white/40 px-6 py-16 text-center backdrop-blur-sm dark:border-slate-600/50 dark:bg-slate-800/30">
      <span className="mb-4 text-5xl" aria-hidden="true">
        {config.emoji}
      </span>
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
        {config.title}
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {config.description}
      </p>
    </div>
  )
}
