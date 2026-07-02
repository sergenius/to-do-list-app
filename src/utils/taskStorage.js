import { STORAGE_KEYS } from './constants'
import { getFromStorage } from './storage'
import { getSampleTasks } from './taskHelpers'

export function getInitialTasks(storedTasks, sampleTaskFactory = getSampleTasks) {
  if (Array.isArray(storedTasks)) {
    return storedTasks
  }

  return sampleTaskFactory()
}

export function loadInitialTasks() {
  return getInitialTasks(getFromStorage(STORAGE_KEYS.TASKS))
}
