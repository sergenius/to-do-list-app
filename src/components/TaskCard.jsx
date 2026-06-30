import { useState } from 'react'
import {
  PRIORITY_LABELS,
  CATEGORY_LABELS,
  PRIORITY_STYLES,
  CATEGORY_STYLES,
} from '../utils/constants'
import {
  formatDueDate,
  formatRelativeDate,
  isOverdue,
} from '../utils/taskHelpers'

export default function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const overdue = isOverdue(task)
  const checkboxId = `task-checkbox-${task.id}`

  function handleDeleteClick() {
    setConfirmDelete(true)
  }

  function handleConfirmDelete() {
    onDelete(task.id)
    setConfirmDelete(false)
  }

  function handleCancelDelete() {
    setConfirmDelete(false)
  }

  return (
    <article
      className={`group rounded-2xl border bg-white/70 p-4 shadow-md backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl dark:bg-slate-800/60 ${
        task.completed
          ? 'border-slate-200/50 opacity-75 dark:border-slate-700/40'
          : task.priority === 'high'
            ? 'border-l-4 border-l-rose-400 border-t-white/30 border-r-white/30 border-b-white/30 dark:border-l-rose-500 dark:border-t-slate-700/50 dark:border-r-slate-700/50 dark:border-b-slate-700/50'
            : overdue
              ? 'border-amber-300/60 dark:border-amber-700/50'
              : 'border-white/30 dark:border-slate-700/50'
      }`}
    >
      <div className="flex gap-3">
        <div className="pt-0.5">
          <input
            id={checkboxId}
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
            className="h-5 w-5 cursor-pointer rounded-md border-slate-300 text-indigo-600 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 dark:border-slate-500 dark:bg-slate-700"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <label
              htmlFor={checkboxId}
              className={`cursor-pointer text-base font-semibold transition-all duration-200 ${
                task.completed
                  ? 'text-slate-400 line-through dark:text-slate-500'
                  : 'text-slate-800 dark:text-slate-100'
              }`}
            >
              {task.title}
            </label>

            <div className="flex flex-wrap gap-1.5">
              {task.completed && (
                <span className="rounded-lg bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  Completed
                </span>
              )}
              {overdue && !task.completed && (
                <span className="rounded-lg bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                  Overdue
                </span>
              )}
            </div>
          </div>

          {task.description && (
            <p
              className={`mt-1.5 text-sm leading-relaxed ${
                task.completed
                  ? 'text-slate-400 dark:text-slate-500'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-lg px-2 py-0.5 text-xs font-medium ${PRIORITY_STYLES[task.priority]}`}
            >
              {PRIORITY_LABELS[task.priority]}
            </span>
            <span
              className={`rounded-lg px-2 py-0.5 text-xs font-medium ${CATEGORY_STYLES[task.category]}`}
            >
              {CATEGORY_LABELS[task.category]}
            </span>
            {task.dueDate && (
              <span
                className={`text-xs font-medium ${
                  overdue && !task.completed
                    ? 'text-amber-700 dark:text-amber-400'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Due {formatDueDate(task.dueDate)}
              </span>
            )}
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Added {formatRelativeDate(task.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-100 pt-3 dark:border-slate-700/50">
        {confirmDelete ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Confirm delete?
            </span>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              Yes, delete
            </button>
            <button
              type="button"
              onClick={handleCancelDelete}
              className="rounded-lg border border-slate-200/80 px-3 py-1.5 text-xs font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600/50 dark:text-slate-300 dark:hover:bg-slate-700/60"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => onEdit(task)}
              aria-label={`Edit task "${task.title}"`}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-indigo-600 transition-all duration-200 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-indigo-400 dark:hover:bg-indigo-950/40"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              aria-label={`Delete task "${task.title}"`}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-rose-600 transition-all duration-200 hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:text-rose-400 dark:hover:bg-rose-950/40"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </article>
  )
}
