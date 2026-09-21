import assert from 'node:assert/strict'
import test from 'node:test'
import { generateId } from './taskHelpers.js'

const originalCryptoDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'crypto')

function restoreCrypto() {
  if (originalCryptoDescriptor) {
    Object.defineProperty(globalThis, 'crypto', originalCryptoDescriptor)
  } else {
    delete globalThis.crypto
  }
}

function withCrypto(value, assertion) {
  Object.defineProperty(globalThis, 'crypto', {
    value,
    configurable: true,
  })

  try {
    assertion()
  } finally {
    restoreCrypto()
  }
}

test('generateId falls back to getRandomValues when randomUUID is unavailable', () => {
  withCrypto(
    {
      getRandomValues(bytes) {
        for (let index = 0; index < bytes.length; index += 1) {
          bytes[index] = index
        }
        return bytes
      },
    },
    () => {
      assert.equal(generateId(), '00010203-0405-4607-8809-0a0b0c0d0e0f')
    },
  )
})

test('generateId returns a usable local ID without Web Crypto', () => {
  withCrypto(undefined, () => {
    assert.match(generateId(), /^task-[0-9a-z]+-[0-9a-z]+$/)
  })
})
