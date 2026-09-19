import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import App from './App'

function setViewportWidth(width) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  })
}

describe('App edit form behavior', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('uses the inline edit form on desktop without opening the bottom sheet', () => {
    setViewportWidth(1024)
    render(<App />)

    fireEvent.click(screen.getAllByRole('button', { name: /edit task/i })[0])

    expect(screen.queryByRole('dialog', { name: /edit task/i })).not.toBeInTheDocument()
    expect(screen.getByRole('region', { name: /edit task form/i })).toBeInTheDocument()
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('uses and closes the bottom sheet when editing on mobile', () => {
    setViewportWidth(375)
    render(<App />)

    fireEvent.click(screen.getAllByRole('button', { name: /edit task/i })[0])
    const dialog = screen.getByRole('dialog', { name: /edit task/i })

    fireEvent.change(within(dialog).getByLabelText(/title/i), {
      target: { value: 'Updated task title' },
    })
    fireEvent.click(within(dialog).getByRole('button', { name: /save changes/i }))

    expect(screen.queryByRole('dialog', { name: /edit task/i })).not.toBeInTheDocument()
    expect(screen.getByText('Updated task title')).toBeInTheDocument()
  })
})
