import { Welcome } from './components/welcome'
import ReactDOM from 'react-dom'
import React from 'react'

const e = React.createElement

const domContainer = document.querySelector('#content')
ReactDOM.render(e(Welcome), domContainer)
