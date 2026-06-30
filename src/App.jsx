import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import StatsSection from './components/StatsSection'
import TaskForm from './components/TaskForm'
import Filters from './components/Filters'
import TaskList from './components/TaskList'
import { STORAGE_KEYS } from './utils/constants'
import {
  getFromStorage,
  setInStorage,
  getBooleanFromStorage,
  setBooleanInStorage,
} from './utils/storage'
import {
  createTask,
  getSampleTasks,
  computeStats,
  filterAndSortTasks,
} from './utils/taskHelpers'

function loadInitialTasks() {
  const stored = getFromStorage(STORAGE_KEYS.TASKS)
  if (Array.isArray(stored) && stored.length > 0) {
    return stored
  }
  return getSampleTasks()
}

export default function App() {
  const [tasks, setTasks] = useState(loadInitialTasks)
  const [darkMode, setDarkMode] = useState(() =>
    getBooleanFromStorage(STORAGE_KEYS.DARK_MODE, false),
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    setInStorage(STORAGE_KEYS.TASKS, tasks)
  }, [tasks])

  useEffect(() => {
    setBooleanInStorage(STORAGE_KEYS.DARK_MODE, darkMode)
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const stats = useMemo(() => computeStats(tasks), [tasks])

  const filters = useMemo(
    () => ({
      searchQuery,
      statusFilter,
      priorityFilter,
      categoryFilter,
      sortBy,
    }),
    [searchQuery, statusFilter, priorityFilter, categoryFilter, sortBy],
  )

  const filteredTasks = useMemo(
    () => filterAndSortTasks(tasks, filters),
    [tasks, filters],
  )

  const handleToggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev)
  }, [])

  const handleAddTask = useCallback((formData) => {
    const newTask = createTask({
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      category: formData.category,
      dueDate: formData.dueDate,
    })
    setTasks((prev) => [newTask, ...prev])
  }, [])

  const handleSaveEdit = useCallback(
    (formData) => {
      if (!editingTask) return
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                title: formData.title.trim(),
                description: formData.description.trim(),
                priority: formData.priority,
                category: formData.category,
                dueDate: formData.dueDate,
                updatedAt: new Date().toISOString(),
              }
            : task,
        ),
      )
      setEditingTask(null)
    },
    [editingTask],
  )

  const handleFormSubmit = useCallback(
    (formData) => {
      if (editingTask) {
        handleSaveEdit(formData)
      } else {
        handleAddTask(formData)
      }
    },
    [editingTask, handleSaveEdit, handleAddTask],
  )

  const handleCancelEdit = useCallback(() => {
    setEditingTask(null)
  }, [])

  const handleStartEdit = useCallback((task) => {
    setEditingTask(task)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleToggleComplete = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    )
  }, [])

  const handleDelete = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
    setEditingTask((prev) => (prev?.id === id ? null : prev))
  }, [])

  const handleClearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !task.completed))
  }, [])

  const handleResetFilters = useCallback(() => {
    setSearchQuery('')
    setStatusFilter('all')
    setPriorityFilter('all')
    setCategoryFilter('all')
    setSortBy('newest')
  }, [])

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-[1000px] space-y-6">
        <Header darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />

        <StatsSection stats={stats} />

        <TaskForm
          editingTask={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelEdit}
        />

        <Filters
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          categoryFilter={categoryFilter}
          sortBy={sortBy}
          filteredCount={filteredTasks.length}
          totalCount={tasks.length}
          completedCount={stats.completed}
          onSearchChange={setSearchQuery}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
          onCategoryChange={setCategoryFilter}
          onSortChange={setSortBy}
          onResetFilters={handleResetFilters}
          onClearCompleted={handleClearCompleted}
        />

        <main aria-label="Task list">
          <TaskList
            tasks={filteredTasks}
            allTasks={tasks}
            filters={filters}
            onToggleComplete={handleToggleComplete}
            onEdit={handleStartEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  )
}
