import { IconAdd } from './Icons'

export default function Fab({ onClick, label = 'Add task' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="m-fab md:hidden"
      aria-label={label}
    >
      <IconAdd className="h-7 w-7" />
    </button>
  )
}
