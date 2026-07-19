export function getFromStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function setInStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    // Storage may be unavailable or full
    return false
  }
}

export function getBooleanFromStorage(key, fallback = false) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return raw === 'true'
  } catch {
    return fallback
  }
}

export function setBooleanInStorage(key, value) {
  try {
    localStorage.setItem(key, value ? 'true' : 'false')
    return true
  } catch {
    // Storage may be unavailable or full
    return false
  }
}
