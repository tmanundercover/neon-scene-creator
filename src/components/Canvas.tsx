import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {AppBar, Box, Card, CardContent, Drawer, Grid, Tab, Tabs, Toolbar, Typography} from '@material-ui/core'
import NeonTheme, {
  allFontFaces,
  FontFace,
  fonts,
  iconFonts,
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
import FontSample from './icon-fonts/FontSample'
import DesignElementContextMenu from './design/DesignElementContextMenu'
import FontFaceSample from './design/FontFaceSample'

const drawerWidth = 590
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
  fontFace: FontFace,
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
    fontFace: allFontFaces[0],
    flickerStyle: 'PULSATE',
    flickerOn: true,
    color: 'green'
  }]
}

const INITIAL_DESIGN_ELEMENT: DesignElementType = {
  fontSize: 4,
  size: {height: 250, width: 250},
  text: 'New Text',
  fontFace: allFontFaces[0],
  flickerStyle: 'PULSATE',
  flickerOn: true,
  color: 'green'
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
  const [inProgressDesignElement, setInProgressDesignElement] = React.useState<DesignElementType>(INITIAL_DESIGN_ELEMENT)
  const [menuChoice, setMenuChoice] = React.useState<number>(0)
  const [fontFace, setFontFace] = React.useState<FontFace>(fonts[0])
  const [fontSize, setFontSize] = React.useState<number>(4)
  const [color, setColor] = React.useState<string>('green')
  const [flickerStyle, setFlickerStyle] = React.useState<string>('BASIC')
  const [text, setText] = React.useState<string>('New Text')
  const [contextCanvasMenu, setCanvasContextMenu] = React.useState<any>(undefined)
  const [backgroundImage, setBackgroundImage] = React.useState<{ title: string, file: any } | null>(null)
  const [flickerOn, setFlickerOn] = React.useState<boolean>(true)

  const setContextMenu = (menu: any) => {
    setCanvasContextMenu(menu)
  }

  const setDesignElement = (designElement: DesignElementType) => {
    // set(designElement.size.height)
    // setWidth(designElement.size.width)
    setText(designElement.text)
    setFontFace(designElement.fontFace)
    setFontSize(designElement.fontSize)
    setFlickerStyle(designElement.flickerStyle)
    setFlickerOn(designElement.flickerOn)
    setColor(designElement.color)
  }

  const addNewDesignElement = (designElement?: DesignElementType) => {

    const newDesignElement: DesignElementType = {
      size: {height: designElement?.size.height ?? 250, width: designElement?.size.width ?? 250},
      text: designElement?.text ?? text,
      fontSize: designElement?.fontSize ?? fontSize,
      fontFace: designElement?.fontFace ?? fontFace,
      flickerStyle: designElement?.flickerStyle ?? flickerStyle,
      flickerOn: designElement?.flickerOn ?? flickerOn,
      color: designElement?.color ?? color
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
          <Toolbar/>
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
          <Grid container alignItems="stretch" wrap="nowrap">
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
                    <Grid item><Typography style={{color: menuChoice === 2 ? iconOnColor : iconColor}}
                                           variant="h6">Icons</Typography></Grid>
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
                <Typography variant="h2" color="secondary" style={{textAlign:"right"}}>Add Background</Typography>
                <Grid item container spacing={1}>
                  {
                    backgrounds.map((background, index: number) => {
                      return <Grid key={index} item xs={12} onClick={() => {
                        setBackgroundImage(background)
                      }}>
                        <Card style={{
                          height: '100px',
                          width: '100%',
                          backgroundImage: `url(${background.file})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}>
                          <CardContent>
                          <Typography variant="h2" color="textPrimary" style={{textAlign:"center"}}>{background.title}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    })
                  }
                </Grid>
              </TabPanel>
              <TabPanel value={menuChoice} index={1}>
                <Grid item>
                  <Typography variant="h2" color="secondary" style={{textAlign:"right"}}>New Text</Typography>
                </Grid>
                <DesignElementContextMenu
                  designElement={INITIAL_DESIGN_ELEMENT}
                  addDesignElement={(designElement) => addNewDesignElement(designElement)}
                  setDesignElement={setDesignElement}/>
                <Grid container item xs={12}>
                  {
                    allFontFaces.map((fontFace: any, index: number) => {
                      return <Grid item key={index} xs={6} style={{padding: NeonTheme.spacing(1,1)}}>
                        <Card style={{backgroundColor: NeonTheme.palette.background.default, padding: NeonTheme.spacing(2, 1)}}>
                          <FontFaceSample fontFace={fontFace}
                                      addDesignElement={(design: DesignElementType) => addNewDesignElement(design)}/>
                        </Card>
                      </Grid>
                    })
                  }
                </Grid>
              </TabPanel>
              <TabPanel value={menuChoice} index={2}>
                <Typography variant="h2" color="secondary" style={{textAlign:"right"}}>Icons</Typography>
                <Grid container item xs={12}>
                  {
                    iconFonts.map((iconFont: any, index: number) => {
                      return <Grid item key={index} xs={6} style={{padding: NeonTheme.spacing(1,1)}}>
                        <Card style={{backgroundColor: NeonTheme.palette.background.default, padding: NeonTheme.spacing(2, 1)}}>
                          <FontSample fontFace={iconFont}
                                      addDesignElement={(design: DesignElementType) => addNewDesignElement(design)}/>
                        </Card>
                      </Grid>
                    })
                  }
                </Grid>
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