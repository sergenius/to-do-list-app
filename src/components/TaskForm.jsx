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

function FilledField({ id, label, type = 'text', value, onChange, placeholder = ' ', rows, required }) {
  const isDate = type === 'date'
  const sharedProps = {
    id,
    value,
    onChange,
    placeholder: isDate ? undefined : placeholder,
    className: `m-filled-field ${isDate ? '!pt-8' : ''}`,
    required,
  }

  return (
    <div className="relative">
      {rows ? (
        <textarea {...sharedProps} rows={rows} />
      ) : (
        <input {...sharedProps} type={type} autoComplete="off" />
      )}
      <label
        htmlFor={id}
        className={`m-filled-label ${isDate ? '!top-1.5 !text-xs !text-md-primary dark:!text-md-dark-primary' : ''}`}
      >
        {label}
        {required && ' *'}
      </label>
    </div>
  )
}

function FilledSelect({ id, label, value, onChange, children }) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="m-filled-select"
      >
        {children}
      </select>
      <label htmlFor={id} className="m-filled-label !top-1.5 !text-xs !text-md-primary dark:!text-md-dark-primary">
        {label}
      </label>
    </div>
  )
}

export default function TaskForm({
  editingTask,
  onSubmit,
  onCancel,
  bare = false,
  onSuccess,
}) {
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
    onSuccess?.()
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FilledField
        id="task-title"
        label="Title"
        value={form.title}
        onChange={(e) => handleChange('title', e.target.value)}
        required
      />
      {showValidation && !form.title.trim() && (
        <p className="px-1 text-xs text-md-error" role="alert">
          Please enter a task title.
        </p>
      )}

      <FilledField
        id="task-description"
        label="Description"
        value={form.description}
        onChange={(e) => handleChange('description', e.target.value)}
        rows={3}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FilledSelect
          id="task-priority"
          label="Priority"
          value={form.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {PRIORITY_LABELS[p]}
            </option>
          ))}
        </FilledSelect>

        <FilledSelect
          id="task-category"
          label="Category"
          value={form.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c]}
            </option>
          ))}
        </FilledSelect>

        <FilledField
          id="task-due-date"
          label="Due date"
          type="date"
          value={form.dueDate}
          onChange={(e) => handleChange('dueDate', e.target.value)}
          placeholder=""
        />
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        <button
          type="submit"
          disabled={!form.title.trim()}
          className="m-btn-filled flex-1 sm:flex-none"
        >
          {isEditing ? 'Save changes' : 'Add task'}
        </button>

        {isEditing && (
          <button type="button" onClick={onCancel} className="m-btn-tonal">
            Cancel
          </button>
        )}
      </div>
    </form>
  )

  if (bare) {
    return formContent
  }

  return (
    <section
      className={`hidden md:block m-card p-5 ${
        isEditing ? 'ring-2 ring-md-primary/30 dark:ring-md-dark-primary/30' : ''
      }`}
      aria-label={isEditing ? 'Edit task form' : 'Create task form'}
    >
      <h2 className="mb-4 text-lg font-normal text-md-on-surface dark:text-md-dark-on-surface">
        {isEditing ? 'Edit task' : 'New task'}
      </h2>
      {formContent}
    </section>
  )
}
