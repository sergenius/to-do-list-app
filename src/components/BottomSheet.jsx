import { useEffect } from 'react'
import { IconClose } from './Icons'

export default function BottomSheet({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <div
        className="m-sheet-scrim"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="m-bottom-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="m-sheet-handle" aria-hidden="true" />
        <div className="flex items-center justify-between px-4 pb-2 pt-1">
          <h2 className="text-xl font-normal text-md-on-surface dark:text-md-dark-on-surface">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="m-btn-icon"
            aria-label="Close"
          >
            <IconClose />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6">
          {children}
        </div>
      </div>
    </>
  )
}
