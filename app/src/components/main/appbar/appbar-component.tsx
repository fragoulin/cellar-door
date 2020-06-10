import React from 'react'
import {
  Toolbar,
  IconButton,
  Typography,
  AppBar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { withTranslation, WithTranslation } from 'react-i18next'
import {
  withRouter,
  RouteComponentProps,
  Link as RouterLink,
} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import AddIcon from '@material-ui/icons/Add'
import SettingsIcon from '@material-ui/icons/Settings'
import { Emulator } from 'models/emulator/types'

/**
 * Properties for this component (from redux state).
 */
export interface AppbarComponentStateProperties {
  emulatorsInCellar: Emulator[]
}

/**
 * State for this component.
 */
interface ComponentState {
  opened: boolean
}

/**
 * Application navigation bar.
 */
class Appbar extends React.PureComponent<
  AppbarComponentStateProperties & RouteComponentProps & WithTranslation,
  ComponentState
> {
  /**
   * Initialize component. By default drawer is closed.
   *
   * @param props - component properties.
   */
  constructor(
    props: AppbarComponentStateProperties &
      RouteComponentProps &
      WithTranslation
  ) {
    super(props)

    this.state = {
      opened: false,
    }
  }

  /**
   * Build array of strings from current location.
   */
  private getPathPartsFromLocation(): string[] {
    return this.props.location.pathname
      .split('/')
      .filter((path) => path !== 'main_window' && path.length > 0)
  }

  /**
   * Toggle drawer visibility.
   *
   * @param opened - true to open drawer, false to close it.
   */
  private toggleDrawer = (opened: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ): void => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    this.setState({
      opened: opened,
    })
  }

  /**
   * Compute application bar title.
   *
   * @returns contextualized title for application bar.
   */
  private getAppbarTitle(): string {
    const parts = this.getPathPartsFromLocation()

    // Check for home
    if (parts.length === 0) return this.props.i18n.t('appbar.home')

    // Check if translation exists for last path part
    const lastPart = parts.pop()
    const key = `appbar.${lastPart}`
    if (this.props.i18n.exists(key)) return this.props.i18n.t(key)

    // Check for emulator shortname
    const emulator = this.props.emulatorsInCellar.find(
      (emulator) => emulator.Id === lastPart
    )
    if (emulator) return emulator.shortName

    return ''
  }

  /**
   * Render application bar.
   */
  public render(): React.ReactNode {
    return (
      <>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {this.getAppbarTitle()}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          anchor="left"
          open={this.state.opened}
          onClose={this.toggleDrawer(false)}
        >
          <div
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <div>
              <IconButton onClick={this.toggleDrawer(false)}>
                <MenuIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem
                button
                key="Home"
                to="/"
                component={RouterLink}
                draggable={false}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>{this.props.i18n.t('appbar.home')}</ListItemText>
              </ListItem>
              <ListItem
                button
                key="AddEmulator"
                to="/add-emulator/"
                component={RouterLink}
                draggable={false}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText>
                  {this.props.i18n.t('appbar.add-emulator')}
                </ListItemText>
              </ListItem>
            </List>
            <Divider />
            <List>
              {this.props.emulatorsInCellar.map((emulator) => (
                <ListItem
                  button
                  key={emulator.Id}
                  to={`/emulator/${emulator.Id}`}
                  component={RouterLink}
                  draggable={false}
                  title={emulator.fullName}
                >
                  <ListItemIcon>
                    <img src={emulator.icon} />
                  </ListItemIcon>
                  <ListItemText primary={emulator.shortName} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              <ListItem button key="Settings" draggable={false}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText>
                  {this.props.i18n.t('appbar.settings')}
                </ListItemText>
              </ListItem>
            </List>
          </div>
        </Drawer>
      </>
    )
  }
}

export default withRouter(withTranslation()(Appbar))
