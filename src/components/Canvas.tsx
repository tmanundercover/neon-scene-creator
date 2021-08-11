import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {
  AppBar,
  Box,
  Button,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core'
import NeonTheme, {
  fonts,
  NeonAquaHex,
  NeonBlueHex,
  NeonElectricVioletHex,
  NeonFuchsiaHex,
  NeonGreenHex,
  NeonYellowRoseBlueHex
} from '../theme/Theme'
import {Dashboard, Layers, MenuBook, Photo, Star, TextFields} from '@material-ui/icons'
import Design from './design/Design'
import Preview from './design/ruler/Preview'
import galaxy1 from '../assets/backgrounds/galaxy/2474215.jpg'
import galaxy2 from '../assets/backgrounds/galaxy/2474216.jpg'
import galaxy3 from '../assets/backgrounds/galaxy/5517472.jpg'
import brick1 from '../assets/backgrounds/brick/161326.jpg'
import brick2 from '../assets/backgrounds/brick/1858110.jpg'
import brick3 from '../assets/backgrounds/brick/1858126.jpg'

const drawerWidth = 450
const rulerWidth = 40
const iconColor = 'white'
const iconBGColor = 'transparent'
const iconOnColor = NeonFuchsiaHex
const textFieldColor = 'black'
const onBgColor = NeonYellowRoseBlueHex
const selectedTabContentBg = NeonYellowRoseBlueHex
const indicatorColor = NeonYellowRoseBlueHex
const selectedTabContentColor = 'black'

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
  drawerContainer: {
    overflow: 'auto',
    color: theme.palette.background.paper
  },
  content: {
    flexGrow: 1,
    paddingLeft: drawerWidth,
    backgroundColor: theme.palette.background.paper,
    height: '100vh',
    width: `calc(100vw - ${drawerWidth}px)`
  },
  tabs: {
    // borderRight: `1px solid ${theme.palette.divider}`
  },
  textField: {
    color: textFieldColor,
    ...fonts['Designer-Regular']
  },
  menuPaper: {
    backgroundColor: theme.palette.background.default,
    border: '1px solid #FAFAFA'
  }
}))

// .ruler {
//   position: relative;
//   list-style: none;
//   margin: 0;
//   padding: 0;
//   overflow: hidden;
//
//   &__background {
//     position: absolute;
//     left:0; width:100%;
//     height: 50%;
//
//     bottom: 0; // top, when inverted;
//   }
//
//   &__item {
//     display: block;
//     position: absolute;
//     left:0;
//     top:50%;
//     transform: translate(-50%,-50%);
//     margin: -2px 0 0 -1px;
//     color: #444;
//
//     &:before {
//       content: "";
//       position: absolute;
//       left:50%; top: 100%;
//       width: 1px; height: 100vh;
//       background: currentColor;
//     }
//
//     &:hover {
//       color: blue;
//     }
//     // move the pointer line into the button to avoid focus-within
//     &:focus-within {
//       button { box-shadow: 0 0 0 2px rgba(0,0,255, 0.3); }
//     }
//   }
// }
//
// .button {
//   outline: none;
//   border: none;
//   border: 1px solid;
//   // color: white;
//   border-radius: 4px;
//   padding: 1px 2px 2px;
//   line-height: 1;
//   color: currentColor;
//   font-weight: 700;
//   background-color: white;
//   font-size: 10px;
//
//   &:hover {
//     // background: darkgray;
//   }
//   // transform: rotate(90deg)
// }

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
  fontSize: number,
  fontFace: string,
  flickerOn: boolean,
  flickerStyle: 'PULSATE' | 'SUBTLE' | 'BASIC' | string,
  color: 'green' | 'fuchsia' | 'yellow' | 'blue' | 'violet' | string
}

const INITIAL_DESIGN = {
  title: 'New Design',
  width: 250,
  height: 250,
  elements: [{
    fontSize: 4,
    size: {height: 250, width: 250},
    text: 'New Text',
    fontFace: 'Barbaro',
    flickerStyle: 'PULSATE',
    flickerOn: true,
    color: 'green'
  }]
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}


function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const backgrounds = [{
  file: galaxy1,
  title: 'Galaxy 1'
},
  {
    file: galaxy2,
    title: 'Galaxy 2'
  },
  {
    file: galaxy3,
    title: 'Galaxy 3'
  },
  {
    file: brick1,
    title: 'Brick 1'
  },
  {
    file: brick2,
    title: 'Brick 2'
  },
  {
    file: brick3,
    title: 'Brick 3'
  }]


function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

export const colors: { [key: string]: string } = {
  'fuchsia': NeonFuchsiaHex,
  'green': NeonGreenHex,
  'yellow': NeonYellowRoseBlueHex,
  'aqua': NeonAquaHex,
  'purple': NeonElectricVioletHex,
  'blue': NeonBlueHex
}

const Canvas: FunctionComponent<CanvasProps> = (props) => {
  const classes = useStyles(NeonTheme)

  const [inProgressDesign, setInProgressDesign] = React.useState<DesignType>(INITIAL_DESIGN)
  const [menuChoice, setMenuChoice] = React.useState<number>(0)
  const [fontFace, setFontFace] = React.useState<string>('Barbaro')
  const [fontSize, setFontSize] = React.useState<number>(4)
  const [color, setColor] = React.useState<string>('green')
  const [flickerStyle, setFlickerStyle] = React.useState<string>('BASIC')
  const [text, setText] = React.useState<string>('New Text')
  const [contextCanvasMenu, setCanvasContextMenu] = React.useState<any>(undefined)
  const [backgroundImage,setBackgroundImage] = React.useState<{title: string, file: any}|null>(null)
const [flickerOn,setFlickerOn] = React.useState<boolean>(true)

  const setContextMenu = (menu: any) => {
    setCanvasContextMenu(menu)
  }

  const addNewDesignElement = () => {
    const newDesignElement: DesignElementType = {
      size: {height: 250, width: 250},
      text: text,
      fontSize: fontSize,
      fontFace: fontFace,
      flickerStyle: flickerStyle,
      flickerOn: flickerOn,
      color: color
    }

    setInProgressDesign((state) => ({...state, elements: state.elements.concat(newDesignElement)}))
  }

  React.useEffect(() => {
    console.log('inprogress desig', inProgressDesign)
  }, [inProgressDesign])

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setMenuChoice(newValue)
  }
  const negOne = -1

  // @ts-ignore
  return (
    <Grid container style={{width: '100vw', height: '100vh - 80px'}}>
      <Grid item>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>

          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Grid container alignItems="stretch">
            <Grid item style={{height: `calc(100vh)`}}>
              <Toolbar/>
              <Tabs
                TabIndicatorProps={{style: {backgroundColor: indicatorColor, width: '100%', zIndex: negOne}}}
                orientation="vertical"
                variant="scrollable"
                value={menuChoice}
                onChange={handleTabChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                <Tab
                  label={<Grid container direction="column" alignItems="center">
                    <Grid item><MenuBook style={{color: menuChoice === 0 ? iconOnColor : iconColor}}
                                         fontSize="large"/></Grid>
                    <Grid item><Typography style={{color: menuChoice === 0 ? iconOnColor : iconColor}}
                                           variant="h6">Backgrounds</Typography></Grid>
                  </Grid>} {...a11yProps(0)} />
                <Tab
                  label={<Grid container direction="column" alignItems="center">
                    <Grid item><TextFields style={{color: menuChoice === 1 ? iconOnColor : iconColor}}
                                           fontSize="large"/></Grid>
                    <Grid item><Typography style={{color: menuChoice === 1 ? iconOnColor : iconColor}}
                                           variant="h6">Text</Typography></Grid>
                  </Grid>} {...a11yProps(1)} />
                <Tab
                  label={<Grid container direction="column" alignItems="center">
                    <Grid item><Star style={{color: menuChoice === 2 ? iconOnColor : iconColor}}
                                     fontSize="large"/></Grid>
                    <Grid item><Typography style={{color: menuChoice === 2 ? iconOnColor : iconColor}} variant="h6">Clip
                      Arts</Typography></Grid>
                  </Grid>} {...a11yProps(2)} />
                <Tab
                  label={<Grid container direction="column" alignItems="center">
                    <Grid item><Photo style={{color: menuChoice === 3 ? iconOnColor : iconColor}}
                                      fontSize="large"/></Grid>
                    <Grid item><Typography style={{color: menuChoice === 3 ? iconOnColor : iconColor}}
                                           variant="h6">Photos</Typography></Grid>
                  </Grid>} {...a11yProps(3)} />
                <Tab
                  label={<Grid container direction="column" alignItems="center">
                    <Grid item><Dashboard style={{color: menuChoice === 4 ? iconOnColor : iconColor}}
                                          fontSize="large"/></Grid>
                    <Grid item><Typography style={{color: menuChoice === 4 ? iconOnColor : iconColor}}
                                           variant="h6">Elements</Typography></Grid>
                  </Grid>} {...a11yProps(4)} />
                <Tab
                  label={<Grid container direction="column" alignItems="center">
                    <Grid item><Layers style={{color: menuChoice === 5 ? iconOnColor : iconColor}}
                                       fontSize="large"/></Grid>
                    <Grid item><Typography style={{color: menuChoice === 5 ? iconOnColor : iconColor}}
                                           variant="h6">Layers</Typography></Grid>
                  </Grid>} {...a11yProps(5)} />
              </Tabs>
            </Grid>
            <Grid item style={{backgroundColor: selectedTabContentBg, flexGrow: 2, color: selectedTabContentColor}}>
              <Toolbar/>
              <TabPanel value={menuChoice} index={0}>
                <Typography>Backgrounds</Typography>
                <Grid item>
                  {
                    backgrounds.map((background) => {

                      return <Grid item xs={12} onClick={(e:any)=>{
                        setBackgroundImage(background)
                      }}>
                        <Grid item container alignItems="center" justifyContent="center" style={{
                          height: '100px',
                          width: '100%',
                          backgroundImage: `url(${background.file})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}>
                          <Typography variant="h5" color="textPrimary">{background.title}</Typography>
                        </Grid>
                      </Grid>
                    })
                  }
                </Grid>
              </TabPanel>
              <TabPanel value={menuChoice} index={1}>
                <Grid item>
                  <Typography variant="h6" color="secondary">New Text</Typography>
                </Grid>
                <Grid container item wrap="nowrap" alignItems="center" justifyContent="center" spacing={1}>
                  <Grid item container>
                    <TextField
                      fullWidth
                      label={<Typography variant="h3" color="secondary">Text:</Typography>}
                      inputProps={{className: classes.textField}}
                      value={text}
                      onChange={(event) => setText(event.target.value)}
                      color="secondary"/>
                  </Grid>
                </Grid>
                <Grid container item wrap="nowrap" alignItems="center" justifyContent="center" spacing={1}>
                  <Grid item container>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-helper-label"><Typography variant="h3"
                                                                                   color="secondary">Font:</Typography></InputLabel>
                      <Select
                        fullWidth
                        color="secondary"
                        value={fontFace}
                        inputProps={{className: classes.textField}}
                        MenuProps={{classes: {paper: classes.menuPaper}}}
                        onChange={(e) => setFontFace(e.target.value as string)}
                      >
                        {
                          Object.keys(fonts).map((fontKey, index) => {
                            return <MenuItem key={index} value={fontKey}><Typography variant="h6"
                            >{fontKey}</Typography></MenuItem>
                          })
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container item wrap="nowrap" alignItems="center" justifyContent="center" spacing={1}>
                  <Grid item container>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-helper-label"><Typography variant="h3"
                                                                                   color="secondary">Size:</Typography></InputLabel>

                      <Select
                        fullWidth
                        color="secondary"
                        value={fontSize}
                        inputProps={{className: classes.textField}}
                        MenuProps={{classes: {paper: classes.menuPaper}}}
                        onChange={(e) => setFontSize(e.target.value as number)}
                      >
                        {
                          [1, 2, 3, 4, 5, 6, 7, 8].map((fontSize, index) => {
                            return <MenuItem key={index} value={fontSize}><Typography variant="h6"
                            >{fontSize}</Typography></MenuItem>
                          })
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container item wrap="nowrap" alignItems="center" justifyContent="center" spacing={1}>
                  <Grid item container>
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-helper-label">
                        <Typography
                          variant="h3"
                          color="secondary">
                          Color:
                        </Typography>
                      </InputLabel>
                      <Select
                        fullWidth
                        color="secondary"
                        value={color}
                        inputProps={{className: classes.textField}}
                        MenuProps={{classes: {paper: classes.menuPaper}}}
                        onChange={(e) => setColor(e.target.value as string)}
                      >
                        {
                          Object.keys(colors).map((colorKey, index) => {
                            return <MenuItem key={index} value={colorKey}>
                              <Grid item style={{
                                width: 24,
                                height: 24,
                                backgroundColor: colors[colorKey]
                              }}/>
                            </MenuItem>
                          })
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container item wrap="nowrap" alignItems="center" justifyContent="center" spacing={1}>
                  <Grid item container>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-helper-label">
                        <Typography
                          variant="h3"
                          color="secondary">Flicker:</Typography>
                      </InputLabel>
                      <Select
                        fullWidth
                        color="secondary"
                        value={flickerStyle}
                        MenuProps={{classes: {paper: classes.menuPaper}}}
                        inputProps={{className: classes.textField}}
                        onChange={(e) => setFlickerStyle(e.target.value as string)}
                      >
                        {
                          ['BASIC', 'PULSATE', 'SUBTLE'].map((flickerKey, index) => {
                            return <MenuItem key={index} value={flickerKey}><Typography
                              variant="h6">{flickerKey}</Typography></MenuItem>
                          })
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item container>
                    <FormControl fullWidth>
                      <Switch
                        checked={flickerOn}
                        onChange={(e)=> setFlickerOn(e.target.value === 'true')}
                        color="secondary"
                        name="flickerOn"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  wrap="nowrap"
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={() => addNewDesignElement()}>
                      <Typography>
                        Add New Text</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={menuChoice} index={2}>
                Clip Arts
              </TabPanel>
              <TabPanel value={menuChoice} index={3}>
                Photos
              </TabPanel>
              <TabPanel value={menuChoice} index={4}>
                Elements
              </TabPanel>
              <TabPanel value={menuChoice} index={5}>
                Layers
              </TabPanel>
            </Grid>
          </Grid>
        </Drawer>
      </Grid>
      <Grid container item>
        <main className={classes.content}>
          <Grid container direction="column">
            <Grid item container><Toolbar/></Grid>
            <Grid item container style={{backgroundColor: 'black'}} xs={12}>
              {contextCanvasMenu || <Toolbar/>}
            </Grid>
            <Grid item container>
              <Box height="40px" width="40px">space</Box>
              <Grid
                item
                container
                xs={11}
                style={{
                  height: `${rulerWidth}px`
                }}>
                {/* http://jsfiddle.net/thirdender/kwcug/ */}
                {<Preview sizes={[320, 480, 600]}/>}
              </Grid>
            </Grid>
            <Grid item container>
              <Grid container item alignItems="stretch" wrap="nowrap">
                <Grid item style={{minWidth: `${rulerWidth}px`}}><Typography color="textSecondary">left
                  ruler</Typography></Grid>
                <Grid
                  item
                  style={{
                    minWidth: `calc(100vw - ${rulerWidth + drawerWidth}px)`,
                    height: `calc(100vh - ${rulerWidth}px)`,
                    backgroundColor: 'black'
                  }}>
                  <Design
                    background={backgroundImage}
                    design={inProgressDesign}
                    setContextMenu={setContextMenu}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </Grid>
    </Grid>
  )
}

export default Canvas