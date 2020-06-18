// This file is only valid for renderer processes

const handleDatabaseUpgrade = (e: IDBVersionChangeEvent): void => {
  const request = e.target as IDBOpenDBRequest
  const db = request.result
  switch (e.oldVersion) {
    case 0:
      // No DB
      db.createObjectStore('snaps')
      break
  }
}

const createDatabase = (
  name: string,
  version = 1
): Promise<IDBDatabase | undefined> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version)
    request.onupgradeneeded = handleDatabaseUpgrade
    request.onsuccess = (e): void => {
      if (e.target) {
        const db = (e.target as IDBOpenDBRequest).result
        resolve(db)
      } else {
        reject(e)
      }
    }
    request.onerror = (e): void => {
      reject(e)
    }
  })
}

const deleteDatabase = (name: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(name)
    request.onsuccess = (): void => {
      resolve()
    }

    request.onerror = (e): void => {
      reject(e)
    }
  })
}

export { createDatabase, deleteDatabase }
