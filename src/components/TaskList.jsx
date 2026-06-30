import TaskCard from './TaskCard'
import EmptyState from './EmptyState'
import { hasActiveFilters } from '../utils/taskHelpers'

export default function TaskList({
  tasks,
  allTasks,
  filters,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  if (allTasks.length === 0) {
    return <EmptyState variant="no-tasks" />
  }

  if (tasks.length === 0) {
    const allCompleted =
      allTasks.length > 0 &&
      allTasks.every((t) => t.completed) &&
      filters.statusFilter !== 'completed'

    if (allCompleted) {
      return <EmptyState variant="all-completed" />
    }

    if (hasActiveFilters(filters)) {
      return <EmptyState variant="no-results" />
    }

    return <EmptyState variant="no-results" />
  }

  return (
    <ul className="space-y-3" role="list">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  )
}
