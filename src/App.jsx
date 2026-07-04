import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import StatsSection from './components/StatsSection'
import TaskForm from './components/TaskForm'
import Filters from './components/Filters'
import TaskList from './components/TaskList'
import Fab from './components/Fab'
import BottomSheet from './components/BottomSheet'
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

const MOBILE_BREAKPOINT = 768

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
  const [formSheetOpen, setFormSheetOpen] = useState(false)

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

  const closeFormSheet = useCallback(() => {
    setFormSheetOpen(false)
    setEditingTask(null)
  }, [])

  const handleCancelEdit = useCallback(() => {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      closeFormSheet()
      return
    }
    setEditingTask(null)
    setFormSheetOpen(false)
  }, [closeFormSheet])

  const handleOpenCreate = useCallback(() => {
    setEditingTask(null)
    setFormSheetOpen(true)
  }, [])

  const handleStartEdit = useCallback((task) => {
    setEditingTask(task)
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      setFormSheetOpen(true)
    } else {
      setFormSheetOpen(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const handleFormSuccess = useCallback(() => {
    closeFormSheet()
  }, [closeFormSheet])

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

  const sheetTitle = editingTask ? 'Edit task' : 'New task'

  return (
    <div className="min-h-screen">
      <Header darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />

      <div className="mx-auto max-w-[1000px] space-y-4 px-4 py-4 safe-bottom sm:space-y-5 sm:py-6">
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

      <Fab onClick={handleOpenCreate} />

      <BottomSheet
        open={formSheetOpen}
        onClose={closeFormSheet}
        title={sheetTitle}
      >
        <TaskForm
          editingTask={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelEdit}
          bare
          onSuccess={handleFormSuccess}
        />
      </BottomSheet>
    </div>
  )
}
