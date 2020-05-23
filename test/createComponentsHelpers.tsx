import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Store } from 'redux'

export const createComponentWithRouter = (children: React.ReactNode): void => {
  render(<BrowserRouter>{children}</BrowserRouter>)
}

export const createComponentWithProviderAndRouter = (
  children: React.ReactNode,
  store: Store
): void => {
  render(
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  )
}
