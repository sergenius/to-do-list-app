import test from 'node:test'
import assert from 'node:assert/strict'

import { normalizeTask } from './tagHelpers.js'

test('normalizeTask coerces persisted title and description values to strings', () => {
  assert.deepEqual(
    normalizeTask({
      id: 'task-1',
      title: null,
      description: 42,
      tags: [' Urgent ', 'urgent'],
    }),
    {
      id: 'task-1',
      title: '',
      description: '42',
      tags: ['urgent'],
    },
  )
})

test('normalized malformed persisted tasks satisfy search string assumptions', () => {
  const tasks = [
    { id: 'missing-fields' },
    { id: 'null-fields', title: null, description: null, tags: [] },
    { id: 'numeric-title', title: 123, description: '', tags: [] },
  ].map(normalizeTask)

  assert.doesNotThrow(() =>
    tasks.map((task) => [
      task.title.toLowerCase(),
      task.description.toLowerCase(),
    ]),
  )
  assert.equal(tasks[2].title.toLowerCase().includes('2'), true)
})
