import { useState } from 'react'
import { parseTagsInput, normalizeTags, formatTagLabel } from '../utils/tagHelpers'
import { IconClose } from './Icons'

export default function TagInput({ tags, onChange, inputId = 'task-tags' }) {
  const [inputValue, setInputValue] = useState('')

  function commitInput(value = inputValue) {
    const parsed = parseTagsInput(value)
    if (parsed.length === 0) return
    onChange(normalizeTags([...tags, ...parsed]))
    setInputValue('')
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      commitInput()
    } else if (event.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1))
    }
  }

  function handleBlur() {
    commitInput()
  }

  function removeTag(tagToRemove) {
    onChange(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-xs font-medium text-md-on-surface-variant dark:text-md-dark-on-surface-variant"
      >
        Tags
      </label>
      <div className="min-h-12 rounded-md-sm border border-md-outline-variant/50 bg-md-surface-container-highest px-3 py-2 focus-within:border-md-primary focus-within:ring-2 focus-within:ring-md-primary/30 dark:border-md-dark-outline-variant dark:bg-md-dark-surface-container-highest dark:focus-within:border-md-dark-primary dark:focus-within:ring-md-dark-primary/30">
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-md-sm bg-md-secondary-container px-2 py-1 text-xs font-medium text-md-on-primary-container dark:bg-md-dark-secondary-container dark:text-md-dark-on-primary-container"
            >
              #{formatTagLabel(tag)}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="rounded-full p-0.5 hover:bg-md-on-primary-container/10 dark:hover:bg-md-dark-on-primary-container/10"
                aria-label={`Remove tag ${formatTagLabel(tag)}`}
              >
                <IconClose className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          <input
            id={inputId}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={tags.length === 0 ? 'urgent, review, home...' : 'Add tag...'}
            className="min-w-[120px] flex-1 bg-transparent py-1 text-sm text-md-on-surface outline-none placeholder:text-md-on-surface-variant/70 dark:text-md-dark-on-surface dark:placeholder:text-md-dark-on-surface-variant/70"
            autoComplete="off"
          />
        </div>
      </div>
      <p className="mt-1 text-xs text-md-on-surface-variant dark:text-md-dark-on-surface-variant">
        Separa con comas o presiona Enter
      </p>
    </div>
  )
}
