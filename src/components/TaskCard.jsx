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
import { IconEdit, IconDelete, IconCheck } from './Icons'

export default function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const overdue = isOverdue(task)
  const checkboxId = `task-checkbox-${task.id}`

  function handleConfirmDelete() {
    onDelete(task.id)
    setConfirmDelete(false)
  }

  return (
    <article
      className={`m-card-interactive overflow-hidden ${
        task.completed ? 'opacity-80' : ''
      } ${
        !task.completed && task.priority === 'high'
          ? 'border-l-4 border-l-md-error dark:border-l-red-400'
          : ''
      } ${
        overdue && !task.completed ? 'ring-1 ring-amber-400/60 dark:ring-amber-500/40' : ''
      }`}
    >
      <div className="flex gap-1 p-3 sm:p-4">
        <button
          type="button"
          id={checkboxId}
          onClick={() => onToggleComplete(task.id)}
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          aria-pressed={task.completed}
          className={`m-btn-icon !h-12 !w-12 shrink-0 ${
            task.completed
              ? '!text-md-primary dark:!text-md-dark-primary'
              : ''
          }`}
        >
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-200 ${
              task.completed
                ? 'border-md-primary bg-md-primary text-md-on-primary dark:border-md-dark-primary dark:bg-md-dark-primary dark:text-md-dark-on-primary'
                : 'border-md-outline dark:border-md-dark-outline'
            }`}
          >
            {task.completed && <IconCheck className="h-4 w-4" />}
          </span>
        </button>

        <div className="min-w-0 flex-1 pt-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3
              className={`text-base font-medium leading-snug ${
                task.completed
                  ? 'text-md-on-surface-variant line-through dark:text-md-dark-on-surface-variant'
                  : 'text-md-on-surface dark:text-md-dark-on-surface'
              }`}
            >
              {task.title}
            </h3>

            <div className="flex flex-wrap gap-1">
              {task.completed && (
                <span className="rounded-md-sm bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                  Done
                </span>
              )}
              {overdue && !task.completed && (
                <span className="rounded-md-sm bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900 dark:bg-amber-900/50 dark:text-amber-200">
                  Overdue
                </span>
              )}
            </div>
          </div>

          {task.description && (
            <p
              className={`mt-1 text-sm leading-relaxed ${
                task.completed
                  ? 'text-md-on-surface-variant/70 dark:text-md-dark-on-surface-variant/70'
                  : 'text-md-on-surface-variant dark:text-md-dark-on-surface-variant'
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span
              className={`rounded-md-sm px-2 py-0.5 text-xs font-medium ${PRIORITY_STYLES[task.priority]}`}
            >
              {PRIORITY_LABELS[task.priority]}
            </span>
            <span
              className={`rounded-md-sm px-2 py-0.5 text-xs font-medium ${CATEGORY_STYLES[task.category]}`}
            >
              {CATEGORY_LABELS[task.category]}
            </span>
            {task.dueDate && (
              <span
                className={`text-xs ${
                  overdue && !task.completed
                    ? 'font-medium text-amber-800 dark:text-amber-300'
                    : 'text-md-on-surface-variant dark:text-md-dark-on-surface-variant'
                }`}
              >
                {formatDueDate(task.dueDate)}
              </span>
            )}
            <span className="text-xs text-md-on-surface-variant/70 dark:text-md-dark-on-surface-variant/70">
              · {formatRelativeDate(task.createdAt)}
            </span>
          </div>
        </div>

        {!confirmDelete && (
          <div className="flex shrink-0 flex-col sm:flex-row">
            <button
              type="button"
              onClick={() => onEdit(task)}
              aria-label={`Edit task "${task.title}"`}
              className="m-btn-icon"
            >
              <IconEdit />
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              aria-label={`Delete task "${task.title}"`}
              className="m-btn-icon !text-md-error dark:!text-red-400"
            >
              <IconDelete />
            </button>
          </div>
        )}
      </div>

      {confirmDelete && (
        <div className="flex items-center justify-end gap-2 border-t border-md-outline-variant/20 bg-md-error-container/30 px-4 py-3 dark:border-md-dark-outline-variant/20 dark:bg-md-error/10">
          <span className="mr-auto text-sm text-md-on-surface-variant dark:text-md-dark-on-surface-variant">
            Delete this task?
          </span>
          <button
            type="button"
            onClick={handleConfirmDelete}
            className="m-btn-filled !min-h-10 !bg-md-error !px-4 !text-sm dark:!bg-red-700"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => setConfirmDelete(false)}
            className="m-btn-text !min-h-10"
          >
            Cancel
          </button>
        </div>
      )}
    </article>
  )
}
