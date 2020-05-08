import * as React from 'react'
import './welcome.css'
import { Cellar } from '../../../models/cellar'
import { EmulatorsList } from '../emulators-list/emulators-list-component'
import FreshInstallation from '../../../container/cellar/fresh-installation'
import { List } from 'immutable'
import { Emulator } from '../../../models/emulator/emulator'
import { FormattedMessage } from 'react-intl'

export interface WelcomeComponentStateProperties {
  cellar: Cellar | undefined;
  emulatorsInCellar: List<Emulator>;
}

// Welcome page
export class Welcome extends React.PureComponent<WelcomeComponentStateProperties> {
  render (): React.ReactNode {
    return (
      <div className="Welcome">
        <h1><FormattedMessage id="welcome.title"/></h1>
        { // Check for cellar
          (this.props.cellar && this.props.emulatorsInCellar.count() > 0)
            ? <EmulatorsList/>
            : <FreshInstallation/>
        }
      </div>
    )
  }
}
