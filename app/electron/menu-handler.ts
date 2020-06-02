import { Store } from 'redux'
import {
  cellarCreated,
  emulatorRemovedFromCellar,
} from '../src/redux/modules/cellar'
import { NewCellarId, RemoveEmulatorId } from './constants'

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
    case NewCellarId:
      store.dispatch(cellarCreated())
      break
    case RemoveEmulatorId:
      store.dispatch(emulatorRemovedFromCellar(args[0]))
      break
  }
}

export { handleMenuClick }
