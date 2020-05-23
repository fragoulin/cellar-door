import React from 'react'
import { IntlProvider } from 'react-intl'
import { render, RenderResult } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Store } from 'redux'

export const createComponentWithIntl = (
  children: React.ReactNode,
  props = { locale: 'en', messages: {} }
): RenderResult => {
  return render(<IntlProvider {...props}>{children}</IntlProvider>)
}

export const createComponentWithIntlAndRouter = (
  children: React.ReactNode,
  props = { locale: 'en', messages: {} }
): RenderResult => {
  return render(
    <IntlProvider {...props}>
      <BrowserRouter>{children}</BrowserRouter>
    </IntlProvider>
  )
}

export const createComponentWithIntlAndProviderAndRouter = (
  children: React.ReactNode,
  props = { locale: 'en', messages: {} },
  store: Store
): RenderResult => {
  return render(
    <IntlProvider {...props}>
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    </IntlProvider>
  )
}
