import assert from 'node:assert/strict'
import { test } from 'node:test'

import { getInitialTasks } from './taskStorageCore.js'

test('uses a stored empty task list instead of sample tasks', () => {
  const sampleTasks = [{ id: 'sample-task' }]

  assert.deepEqual(getInitialTasks([], () => sampleTasks), [])
})

test('uses stored tasks when tasks exist', () => {
  const storedTasks = [{ id: 'stored-task', title: 'Persisted task' }]
  const sampleTasks = [{ id: 'sample-task' }]

  assert.equal(getInitialTasks(storedTasks, () => sampleTasks), storedTasks)
})

test('falls back to sample tasks when no valid task list is stored', () => {
  const sampleTasks = [{ id: 'sample-task' }]

  assert.equal(getInitialTasks(null, () => sampleTasks), sampleTasks)
})
