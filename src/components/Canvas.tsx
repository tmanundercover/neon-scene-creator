import React, {FunctionComponent} from 'react'
import {useLocation} from 'react-router-dom'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Drawer,
  Grid,
  Modal,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from '@material-ui/core'
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
import {Bookmarks, Close, Dashboard, Layers, MenuBook, Star, TextFields} from '@material-ui/icons'
import galaxy1 from '../assets/backgrounds/galaxy/2474215.jpg'
import galaxy2 from '../assets/backgrounds/galaxy/2474216.jpg'
import galaxy3 from '../assets/backgrounds/galaxy/5517472.jpg'
import brick1 from '../assets/backgrounds/brick/161326.jpg'
import brick2 from '../assets/backgrounds/brick/1858110.jpg'
import brick3 from '../assets/backgrounds/brick/1858126.jpg'
import FontSample from './icon-fonts/FontSample'
import DesignElementContextMenu from './design/DesignElementContextMenu'
import FontFaceSample from './design/FontFaceSample'
import Preview from './design/ruler/Preview'
import Design from './design/Design'
import HeaderMenu from './header/Header'
import FirebaseAnalyticsClient from '../clients/FirebaseAnalyticsClient'
import FirebaseFirestoreClient from '../clients/FirebaseFirestoreClient'
import contactMeBubble from '../assets/fuschia-speech-bubble.png'
import {motion, useAnimation} from 'framer-motion'
import bullhorn from '../assets/fuschia-bullhorn.png'
import ContactUs from './contact-us/ContactUs'

const drawerWidth = 590
const rulerWidth = 40
const iconColor = 'white'
const iconOnColor = NeonFuchsiaHex
const textFieldColor = 'black'
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


export type CanvasProps = {}

export type DesignType = {
  title: string,
  elements: DesignElementType[]
}

export enum DesignElementTypesEnum {
  ICON,
  TEXT
}


export type DesignElementType = {
  size?: { height: number, width: number },
  x?: number,
  y?: number,
  text?: string,
  fontSize?: number,
  fontFace?: FontFace,
  flickerOn?: boolean,
  flickerStyle?: 'PULSATE' | 'SUBTLE' | 'BASIC' | string,
  color?: 'green' | 'fuchsia' | 'yellow' | 'blue' | 'violet' | string
  layer?: number,
  type?: DesignElementTypesEnum
}

const INITIAL_DESIGN = {
  title: 'New Design',
  width: 250,
  height: 250,
  elements: []
}

const INITIAL_DESIGN_ELEMENT: DesignElementType = {
  fontSize: 4,
  x: 0,
  y: 0,
  size: {height: 250, width: 250},
  text: 'New Text',
  fontFace: allFontFaces[0],
  flickerStyle: 'PULSATE',
  flickerOn: true,
  color: 'green',
  layer: 0,
  type: DesignElementTypesEnum.TEXT
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

export enum MainMenuEnum {
  BACKGROUNDS,
  TEXT,
  ICONS,
  ELEMENTS,
  LAYERS,
  DESIGNS
}

const Canvas: FunctionComponent<CanvasProps> = (props) => {
  const classes = useStyles(NeonTheme)

  const [inProgressDesign, setInProgressDesign] = React.useState<DesignType>(INITIAL_DESIGN)
  const [menuChoice, setMenuChoice] = React.useState<MainMenuEnum>(MainMenuEnum.BACKGROUNDS)
  const [fontFace] = React.useState<FontFace>(fonts[0])
  const [fontSize] = React.useState<number>(4)
  const [color] = React.useState<string>('green')
  const [flickerStyle] = React.useState<string>('BASIC')
  const [text] = React.useState<string>('New Text')
  const [contextCanvasMenu, setCanvasContextMenu] = React.useState<any>(undefined)
  const [backgroundImage, setBackgroundImage] = React.useState<{ title: string, file: any } | null>(null)
  const [flickerOn] = React.useState<boolean>(true)
  const [selectedDesignElements, setSelectedDesignElements] = React.useState<number[]>([])
  const [maxLayer] = React.useState<number>(0)
  const [layers, setLayers] = React.useState<number[][]>([])
  const [savedDesigns, setSavedDesigns] = React.useState<DesignType[]>([])
  const [openContactUs, setOpenContactUs] = React.useState<boolean>(false)

  const setContextMenu = (menu: any) => {
    setCanvasContextMenu(menu)
  }

  const setDesignElement = (designElement: DesignElementType, index: number) => {
    const elements = [...inProgressDesign.elements].map((element, elementIndex) =>{
      if(index === elementIndex)
      {
        return designElement
      }
      return element
    })
    elements.concat(designElement)

    setInProgressDesign(state => ({
      ...state, elements
    }))
  }

  React.useEffect(() => {
    FirebaseFirestoreClient.getDesigns().then((savedDesigns: DesignType[]) => {
      console.log('Saved Designs Retrieved: ', savedDesigns)
      setSavedDesigns(savedDesigns)
    })
  }, [])


  // eslint-disable-next-line
  const getLayers = (designElements: DesignElementType[]) => {
    let newLayers = []

    for (let z = 0; z <= maxLayer; z++) {
      let thisLayerElementNumbers: number[] = []
      const thisLayerElements = designElements.filter((designElement: DesignElementType, index) => {
        console.log('layer', designElement.layer)
        if (designElement.layer === z) {
          thisLayerElementNumbers.push(index)
        }
        return designElement.layer === z
      })

      console.log('the organized by layer array: ', z, thisLayerElements)
      newLayers.push(thisLayerElementNumbers)
    }

    setLayers(newLayers)
  }

  React.useEffect(() => {
    getLayers(inProgressDesign.elements)
  }, [inProgressDesign.elements, inProgressDesign, getLayers])

  const addNewDesignElement = (designElement?: DesignElementType) => {
    const newDesignElement: DesignElementType = {
      size: {height: designElement?.size?.height ?? 250, width: designElement?.size?.width ?? 250},
      text: designElement?.text ?? text,
      fontSize: designElement?.fontSize ?? fontSize,
      fontFace: designElement?.fontFace ?? fontFace,
      flickerStyle: designElement?.flickerStyle ?? flickerStyle,
      flickerOn: designElement?.flickerOn ?? flickerOn,
      color: designElement?.color ?? color,
      layer: designElement?.layer ?? maxLayer,
      type: designElement?.type ?? DesignElementTypesEnum.TEXT,
      x: designElement?.x ?? 0,
      y: designElement?.x ?? 0
    }

    setInProgressDesign((state) => ({...state, elements: state.elements.concat(newDesignElement)}))
  }

  React.useEffect(() => {
    console.log('inprogress desig', inProgressDesign)
  }, [inProgressDesign])
  const location = useLocation()

  React.useEffect(() => {
    let title = ''

    switch (menuChoice) {
      case MainMenuEnum.BACKGROUNDS:
        title = 'NEON Backgrounds'
        break
      case MainMenuEnum.TEXT:
        title = 'NEON Text'
        break
      case MainMenuEnum.ICONS:
        title = 'NEON Icons'
        break
      case MainMenuEnum.ELEMENTS:
        title = 'NEON Elements'
        break
      case MainMenuEnum.LAYERS:
        title = 'NEON Layers'
        break
      case MainMenuEnum.DESIGNS:
        title = 'NEON Designs'
        break
      default:
        title = 'UNKNOWN TITLE'
    }

    document.title = `Neon Scene Creator | ${title}`

    FirebaseAnalyticsClient.analyticsPageView(location.pathname + '/' + title, title)
  }, [menuChoice, location.pathname, getLayers])

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setMenuChoice(newValue)
  }
  const negOne = -1

  const controls = useAnimation()

  const contactMe = () => {
    setOpenContactUs(true)
  }


  // @ts-ignore
  return (
    <Grid container alignItems="stretch">
      <AppBar position="fixed" className={classes.appBar}>
        <HeaderMenu design={inProgressDesign}/>
      </AppBar>
      <Grid item>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Grid container wrap="nowrap" style={{height: '100vh'}}>
            <Grid item>
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
                    <Grid item><MenuBook
                      style={{color: menuChoice === MainMenuEnum.BACKGROUNDS ? iconOnColor : iconColor}}
                      fontSize="large"/></Grid>
                    <Grid item><Typography
                      style={{color: menuChoice === MainMenuEnum.BACKGROUNDS ? iconOnColor : iconColor}}
                      variant="h6">Backgrounds</Typography></Grid>
                  </Grid>} {...a11yProps(MainMenuEnum.BACKGROUNDS)} />
                <Tab
                  label={<Grid container direction="column" alignItems="center">
                    <Grid item><TextFields style={{color: menuChoice === MainMenuEnum.TEXT ? iconOnColor : iconColor}}
                                           fontSize="large"/></Grid>
                    <Grid item><Typography style={{color: menuChoice === MainMenuEnum.TEXT ? iconOnColor : iconColor}}
                                           variant="h6">Text</Typography></Grid>
                  </Grid>} {...a11yProps(MainMenuEnum.TEXT)} />
                <Tab
                  label={<Grid container direction="column" alignItems="center">
                    <Grid item><Star style={{color: menuChoice === MainMenuEnum.ICONS ? iconOnColor : iconColor}}
                                     fontSize="large"/></Grid>
                    <Grid item><Typography style={{color: menuChoice === MainMenuEnum.ICONS ? iconOnColor : iconColor}}
                                           variant="h6">Icons</Typography></Grid>
                  </Grid>} {...a11yProps(MainMenuEnum.ICONS)} />
                <Tab
                  label={<Grid container direction="column" alignItems="center">
                    <Grid item><Dashboard
                      style={{color: menuChoice === MainMenuEnum.ELEMENTS ? iconOnColor : iconColor}}
                      fontSize="large"/></Grid>
                    <Grid item><Typography
                      style={{color: menuChoice === MainMenuEnum.ELEMENTS ? iconOnColor : iconColor}}
                      variant="h6">Elements</Typography></Grid>
                  </Grid>} {...a11yProps(MainMenuEnum.ELEMENTS)} />
                <Tab
                  label={<Grid container direction="column" alignItems="center">
                    <Grid item><Layers style={{color: menuChoice === MainMenuEnum.LAYERS ? iconOnColor : iconColor}}
                                       fontSize="large"/></Grid>
                    <Grid item><Typography style={{color: menuChoice === MainMenuEnum.LAYERS ? iconOnColor : iconColor}}
                                           variant="h6">Layers</Typography></Grid>
                  </Grid>} {...a11yProps(MainMenuEnum.LAYERS)} />
                <Tab
                  label={<Grid container direction="column" alignItems="center">
                    <Grid item><Bookmarks style={{color: menuChoice === MainMenuEnum.DESIGNS ? iconOnColor : iconColor}}
                                          fontSize="large"/></Grid>
                    <Grid item><Typography
                      style={{color: menuChoice === MainMenuEnum.DESIGNS ? iconOnColor : iconColor}}
                      variant="h6">Selected Designs</Typography></Grid>
                  </Grid>} {...a11yProps(MainMenuEnum.DESIGNS)} />
              </Tabs>
            </Grid>
            <Grid item style={{backgroundColor: selectedTabContentBg, flexGrow: 2, color: selectedTabContentColor}}>
              <Toolbar/>
              <TabPanel value={menuChoice} index={MainMenuEnum.BACKGROUNDS}>
                <Typography variant="h2" color="secondary" style={{textAlign: 'right'}}>Add Background</Typography>
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
                            <Typography variant="h2" color="textPrimary"
                                        style={{textAlign: 'center'}}>{background.title}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    })
                  }
                </Grid>
              </TabPanel>
              <TabPanel value={menuChoice} index={MainMenuEnum.TEXT}>
                <Grid item>
                  <Typography variant="h2" color="secondary" style={{textAlign: 'right'}}>New Text</Typography>
                </Grid>
                <Grid container>
                  <DesignElementContextMenu
                    designElement={INITIAL_DESIGN_ELEMENT}
                    addDesignElement={(designElement) => addNewDesignElement(designElement)}
                  />
                </Grid>
                <Grid container item xs={12}>
                  {
                    allFontFaces.map((fontFaceZ: any, index: number) => {
                      return <Grid item key={index} xs={6} style={{padding: NeonTheme.spacing(1, 1)}}>
                        <Card
                          style={{
                            backgroundColor: NeonTheme.palette.background.default,
                            padding: NeonTheme.spacing(2, 1)
                          }}>
                          <FontFaceSample fontFace={fontFaceZ}
                                          layer={maxLayer}
                                          addDesignElement={(design: DesignElementType) => addNewDesignElement(design)}/>
                        </Card>
                      </Grid>
                    })
                  }
                </Grid>
              </TabPanel>
              <TabPanel value={menuChoice} index={MainMenuEnum.ICONS}>
                <Typography variant="h2" color="secondary" style={{textAlign: 'right'}}>Icons</Typography>
                <Grid container item xs={12}>
                  {
                    iconFonts.map((iconFont: any, index: number) => {
                      return <Grid item key={index} xs={6} style={{padding: NeonTheme.spacing(1, 1)}}>
                        <Card style={{
                          backgroundColor: NeonTheme.palette.background.default,
                          padding: NeonTheme.spacing(2, 1)
                        }}>
                          <FontSample fontFace={iconFont}
                                      layer={maxLayer}
                                      addDesignElement={(design: DesignElementType) => addNewDesignElement(design)}/>
                        </Card>
                      </Grid>
                    })
                  }
                </Grid>
              </TabPanel>
              <TabPanel value={menuChoice} index={MainMenuEnum.ELEMENTS}>
                <Typography variant="h2" color="secondary" style={{textAlign: 'right'}}>Display Elements</Typography>
                <Grid item container spacing={1}>
                  {
                    inProgressDesign.elements.map && inProgressDesign.elements.map((designElement: DesignElementType, index: number) => {
                      return <Grid item key={index} xs={12} style={{padding: NeonTheme.spacing(1, 1)}}>
                        <Card onClick={() => {
                          setSelectedDesignElements([index])
                        }} style={{
                          backgroundColor: !selectedDesignElements.includes(index) ? NeonTheme.palette.background.default : NeonTheme.palette.primary.main,
                          padding: NeonTheme.spacing(2, 1)
                        }}>
                          <Typography variant="h6"
                                      color={selectedDesignElements.includes(index) ? 'secondary' : 'textPrimary'}>{designElement.text}</Typography>
                        </Card>
                      </Grid>
                    })
                  }
                </Grid>
              </TabPanel>
              <TabPanel value={menuChoice} index={MainMenuEnum.LAYERS}>
                <Typography variant="h2" color="secondary" style={{textAlign: 'right'}}>Layers</Typography>
                <Grid item container spacing={1}>
                  {
                    layers.map((layer: number[], layerIndex) => {
                      return <Grid key={layerIndex} container item>
                        <Card
                          style={{
                            backgroundColor: NeonTheme.palette.background.default,
                            maxWidth: '380px',
                            padding: NeonTheme.spacing(0, 3)
                          }}>
                          <Grid container>
                            <Grid item xs={2}>
                              <Button onClick={
                                () => {
                                  console.log('the layers to add', layer, selectedDesignElements)
                                  setSelectedDesignElements([...layer])
                                  // setDesignElement(inProgressDesign.elements[layer[0]], layer[0])
                                }
                              }><Typography variant="h1" color="secondary">{layerIndex}:</Typography></Button>
                            </Grid>
                            <Grid container item xs={10} wrap="nowrap" alignItems="center" spacing={1}
                                  style={{overflowX: 'scroll'}}>
                              {
                                layer.map((designElementIndex: number, index, des) => {
                                  console.log('all elements in this cycle', designElementIndex, index, des)
                                  return <Grid
                                    key={index}
                                    item
                                    container
                                    justifyContent="center"
                                    alignItems="center">
                                    <Button
                                      color={selectedDesignElements.includes(designElementIndex) ? 'secondary' : undefined}
                                      onClick={() => {
                                        setSelectedDesignElements([designElementIndex])
                                      }}
                                      style={{
                                        border: selectedDesignElements.includes(designElementIndex) ? '1px solid ' + NeonTheme.palette.secondary.main : '1px solid white',
                                        width: 50,
                                        borderRadius: 0,
                                        height: 50
                                      }}
                                      variant="outlined">
                                      {
                                        inProgressDesign.elements[designElementIndex]?.type === DesignElementTypesEnum.TEXT ?
                                          <TextFields/> : <Star/>
                                      }
                                    </Button>
                                  </Grid>
                                })
                              }
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                    })
                  }
                </Grid>
              </TabPanel>
              <TabPanel value={menuChoice} index={MainMenuEnum.DESIGNS}>
                <Typography variant="h2" color="secondary" style={{textAlign: 'right'}}>Designs</Typography>
                <Grid item container spacing={1}>
                  {
                    savedDesigns.map((savedDesign: DesignType, savedDesignIndex) => {
                      return <Grid key={savedDesignIndex} container xs={6} item>
                        <Card
                          onClick={
                            () => {
                              setInProgressDesign(savedDesign)
                            }
                          }
                          style={{
                            backgroundColor: NeonTheme.palette.background.default,
                            maxWidth: '200px',
                            maxHeight: '200px',
                            padding: NeonTheme.spacing(0, 3)
                          }}>
                          <CardContent>
                            <Grid container>
                              <Grid item xs={2}>
                                {
                                  savedDesign.elements.map((element, elementIndex) => {
                                    return <div>{element.type === DesignElementTypesEnum.TEXT ? <TextFields/> :
                                      <Star/>}</div>
                                  })
                                }
                              </Grid>
                            </Grid>
                          </CardContent>
                          <CardActions color="secondary">
                            <Button>{savedDesign.title}</Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    })
                  }
                </Grid>
              </TabPanel>
            </Grid>
          </Grid>
        </Drawer>
      </Grid>
      <Grid container item style={{height: '100vh', overflowY: 'hidden'}}>
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
                    // height: `calc(100vh - ${rulerWidth}px)`,
                    backgroundColor: 'black'
                  }}>
                  <Design
                    setDesignElement={setDesignElement}
                    selectedDesignElements={selectedDesignElements}
                    background={backgroundImage}
                    design={inProgressDesign}
                    setContextMenu={setContextMenu}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </Grid>
      <Grid container wrap="nowrap" item style={{position: 'fixed', bottom: 12, left: 32, zIndex: 9999, width: '200px'}}
            onMouseOver={() => controls.start('visible')}
            onMouseLeave={() => controls.start('hidden')} onClick={() => {
        contactMe()
      }}>
        <Grid item>
          <motion.div
            initial={'hidden'}
            animate={controls}
            variants={{
              // eslint-disable-next-line
              ['visible']: {scale: 2.5, marginLeft: '-60px'},
              // eslint-disable-next-line
              ['hidden']: {scale: 2, marginLeft: '-20px'}
            }}
          >
            <img alt="speech bubble" src={contactMeBubble} style={{marginLeft: '50px', width: '100px', height: '100px'}}/>
          </motion.div>
        </Grid>
        <Grid item>
          <motion.div
            initial={'hidden'}
            animate={controls}
            variants={{
              // eslint-disable-next-line
              ['visible']: {opacity: 1, scale: 1.5, marginLeft: '40px'},
              // eslint-disable-next-line
              ['hidden']: {opacity: 0, scale: 0}
            }}
            // onHoverStart={() => controls.start('visible')}
            // onHoverEnd={() => controls.start('hidden')}
          >
            <img alt="bullhorn" src={bullhorn} style={{marginLeft: '-96px', width: '100px', height: '100px'}}
            />
          </motion.div>
        </Grid>


      </Grid>

      <Modal
        open={openContactUs}
      >
        <Grid container style={{width: '100vw', height: '100vh', backgroundColor: '#1F1F1F', overflowY:"scroll"}}>
          <Grid item container justifyContent="flex-end"><Close fontSize="large" onClick={()=>{
            setOpenContactUs(false)
            document.title = "NEON SCENE CREATOR | Contact Us"
            FirebaseAnalyticsClient.analyticsPageView('/contactUs', document.title)
          }} style={{marginTop: "24px", marginRight: "24px"}}/></Grid>
        <ContactUs sanity={"tmanundercover"} github={"tmanundercover"} address={"Los Angeles, CA 91402"} email={"hello@TheHandsomestNerd.com"} phone={"000.000.0000"} facebook={"kamikazenupe1911"} twitter={"kamikazethez"} linkedIn={"terrell-singleton-5657918"} instagram={"thehandsomestnerd"}/>
        </Grid>
      </Modal>
    </Grid>
  )
}

export default Canvas