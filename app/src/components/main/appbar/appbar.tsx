import React, { useState } from 'react'
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
export type AppbarComponentStateProperties = {
  emulatorsInCellar: Emulator[]
}

/**
 * Application navigation bar.
 */
function Appbar(
  props: AppbarComponentStateProperties & RouteComponentProps & WithTranslation
): React.ReactElement {
  const [opened, setOpened] = useState(false)

  /**
   * Build array of strings from current location.
   */
  const getPathPartsFromLocation = (): string[] => {
    return props.location.pathname
      .split('/')
      .filter((path) => path !== 'main_window' && path.length > 0)
  }

  /**
   * Toggle drawer visibility.
   *
   * @param opened - true to open drawer, false to close it.
   */
  const toggleDrawer = (opened: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ): void => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setOpened(opened)
  }

  /**
   * Compute application bar title.
   *
   * @returns contextualized title for application bar.
   */
  const getAppbarTitle = (): string => {
    const parts = getPathPartsFromLocation()

    // Check for home
    if (parts.length === 0) return props.i18n.t('appbar.home')

    // Check if translation exists for last path part
    const lastPart = parts.pop()
    const key = `appbar.${lastPart}`
    if (props.i18n.exists(key)) return props.i18n.t(key)

    // Check for emulator shortname
    const emulator = props.emulatorsInCellar.find(
      (emulator) => emulator.Id === lastPart
    )
    if (emulator) return emulator.shortName

    return ''
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {getAppbarTitle()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={opened}
        onClose={toggleDrawer(false)}
      >
        <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <div>
            <IconButton onClick={toggleDrawer(false)}>
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
              <ListItemText>{props.i18n.t('appbar.home')}</ListItemText>
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
              <ListItemText>{props.i18n.t('appbar.add-emulator')}</ListItemText>
            </ListItem>
          </List>
          <Divider />
          <List>
            {props.emulatorsInCellar.map((emulator) => (
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
              <ListItemText>{props.i18n.t('appbar.settings')}</ListItemText>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  )
}

export default withRouter(withTranslation()(Appbar))
