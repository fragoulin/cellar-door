import * as ReactDOM from 'react-dom'
import template from '../../views/Welcome.pug'

ReactDOM.render(template.call(this), document.getElementById('welcome'))
