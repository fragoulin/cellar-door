/**
 * Try to store a value.
 *
 * @param key - key corresponding to value to store.
 * @param value - value to store.
 */
function store<T>(key: string, value: T): void {
  try {
    const valueJson = JSON.stringify(value)
    localStorage.setItem(key, valueJson)
  } catch (error) {
    console.error(error)
  }
}

/**
 * Try to retrieve a value previously stored.
 *
 * @param key - key corresponding to value to retrieve.
 * @returns value if found, or undefined.
 */
function get<T>(key: string): T | undefined {
  const valueJson = localStorage.getItem(key)
  let value
  if (valueJson) {
    value = JSON.parse(valueJson)
  }
  return value
}

export { store, get }
