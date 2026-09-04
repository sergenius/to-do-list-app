import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeTasks } from './taskHelpers.js'

test('normalizeTasks preserves only unique non-empty stored IDs', () => {
  const tasks = [
    { id: 'shared-id', title: 'Keep visible', tags: ['Work'] },
    { id: 'shared-id', title: 'Should keep separate', tags: ['Work'] },
    { title: 'Missing ID', tags: [] },
    { id: '   ', title: 'Blank ID', tags: [] },
    { id: 'unique-id', title: 'Already unique', tags: [] },
  ]

  const normalized = normalizeTasks(tasks)
  const ids = normalized.map((task) => task.id)

  assert.equal(normalized[0].id, 'shared-id')
  assert.equal(normalized[4].id, 'unique-id')
  assert.equal(new Set(ids).size, ids.length)
  assert.ok(ids.every((id) => typeof id === 'string' && id.trim().length > 0))
})
