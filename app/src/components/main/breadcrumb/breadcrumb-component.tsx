import React from 'react'
import { Breadcrumbs, Typography, Link } from '@material-ui/core'
import {
  Link as RouterLink,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom'

import { withTranslation, WithTranslation } from 'react-i18next'
import { EmulatorId } from 'models/emulator/types'
import { getEmulator } from 'services/emulators-service'

/**
 * Component properties.
 */
interface ComponentProperties {
  ignoredPaths: string[]
  nonClickablePaths: string[]
}

/**
 * Component state.
 */
interface ComponentState {
  paths: string[]
}

/**
 * Handles breadcrumb display.
 */
class Breadcrumb extends React.PureComponent<
  ComponentProperties & RouteComponentProps & WithTranslation,
  ComponentState
> {
  /**
   * Initialize component.
   *
   * @param props - properties.
   */
  constructor(
    props: ComponentProperties & RouteComponentProps & WithTranslation
  ) {
    super(props)

    this.state = {
      paths: this.getPathsFromLocation(this.props.location.pathname),
    }
  }

  /**
   * Listen for navigation to update breadcrumb.
   *
   * @param prevProps - properties before navigation.
   */
  componentDidUpdate(prevProps: RouteComponentProps): void {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        paths: this.getPathsFromLocation(this.props.location.pathname),
      })
    }
  }

  /**
   * Build array of strings from current location.
   */
  private getPathsFromLocation(pathname: string): string[] {
    return pathname
      .split('/')
      .filter((path) => path !== 'main_window' && path.length > 0)
  }

  /**
   * Compute string value to display in breadcrumb.
   * If value is an emulator name, it is displayed as is.
   * Otherwise, it is translated.
   *
   * @param value - value to eventually convert.
   * @returns converted value.
   */
  private computeValue(value: string): string {
    if (Object.values(EmulatorId).includes(value as EmulatorId)) {
      const emulator = getEmulator(value as EmulatorId)
      return emulator ? emulator.shortName : value
    }
    return this.props.i18n.t(`breadcrumb.${value}`)
  }

  /**
   * Render navigation in breadcrumb.
   */
  public render(): React.ReactNode {
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/" component={RouterLink} draggable={false}>
          {this.props.i18n.t('breadcrumb.home')}
        </Link>
        {this.state.paths
          .filter((value) => this.props.ignoredPaths.indexOf(value) === -1)
          .map((value, index, array) => {
            const last = index === array.length - 1
            const to = `/${array.slice(0, index + 1).join('/')}`

            return last ? (
              <Typography color="textPrimary" key={to}>
                {this.computeValue(value)}
              </Typography>
            ) : this.props.nonClickablePaths.indexOf(value) === -1 ? (
              <Link
                color="inherit"
                to={to}
                key={to}
                component={RouterLink}
                draggable={false}
              >
                {this.computeValue(value)}
              </Link>
            ) : (
              <Typography color="textPrimary" key={to}>
                {this.computeValue(value)}
              </Typography>
            )
          })}
      </Breadcrumbs>
    )
  }
}

export default withRouter(withTranslation()(Breadcrumb))
