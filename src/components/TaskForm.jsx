import { useEffect, useState } from 'react'
import {
  PRIORITIES,
  CATEGORIES,
  PRIORITY_LABELS,
  CATEGORY_LABELS,
} from '../utils/constants'

const defaultForm = {
  title: '',
  description: '',
  priority: 'medium',
  category: 'personal',
  dueDate: '',
}

export default function TaskForm({ editingTask, onSubmit, onCancel }) {
  const [form, setForm] = useState(defaultForm)
  const [showValidation, setShowValidation] = useState(false)
  const isEditing = Boolean(editingTask)

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        category: editingTask.category,
        dueDate: editingTask.dueDate,
      })
      setShowValidation(false)
    } else {
      setForm(defaultForm)
      setShowValidation(false)
    }
  }, [editingTask])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && isEditing) {
        onCancel()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isEditing, onCancel])

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (field === 'title' && value.trim()) {
      setShowValidation(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.title.trim()) {
      setShowValidation(true)
      return
    }
    onSubmit(form)
    if (!isEditing) {
      setForm(defaultForm)
    }
    setShowValidation(false)
  }

  const inputClass =
    'w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 backdrop-blur-sm transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-600/50 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder:text-slate-500'

  const labelClass =
    'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400'

  return (
    <section
      className={`rounded-2xl border bg-white/70 p-5 shadow-lg backdrop-blur-xl transition-all duration-200 dark:bg-slate-800/60 ${
        isEditing
          ? 'border-violet-300/60 dark:border-violet-700/50'
          : 'border-white/30 dark:border-slate-700/50'
      }`}
      aria-label={isEditing ? 'Edit task form' : 'Create task form'}
    >
      <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
        {isEditing ? '✏️ Edit Task' : '➕ New Task'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="task-title" className={labelClass}>
            Title <span className="text-rose-500">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="What needs to be done?"
            className={inputClass}
            autoComplete="off"
          />
          {showValidation && !form.title.trim() && (
            <p className="mt-1.5 text-xs text-rose-500" role="alert">
              Please enter a task title — even a short one works!
            </p>
          )}
        </div>

        <div>
          <label htmlFor="task-description" className={labelClass}>
            Description
          </label>
          <textarea
            id="task-description"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Add optional details..."
            rows={2}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="task-priority" className={labelClass}>
              Priority
            </label>
            <select
              id="task-priority"
              value={form.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
              className={inputClass}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {PRIORITY_LABELS[p]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="task-category" className={labelClass}>
              Category
            </label>
            <select
              id="task-category"
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="task-due-date" className={labelClass}>
              Due date
            </label>
            <input
              id="task-due-date"
              type="date"
              value={form.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <button
            type="submit"
            disabled={!form.title.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-slate-900"
          >
            {isEditing ? 'Save changes' : 'Add task'}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/60 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600/50 dark:bg-slate-700/60 dark:text-slate-200 dark:hover:bg-slate-700/90"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
