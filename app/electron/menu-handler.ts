import { Store } from 'redux'
import { cellarCreated } from '../src/redux/modules/cellar'

function handleMenuClick(store: Store, menuId: string): void {
  switch (menuId) {
    case 'newCellar':
      store.dispatch(cellarCreated())
  }
}

export { handleMenuClick }
