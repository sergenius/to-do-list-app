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
  low: 'bg-md-surface-container-high text-md-on-surface-variant dark:bg-md-dark-surface-container-highest dark:text-md-dark-on-surface-variant',
  medium: 'bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200',
  high: 'bg-md-error-container text-md-error dark:bg-md-error/30 dark:text-red-300',
}

export const CATEGORY_STYLES = {
  personal: 'bg-md-primary-container text-md-on-primary-container dark:bg-md-dark-primary-container dark:text-md-dark-on-primary-container',
  work: 'bg-md-secondary-container text-md-on-primary-container dark:bg-md-dark-secondary-container dark:text-md-dark-on-primary-container',
  health: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-200',
  finance: 'bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200',
  learning: 'bg-violet-100 text-violet-900 dark:bg-violet-900/50 dark:text-violet-200',
  other: 'bg-md-surface-container-highest text-md-on-surface-variant dark:bg-md-dark-surface-container-highest dark:text-md-dark-on-surface-variant',
}

export const STAT_ACCENTS = {
  total: {
    bg: 'bg-md-primary-container/50 dark:bg-md-dark-primary-container/30',
    iconColor: 'text-md-primary dark:text-md-dark-primary',
    value: 'text-md-on-primary-container dark:text-md-dark-on-primary-container',
  },
  completed: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-700 dark:text-emerald-400',
    value: 'text-emerald-900 dark:text-emerald-300',
  },
  pending: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-700 dark:text-amber-400',
    value: 'text-amber-900 dark:text-amber-300',
  },
  highPriority: {
    bg: 'bg-md-error-container/80 dark:bg-md-error/20',
    iconColor: 'text-md-error dark:text-red-400',
    value: 'text-md-error dark:text-red-300',
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
