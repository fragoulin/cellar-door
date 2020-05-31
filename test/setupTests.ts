import { unmountComponentAtNode } from 'react-dom'
import { WithTranslation } from 'react-i18next'

let container: HTMLDivElement | undefined

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  if (container) {
    unmountComponentAtNode(container)
    container.remove()
    container = undefined
  }
})

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive the WithTranslation implementation as a prop
  withTranslation: () => (component: {
    defaultProps: WithTranslation
  }): { defaultProps: WithTranslation } => {
    component.defaultProps = {
      ...component.defaultProps,
      t: (id: string): string => id,
    }
    return component
  },
}))
