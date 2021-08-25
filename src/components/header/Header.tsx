import React, {FunctionComponent} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import NeonTheme, {
  FacebookBlue,
  getFontFace,
  InstagramMagenta,
  NeonYellowRoseBlueHex,
  PinterestRed,
  TwitterBlue
} from '../../theme/Theme'
import {Button, Grid, ListItem, Menu, MenuItem, Switch, Toolbar, Typography} from '@material-ui/core'
import {ArrowRightAlt, Facebook, Instagram, Pinterest, Redo, Share, Twitter, Undo} from '@material-ui/icons'
import {DesignType} from '../Canvas'
import FirebaseFirestoreClient from '../../clients/FirebaseFirestoreClient'

export const useStyles = makeStyles((theme) => ({
  textField: (props) => ({
    // color: props.color ? props.color : theme.palette.primary.main,
    marginTop: '2px',
    height: '12px',
    ...getFontFace('Margot')
  }),
  menuPaper: {
    backgroundColor: NeonTheme.palette.background.default,
    border: '1px solid #FAFAFA'
  }
}))

enum MainMenuItems {
  FILE,
  EDIT,
  VIEW,
  SHARE
}

export type HeaderProps = {
  design: DesignType
}

const HeaderMenu: FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [currentMenu, setCurrentMenu] = React.useState<MainMenuItems | undefined>(undefined)

  const [checked, setChecked] = React.useState(['ruler'])

  const saveDesign = () => {
    FirebaseFirestoreClient.createDesign(props.design)
    handleClose()
  }

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, menuName: MainMenuItems) => {
    setCurrentMenu(menuName)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    console.log('closing the menu')
    setCurrentMenu(undefined)
    setAnchorEl(null)
  }

  return (<Toolbar style={{width: '100%'}}>
      <Grid container justifyContent="space-between" alignItems="stretch">
        <Grid item xs={4} container wrap="nowrap" alignItems="center">
          <ListItem>
            <Button
              onClick={
                (e) =>
                  handleClick(e, MainMenuItems.FILE)}>
              <Typography variant="h3" style={{color: 'black'}}>File</Typography>
            </Button>
            <Menu anchorEl={anchorEl}
                  keepMounted
                  open={currentMenu === MainMenuItems.FILE}
                  onClose={handleClose}>
              <MenuItem>
                <Button onClick={handleClose}><Typography variant="h6" color="textSecondary">Open</Typography></Button>
              </MenuItem>
              <MenuItem>
                <Button onClick={() => saveDesign()}><Typography variant="h6"
                                                                 color="textSecondary">Save</Typography></Button>
              </MenuItem>
              <MenuItem>
                <Button onClick={handleClose}><Typography variant="h6"
                                                          color="textSecondary">Download</Typography></Button>
              </MenuItem>
            </Menu>
          </ListItem>
          <ListItem>
            <Button
              onClick={
                (e) =>
                  handleClick(e, MainMenuItems.EDIT)}>
              <Typography variant="h3" style={{color: 'black'}}>Edit</Typography>
            </Button>
            <Menu anchorEl={anchorEl}
                  keepMounted
                  open={currentMenu === MainMenuItems.EDIT}
                  onClose={handleClose}>
              <MenuItem>
                <Button onClick={handleClose}><Typography variant="h6" color="textSecondary">Clear
                  All</Typography></Button>
              </MenuItem>
            </Menu>
          </ListItem>
          <ListItem>
            <Button
              onClick={
                (e) =>
                  handleClick(e, MainMenuItems.VIEW)}>
              <Typography variant="h3" style={{color: 'black'}}>View</Typography></Button>
            <Menu anchorEl={anchorEl}
                  keepMounted
                  open={currentMenu === MainMenuItems.VIEW}
                  onClose={handleClose}>
              <MenuItem>
                <Switch
                  edge="start"
                  onChange={handleToggle('ruler')}
                  checked={checked.indexOf('ruler') !== -1}
                  inputProps={{'aria-labelledby': 'switch-list-label-ruler'}}
                />
                <Button onClick={handleClose}><Typography variant="h6" color="textSecondary">Ruler</Typography></Button>
              </MenuItem>
              <MenuItem>
                <Switch
                  edge="start"
                  onChange={handleToggle('grid')}
                  checked={checked.indexOf('grid') !== -1}
                  inputProps={{'aria-labelledby': 'switch-list-label-grid'}}
                />
                <Button onClick={handleClose}><Typography variant="h6" color="textSecondary">Show
                  Grid</Typography></Button>
              </MenuItem>
              <MenuItem>
                <Switch
                  edge="start"
                  onChange={handleToggle('bleed-lines')}
                  checked={checked.indexOf('bleed-lines') !== -1}
                  inputProps={{'aria-labelledby': 'switch-list-label-ruler'}}
                />
                <Button onClick={handleClose}><Typography variant="h6" color="textSecondary">Show Bleed
                  Line</Typography></Button>
              </MenuItem>
              <MenuItem>
                <Switch
                  edge="start"
                  onChange={handleToggle('dimensions')}
                  checked={checked.indexOf('dimensions') !== -1}
                  inputProps={{'aria-labelledby': 'switch-list-label-dimensions'}}
                />
                <Button onClick={handleClose}><Typography variant="h6" color="textSecondary">Show
                  Dimensions</Typography></Button>
              </MenuItem>
              <MenuItem>
                <Switch
                  edge="start"
                  onChange={handleToggle('warnings')}
                  checked={checked.indexOf('warnings') !== -1}
                  inputProps={{'aria-labelledby': 'switch-list-label-ruler'}}
                />
                <Button onClick={handleClose}>
                  <Typography variant="h6"
                              color="textSecondary">Warnings</Typography>
                </Button>
              </MenuItem>
            </Menu>
          </ListItem>
        </Grid>
        <Grid container item xs={4} justifyContent="center" alignItems="center">
          <Grid item>
            <ListItem>
              <Button>
                <Grid
                  container
                  direction="column"
                  justifyContent="center">
                  <Grid item>
                    <Undo color="secondary"/>
                  </Grid>
                  <Grid
                    item>
                    <Typography
                      style={{...getFontFace('Margot')}}
                      color="secondary"
                      variant="subtitle2">Undo</Typography>
                  </Grid>
                </Grid>
              </Button>
              <Button>
                <Grid
                  container
                  direction="column"
                  justifyContent="center">
                  <Grid
                    item>
                    <Redo
                      color="secondary"/>
                  </Grid>
                  <Grid
                    item>
                    <Typography
                      style={{...getFontFace('Margot')}}
                      color="secondary"
                      variant="subtitle2">Redo</Typography>
                  </Grid>
                </Grid>
              </Button>
            </ListItem>
          </Grid>
        </Grid>
        <Grid container item xs={4} justifyContent="flex-end" alignItems="center">
          <Grid item>
            <ListItem>
              <Button onClick={
                (e) =>
                  handleClick(e, MainMenuItems.SHARE)}>
                <Share fontSize="large" color="secondary"/>
              </Button>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                MenuListProps={{dense: true, disablePadding: true}}
                open={currentMenu === MainMenuItems.SHARE}
                onClose={handleClose}>
                <MenuItem style={{backgroundColor: FacebookBlue}} onClick={handleClose}><Facebook/></MenuItem>
                <MenuItem style={{backgroundColor: InstagramMagenta}} onClick={handleClose}><Instagram/></MenuItem>
                <MenuItem style={{backgroundColor: TwitterBlue}} onClick={handleClose}><Twitter/></MenuItem>
                <MenuItem style={{backgroundColor: PinterestRed}} onClick={handleClose}><Pinterest/></MenuItem>
              </Menu>
              <Button variant="contained" style={{backgroundColor: NeonYellowRoseBlueHex}}>
                <Grid container justifyContent="space-between" alignItems="stretch">
                  <Grid item>
                    <Typography variant="h4" color="secondary">Export</Typography>
                  </Grid>
                  <Grid item>
                    <ArrowRightAlt fontSize="large" color="secondary"/>
                  </Grid>
                </Grid>
              </Button>
            </ListItem>

          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default HeaderMenu