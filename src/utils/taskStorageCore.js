export function getInitialTasks(storedTasks, sampleTaskFactory) {
  if (Array.isArray(storedTasks)) {
    return storedTasks
  }

  return sampleTaskFactory()
}
