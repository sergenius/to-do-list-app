export function normalizeTag(tag) {
  return tag.trim().toLowerCase().replace(/\s+/g, '-')
}

export function parseTagsInput(input) {
  if (!input || !input.trim()) return []
  const seen = new Set()
  const tags = []

  for (const part of input.split(',')) {
    const normalized = normalizeTag(part)
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized)
      tags.push(normalized)
    }
  }

  return tags
}

export function normalizeTags(tags) {
  if (!Array.isArray(tags)) return []
  const seen = new Set()
  const result = []

  for (const tag of tags) {
    const normalized = normalizeTag(String(tag))
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized)
      result.push(normalized)
    }
  }

  return result
}

export function collectAllTags(tasks) {
  const tagSet = new Set()
  for (const task of tasks) {
    for (const tag of normalizeTags(task.tags)) {
      tagSet.add(tag)
    }
  }
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b))
}

export function normalizeTask(task) {
  return {
    ...task,
    tags: normalizeTags(task.tags),
  }
}

export function formatTagLabel(tag) {
  return tag
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
