import React from 'react'

const e = React.createElement

export class Welcome extends React.Component {
  render (): any {
    return e('div', {}, 'Welcome')
  }
}
