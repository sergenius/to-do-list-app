export const STORAGE_KEYS = {
  TASKS: 'taskflow-tasks',
  DARK_MODE: 'taskflow-dark-mode',
}

export const PRIORITIES = ['low', 'medium', 'high']

export const CATEGORIES = [
  'personal',
  'work',
  'health',
  'finance',
  'learning',
  'other',
]

export const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export const CATEGORY_LABELS = {
  personal: 'Personal',
  work: 'Work',
  health: 'Health',
  finance: 'Finance',
  learning: 'Learning',
  other: 'Other',
}

export const PRIORITY_STYLES = {
  low: 'bg-slate-100 text-slate-700 dark:bg-slate-700/60 dark:text-slate-300',
  medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  high: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
}

export const CATEGORY_STYLES = {
  personal: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  work: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  health: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  finance: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  learning: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  other: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700/60 dark:text-zinc-300',
}

export const STAT_ACCENTS = {
  total: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    border: 'border-indigo-200/60 dark:border-indigo-800/50',
    icon: 'text-indigo-500',
    value: 'text-indigo-700 dark:text-indigo-300',
  },
  completed: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-200/60 dark:border-emerald-800/50',
    icon: 'text-emerald-500',
    value: 'text-emerald-700 dark:text-emerald-300',
  },
  pending: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-200/60 dark:border-amber-800/50',
    icon: 'text-amber-500',
    value: 'text-amber-700 dark:text-amber-300',
  },
  highPriority: {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    border: 'border-rose-200/60 dark:border-rose-800/50',
    icon: 'text-rose-500',
    value: 'text-rose-700 dark:text-rose-300',
  },
}

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'dueDate', label: 'Due date' },
  { value: 'priority', label: 'Priority' },
]

export const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]
