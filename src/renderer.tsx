import ReactDOM from 'react-dom'
import React from 'react'
import { Root } from './components/root/root-component'
import 'typeface-roboto'

const main = document.createElement('main')
document.body.appendChild(main)

ReactDOM.render(<Root/>, main)
