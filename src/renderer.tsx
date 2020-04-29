import ReactDOM from 'react-dom'
import React from 'react'
import { Welcome } from './components/welcome/welcome-component'
import { AddEmulator } from './components/add-emulator/add-emulator-component'

const container = document.getElementById('content')
let welcome: Welcome | null
let addEmulator: AddEmulator | null

// Render add emulator content
function renderAddEmulatorContent() {
  ReactDOM.render(<AddEmulator ref={ (e):void => {addEmulator = e}}/>, container, () => {
    
  })
}

// Register add emulator button click for welcome content
function registerAddEmulatorCallback (): void {
  if (welcome != null) {
    welcome.onAddEmulator.subscribe(() => {
      renderAddEmulatorContent()
    })
  }
}

// Render welcome content
function renderWelcomeContent() {
  ReactDOM.render(<Welcome ref={ (e): void => { welcome = e }} />, container, () => registerAddEmulatorCallback())
}

renderWelcomeContent()
