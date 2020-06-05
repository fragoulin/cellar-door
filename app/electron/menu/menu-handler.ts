import { Store } from 'redux'
import { emulatorRemovedFromCellar } from 'redux/modules/cellar'
import {
  RemoveEmulatorId,
  UndoId,
  RedoId,
  EnableMenuItem,
  ImportCellar,
  ExportCellar,
} from '../constants'
import { ActionCreators } from 'redux-undo'
import { RootState } from 'redux/store'
import { CellarWin } from '../preload'

/**
 * Handle menu click on renderer side.
 *
 * @param store - redux store.
 * @param menuId - menu Id clicked.
 * @param args - command arguments.
 */
function handleMenuClick(
  store: Store,
  menuId: string,
  ...args: unknown[]
): void {
  switch (menuId) {
    case RemoveEmulatorId:
      store.dispatch(emulatorRemovedFromCellar(args[0]))
      break
    case ImportCellar:
      // TODO
      break
    case ExportCellar:
      // TODO
      break
    case UndoId:
      store.dispatch(ActionCreators.undo())
      break
    case RedoId:
      store.dispatch(ActionCreators.redo())
      break
  }
}

/**
 * Callback to alter menu after state update.
 */
function handleMenuAfterStateUpdate(state: RootState): void {
  const past = state.cellar.past
  const future = state.cellar.future
  const win = window as CellarWin

  // Enable or disable undo
  win.api.send(EnableMenuItem, UndoId, past.length > 0)

  // Enable or disable redo
  win.api.send(EnableMenuItem, RedoId, future.length > 0)
}

export { handleMenuClick, handleMenuAfterStateUpdate }
