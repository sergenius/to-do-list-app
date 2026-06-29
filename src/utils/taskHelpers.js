import { PRIORITIES } from './constants'

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

export function generateId() {
  return crypto.randomUUID()
}

export function createTask(overrides = {}) {
  const now = new Date().toISOString()
  return {
    id: generateId(),
    title: '',
    description: '',
    completed: false,
    priority: 'medium',
    category: 'personal',
    dueDate: '',
    createdAt: now,
    updatedAt: now,
    ...overrides,
  }
}

function daysFromNow(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

function daysAgo(days) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString()
}

export function getSampleTasks() {
  return [
    createTask({
      title: 'Review weekly goals',
      description: 'Reflect on progress and set priorities for the coming week.',
      priority: 'high',
      category: 'work',
      dueDate: daysFromNow(1),
      createdAt: daysAgo(2),
      updatedAt: daysAgo(2),
    }),
    createTask({
      title: 'Prepare project update',
      description: 'Draft slides and metrics for the team standup.',
      priority: 'medium',
      category: 'work',
      dueDate: daysFromNow(3),
      createdAt: daysAgo(1),
      updatedAt: daysAgo(1),
    }),
    createTask({
      title: 'Go to the gym',
      description: 'Leg day — squats, lunges, and stretching.',
      priority: 'medium',
      category: 'health',
      dueDate: daysFromNow(0),
      createdAt: daysAgo(0),
      updatedAt: daysAgo(0),
    }),
    createTask({
      title: 'Read 20 pages',
      description: 'Continue reading "Atomic Habits".',
      priority: 'low',
      category: 'learning',
      dueDate: daysFromNow(5),
      createdAt: daysAgo(3),
      updatedAt: daysAgo(3),
    }),
    createTask({
      title: 'Pay credit card',
      description: 'Settle the monthly statement before the due date.',
      priority: 'high',
      category: 'finance',
      dueDate: daysFromNow(-1),
      createdAt: daysAgo(5),
      updatedAt: daysAgo(5),
    }),
  ]
}

export function formatFriendlyDate(date = new Date()) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDueDate(dueDate) {
  if (!dueDate) return null
  const date = new Date(`${dueDate}T00:00:00`)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatRelativeDate(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function isOverdue(task) {
  if (!task.dueDate || task.completed) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(`${task.dueDate}T00:00:00`)
  return due < today
}

export function computeStats(tasks) {
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pending = total - completed
  const highPriority = tasks.filter(
    (t) => t.priority === 'high' && !t.completed,
  ).length
  const completionPercent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return { total, completed, pending, highPriority, completionPercent }
}

export function filterAndSortTasks(tasks, filters) {
  const { searchQuery, statusFilter, priorityFilter, categoryFilter, sortBy } =
    filters

  let result = [...tasks]

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim()
    result = result.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query),
    )
  }

  if (statusFilter === 'active') {
    result = result.filter((task) => !task.completed)
  } else if (statusFilter === 'completed') {
    result = result.filter((task) => task.completed)
  }

  if (priorityFilter !== 'all') {
    result = result.filter((task) => task.priority === priorityFilter)
  }

  if (categoryFilter !== 'all') {
    result = result.filter((task) => task.category === categoryFilter)
  }

  result.sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'dueDate': {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      case 'priority':
        return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  return result
}

export function hasActiveFilters(filters) {
  return (
    filters.searchQuery.trim() !== '' ||
    filters.statusFilter !== 'all' ||
    filters.priorityFilter !== 'all' ||
    filters.categoryFilter !== 'all' ||
    filters.sortBy !== 'newest'
  )
}

export { PRIORITIES }
