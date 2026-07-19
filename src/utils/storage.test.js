import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import {
  getFromStorage,
  setBooleanInStorage,
  setInStorage,
} from './storage.js'

afterEach(() => {
  delete globalThis.localStorage
})

function installStorageMock(overrides = {}) {
  const values = new Map()

  globalThis.localStorage = {
    getItem(key) {
      return values.has(key) ? values.get(key) : null
    },
    setItem(key, value) {
      values.set(key, String(value))
    },
    ...overrides,
  }
}

test('setInStorage stores JSON and reports success', () => {
  installStorageMock()

  assert.equal(setInStorage('tasks', [{ id: '1', title: 'Saved' }]), true)
  assert.deepEqual(getFromStorage('tasks'), [{ id: '1', title: 'Saved' }])
})

test('setInStorage reports failure when the browser rejects writes', () => {
  installStorageMock({
    setItem() {
      throw new DOMException('Quota exceeded', 'QuotaExceededError')
    },
  })

  assert.equal(setInStorage('tasks', [{ id: '1', title: 'Unsaved' }]), false)
})

test('setBooleanInStorage reports failure when the browser rejects writes', () => {
  installStorageMock({
    setItem() {
      throw new DOMException('Storage disabled', 'SecurityError')
    },
  })

  assert.equal(setBooleanInStorage('dark-mode', true), false)
})
