import ReactDOM from 'react-dom'
import React, { ReactElement } from 'react'
import 'typeface-roboto'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Router } from './components/molecules/router/router-component'
import 'reflect-metadata'

const main = document.createElement('main')
document.body.appendChild(main)

const root: ReactElement = (
  <section id="root">
    <CssBaseline/>
    <header></header>
    <Router/>
    <footer></footer>
  </section>
)

ReactDOM.render(root, main)
