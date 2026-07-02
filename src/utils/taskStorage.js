import { STORAGE_KEYS } from './constants'
import { getFromStorage } from './storage'
import { getInitialTasks } from './taskStorageCore'
import { getSampleTasks } from './taskHelpers'

export function loadInitialTasks() {
  return getInitialTasks(getFromStorage(STORAGE_KEYS.TASKS), getSampleTasks)
}
