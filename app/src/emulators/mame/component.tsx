import React from 'react'
import { EmulatorComponentProperties } from 'components/cellar/emulator-main/emulator-main'
import { getRomsList } from 'emulators/mame/services/renderer'
import { Emulator } from 'models/emulator/types'

/**
 * Retrieve mame directory from emulator configuration.
 *
 * @param emulator - emulator containing mame directory configuration.
 * @returns mame directory.
 */
function getMameDirectory(emulator: Emulator): string | undefined {
  const configuration = emulator.configuration.find(
    (configuration) => configuration.name === 'mameDirectory'
  )
  return configuration?.value
}

function Mame(props: EmulatorComponentProperties): React.ReactElement {
  const mameDirectory = getMameDirectory(props.emulator)
  if (mameDirectory) {
    getRomsList(mameDirectory).then((roms) => {
      console.log(roms, 'roms')
      // TODO
    })
  }

  return <div>TODO mame</div>
}

export default Mame
