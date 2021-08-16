import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {AppBar, Box, Button, Card, CardContent, Drawer, Grid, Tab, Tabs, Toolbar, Typography} from '@material-ui/core'
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
import {Dashboard, Layers, MenuBook, Star, TextFields} from '@material-ui/icons'
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


export type CanvasProps = {}

export type DesignType = {
  title: string,
  width: number,
  height: number,
  elements: DesignElementType[]
}

export enum DesignElementTypesEnum {
  ICON,
  TEXT
}


export type DesignElementType = {
  size: { height: number, width: number },
  text: string,
  fontSize: number,
  fontFace: FontFace,
  flickerOn: boolean,
  flickerStyle: 'PULSATE' | 'SUBTLE' | 'BASIC' | string,
  color: 'green' | 'fuchsia' | 'yellow' | 'blue' | 'violet' | string
  layer: number,
  type: DesignElementTypesEnum
}

const INITIAL_DESIGN = {
  title: 'New Design',
  width: 250,
  height: 250,
  elements: []
}

const INITIAL_DESIGN_ELEMENT: DesignElementType = {
  fontSize: 4,
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
  const [selectedDesignElements, setSelectedDesignElements] = React.useState<number[]>([])
  const [maxLayer, setMaxLayer] = React.useState<number>(0)
  const [layers, setLayers] = React.useState<number[][]>([])

  const setContextMenu = (menu: any) => {
    setCanvasContextMenu(menu)
  }

  const setDesignElement = (designElement: DesignElementType, index: number) => {
    setInProgressDesign(state => ({
      ...state,
      elements: {
        ...state.elements,
        [index]: designElement
      }
    }))
  }

  React.useEffect(() => {
    getLayers(inProgressDesign.elements)
  }, [inProgressDesign.elements, inProgressDesign])

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

  const addNewDesignElement = (designElement?: DesignElementType) => {
    const newDesignElement: DesignElementType = {
      size: {height: designElement?.size.height ?? 250, width: designElement?.size.width ?? 250},
      text: designElement?.text ?? text,
      fontSize: designElement?.fontSize ?? fontSize,
      fontFace: designElement?.fontFace ?? fontFace,
      flickerStyle: designElement?.flickerStyle ?? flickerStyle,
      flickerOn: designElement?.flickerOn ?? flickerOn,
      color: designElement?.color ?? color,
      layer: designElement?.layer ?? maxLayer,
      type: designElement?.type ?? DesignElementTypesEnum.TEXT
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
                    <Grid item><Dashboard style={{color: menuChoice === 3 ? iconOnColor : iconColor}}
                                          fontSize="large"/></Grid>
                    <Grid item><Typography style={{color: menuChoice === 3 ? iconOnColor : iconColor}}
                                           variant="h6">Elements</Typography></Grid>
                  </Grid>} {...a11yProps(3)} />
                <Tab
                  label={<Grid container direction="column" alignItems="center">
                    <Grid item><Layers style={{color: menuChoice === 4 ? iconOnColor : iconColor}}
                                       fontSize="large"/></Grid>
                    <Grid item><Typography style={{color: menuChoice === 4 ? iconOnColor : iconColor}}
                                           variant="h6">Layers</Typography></Grid>
                  </Grid>} {...a11yProps(4)} />
              </Tabs>
            </Grid>
            <Grid item style={{backgroundColor: selectedTabContentBg, flexGrow: 2, color: selectedTabContentColor}}>
              <Toolbar/>
              <TabPanel value={menuChoice} index={0}>
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
              <TabPanel value={menuChoice} index={1}>
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
              <TabPanel value={menuChoice} index={2}>
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
              <TabPanel value={menuChoice} index={3}>
                <Typography variant="h2" color="secondary" style={{textAlign: 'right'}}>Display Elements</Typography>
                <Grid item container spacing={1}>
                  {
                    inProgressDesign.elements.map((designElement: DesignElementType, index: number) => {
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
              <TabPanel value={menuChoice} index={4}>
                <Typography variant="h2" color="secondary" style={{textAlign: 'right'}}>Layers</Typography>
                <Grid item container spacing={1}>
                  {
                    layers.map((layer: number[], layerIndex) => {
                      return <Grid container item>
                        <Card
                          style={{
                            backgroundColor: NeonTheme.palette.background.default,
                            width: "100%",
                            padding: NeonTheme.spacing(0, 3)
                          }}>
                          <Grid container>
                            <Grid item xs={2}>
                              <Button  onClick={
                                () => {
                                  console.log('the layers to add', layer, selectedDesignElements)
                                  setSelectedDesignElements([...layer])
                                  // setDesignElement(inProgressDesign.elements[layer[0]], layer[0])
                                }
                              }><Typography variant="h1" color="secondary">{layerIndex}:</Typography></Button>
                            </Grid>
                            <Grid container item xs={10} wrap="nowrap" alignItems="center" spacing={1}>
                              {
                                layer.map((designElementIndex: number, index, des) => {
                                  console.log('all elements in this cycle', designElementIndex, index, des)
                                  return <Grid

                                    item
                                    container
                                    justifyContent="center"
                                    alignItems="center">
                                    <Button color={selectedDesignElements.includes(designElementIndex)?"secondary":undefined} onClick={() => {
                                      setSelectedDesignElements([designElementIndex])
                                    }}
                                            style={{border: selectedDesignElements.includes(designElementIndex)?'1px solid '+ NeonTheme.palette.secondary.main:'1px solid white', width: 50, height: 50}}
                                            variant="outlined">{inProgressDesign.elements[designElementIndex].type === DesignElementTypesEnum.TEXT ?
                                      <TextFields/> : <Star/>}</Button></Grid>
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
    </Grid>
  )
}

export default Canvas