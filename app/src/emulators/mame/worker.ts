import { deleteDatabase, createDatabase } from 'services/indexed-db-service'
import {
  CreateDatabaseAction,
  AddSnapAction,
  DatabaseCreatedAction,
  SnapAddedAction,
} from './constants'
import { DatabaseName, DatabaseVersion } from 'electron/constants'

type Entry = {
  romName: string
  snap: string
}

const entries: Entry[] = []
let entriesNumber = Infinity
let entriesProcessed = 0
let database: IDBDatabase | undefined

function addSnapsToStore(entries: Entry[]): void {
  if (!database) {
    console.error('No database')
    return
  }

  const transaction = database.transaction('snaps', 'readwrite')
  const store = transaction.objectStore('snaps')
  entries.forEach((entry) => {
    const request = store.add(entry.snap, entry.romName)

    request.onsuccess = (): void => {
      postMessage({
        action: SnapAddedAction,
        done: (++entriesProcessed * 100) / entriesNumber,
      })
    }

    request.onerror = (): void => {
      console.error(request.error, `Error for ${entry.romName}`)
    }
  })
}

function initializeEntriesListener(): void {
  const interval = setInterval(() => {
    addSnapsToStore(entries.splice(0, entries.length))
    if (entriesNumber === entriesProcessed) {
      clearInterval(interval)
    }
  }, 1000)
}

function handleCreateDatabase(): void {
  try {
    deleteDatabase(DatabaseName)
      .then(() => {
        createDatabase(DatabaseName, DatabaseVersion)
          .then((db) => {
            database = db
            initializeEntriesListener()
            postMessage({ action: DatabaseCreatedAction })
          })
          .catch(console.error)
      })
      .catch(console.error)
  } catch (error) {
    console.error(error)
  }
}

function handleAddSnapAction(event: MessageEvent): void {
  const { romName, snap, error } = event.data
  entriesNumber = event.data.entriesNumber

  if (error) {
    console.error(error)
  } else {
    entries.push({
      romName: romName,
      snap: snap,
    })
  }
}

// Respond to message from parent thread
addEventListener('message', (event): void => {
  const { action } = event.data
  switch (action) {
    case CreateDatabaseAction:
      handleCreateDatabase()
      break
    case AddSnapAction:
      handleAddSnapAction(event)
      break
  }
})
