import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {
  AppBar,
  Box,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core'
import NeonTheme, {NeonYellowRoseBlueHex} from '../theme/Theme'
import {Dashboard, Layers, MenuBook, Photo, Star, TextFields} from '@material-ui/icons'

const drawerWidth = 90
const drawerWidth2 = 450
const rulerWidth = 40

export const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'black'
  },
  drawer2: {
    width: drawerWidth2,
    flexShrink: 0
  },
  drawerPaper2: {
    paddingLeft: drawerWidth,
    width: drawerWidth2,
    backgroundColor: NeonYellowRoseBlueHex
  },
  drawerContainer: {
    overflow: 'auto',
    color: theme.palette.background.paper
  },
  content: {
    flexGrow: 1,
    paddingLeft: drawerWidth2,
    backgroundColor: theme.palette.background.paper,
    height: '100vh'
  }
}))

export type CanvasProps = {}


// export type InProgressDesignType = {
//   title?: string,
//   font?: string,
//   text?: string,
//   width: number,
//   height: number
// }

export type DesignType = {
  title: string,
  width: number,
  height: number,
  elements: DesignElementType[]
}


export type DesignElementType = {
  size: { height: number, width: number },
  text: string,
  fontFace: 'NEON' | 'NEONEON' | 'KLAXONS' | string,
  flickerStyle: 'PULSATE' | 'SUBTLE' | 'BASIC' | string,
  color: 'green' | 'fuchsia' | 'yellow' | 'blue' | 'violet' | string
}

const INITIAL_DESIGN = {
  title: 'New Design',
  width: 250,
  height: 250,
  elements: [{
    size: {height: 250, width: 250},
    text: 'New Text',
    fontFace: 'NEON',
    flickerStyle: 'PULSATE',
    color: 'green'
  }]
}

const Canvas: FunctionComponent<CanvasProps> = (props) => {
  const classes = useStyles(NeonTheme)

  const [designs] = React.useState<DesignType[]>([])
  const [inProgressDesign, setInProgressDesign] = React.useState<DesignType>(INITIAL_DESIGN)
  const [menuChoice, setMenuChoice] = React.useState<string>('')

  const addNewDesign = (): void => {
    setInProgressDesign(INITIAL_DESIGN)
  }

  const renderMenuChoice = (choice: string) => {
    switch (choice) {
      default:
        return <div>Default</div>
    }
  }

  return (
    <Grid container style={{width: '100vw', height: '100vh - 80px'}}>
      <Grid item>
        <AppBar color="secondary" position="fixed" className={classes.appBar}>
          <Toolbar>

          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item>

      </Grid>
      <Grid item>
        <Drawer
          className={classes.drawer2}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper2
          }}
        >
          <Toolbar/>
          <Grid container>
            {renderMenuChoice(menuChoice)}

          </Grid>
        </Drawer>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Toolbar/>
          <div className={classes.drawerContainer}>
            <List>
              <ListItem button key={'templates'}>
                <ListItemIcon>
                  <Grid container direction="column" alignItems="center">
                    <Grid item><MenuBook color="secondary" fontSize="large"/></Grid>
                    <Grid item><Typography color="secondary" variant="h6">Templates</Typography></Grid>
                  </Grid>
                </ListItemIcon>
              </ListItem>
              <ListItem button key={'text'}>
                <ListItemIcon>
                  <Grid container direction="column" alignItems="center">
                    <Grid item><TextFields color="secondary" fontSize="large"/></Grid>
                    <Grid item><Typography color="secondary" variant="h6">Text</Typography></Grid>
                  </Grid>
                </ListItemIcon>
              </ListItem>

              <ListItem button key={'cliparts'}>
                <ListItemIcon>
                  <Grid container direction="column" alignItems="center">
                    <Grid item><Star color="secondary" fontSize="large"/></Grid>
                    <Grid item><Typography color="secondary" variant="h6">Clip Arts</Typography></Grid>
                  </Grid>
                </ListItemIcon>
              </ListItem>

              <ListItem button key={'photos'}>
                <ListItemIcon>
                  <Grid container direction="column" alignItems="center">
                    <Grid item><Photo color="secondary" fontSize="large"/></Grid>
                    <Grid item><Typography color="secondary" variant="h6">Photos</Typography></Grid>
                  </Grid>
                </ListItemIcon>
              </ListItem>

              <ListItem button key={'elements'}>
                <ListItemIcon>
                  <Grid container direction="column" alignItems="center">
                    <Grid item><Dashboard color="secondary" fontSize="large"/></Grid>
                    <Grid item><Typography color="secondary" variant="h6">Elements</Typography></Grid>
                  </Grid>
                </ListItemIcon>
              </ListItem>

              <ListItem button key={'layers'}>
                <ListItemIcon>
                  <Grid container direction="column" alignItems="center">
                    <Grid item><Layers color="secondary" fontSize="large"/></Grid>
                    <Grid item><Typography color="secondary" variant="h6">Layers</Typography></Grid>
                  </Grid>
                </ListItemIcon>
              </ListItem>
            </List>
          </div>
        </Drawer>
      </Grid>
      <Grid container item>
        <main className={classes.content}>
          <Toolbar/>
          <Grid container direction="column">
            <Grid item container>
              <Grid item container xs={1}><Box width="40px">space</Box></Grid>
              <Grid
                item
                container
                xs={11}
                style={{
                  height: `${rulerWidth}px`
                }}>
                <Typography color="textSecondary">top ruler</Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid container item alignItems="stretch" wrap="nowrap">
                <Grid item style={{minWidth: `${rulerWidth}px`}}><Typography color="textSecondary">left ruler</Typography></Grid>
                <Grid item
                      style={{ minWidth: `calc(100vw - ${rulerWidth+drawerWidth2}px)`, height: `calc(100vh - ${rulerWidth}px)`, backgroundColor: 'black'}}>stage</Grid>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </Grid>



    </Grid>
  )
}

export default Canvas