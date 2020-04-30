import * as React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Router } from '../molecules/router/router-component'

// Root component (root of all components)
export class Root extends React.PureComponent {
  render (): React.ReactNode {
    return (
      <section id="root">
        <CssBaseline/>
        <header></header>
        <Router/>
        <footer></footer>
      </section>
    )
  }
}
