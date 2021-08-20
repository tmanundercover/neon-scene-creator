import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import NeonTheme, {allFontFaces, FontFace, getFontFace, NeonFuchsiaHex, theFontsString} from '../../theme/Theme'
import {colors, DesignElementType, DesignElementTypesEnum} from '../Canvas'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core'


export const useStyles = makeStyles<Theme, DesignElementContextMenuProps>((theme) => ({
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

export type DesignElementContextMenuProps = {
  designElement?: DesignElementType
  setDesignElement?(element: DesignElementType): any
  addDesignElement?(element: DesignElementType): any
  color?: string
}

const DesignElementContextMenu: FunctionComponent<DesignElementContextMenuProps> = (props) => {
  const classes = useStyles(props)

  const [height, setHeight] = React.useState<number>(props.designElement?.size.height ?? 250)
  const [width, setWidth] = React.useState<number>(props.designElement?.size.width ?? 250)
  const [text, setText] = React.useState<string>(props.designElement?.text ?? 'New Text')
  const [fontFace, setFontFace] = React.useState<FontFace>(props.designElement?.fontFace ?? allFontFaces[0])
  const [fontSize, setFontSize] = React.useState<number>(4)
  const [flickerStyle, setFlickerStyle] = React.useState<string>(props.designElement?.flickerStyle ?? 'pulsate')
  const [color, setColor] = React.useState<string>(props.designElement?.color ?? 'green')
  const [flickerOn, setFlickerOn] = React.useState<boolean>(props.designElement?.flickerOn ?? true)
  const [layer, setLayer] = React.useState<number>(props.designElement?.layer ?? 0)

  React.useEffect(() => {
    const designElement: DesignElementType = {
      size: {width: width, height: height},
      text: text,
      fontFace: fontFace,
      flickerStyle: flickerStyle,
      color: color,
      flickerOn: flickerOn,
      fontSize: fontSize,
      layer: layer,
      type: DesignElementTypesEnum.TEXT,
      x: props.designElement?.x ?? 0,
      y: props.designElement?.y ?? 0
    }

    if (props.setDesignElement) {
      props.setDesignElement(designElement)
    }
  }, [width, height, text, fontFace, flickerStyle, color, fontSize, flickerOn])

  React.useEffect(() => {
    const designElement = {
      size: {width: props.designElement?.size.width ?? 250, height: props.designElement?.size.height ?? 250},
      text: props.designElement?.text ?? '',
      fontFace: props.designElement?.fontFace ?? allFontFaces[0],
      flickerStyle: props.designElement?.flickerStyle ?? 'PULSATE',
      color: props.designElement?.color ?? 'green',
      flickerOn: props.designElement?.flickerOn ?? true,
      fontSize: props.designElement?.fontSize ?? 4,
      layer: props.designElement?.layer ?? 0,
      type: props.designElement?.type ?? DesignElementTypesEnum.TEXT,
      x: props.designElement?.x ?? 0,
      y: props.designElement?.y ?? 0
    }

    if (props.setDesignElement) {
      props.setDesignElement(designElement)
    }
  }, [props])

  return (<Toolbar style={{width: '100%'}}>
      <Card style={{backgroundColor: NeonTheme.palette.background.default, margin: NeonTheme.spacing(0, -2, 0)}}>
        <CardContent>
          <Grid container item alignItems="flex-end" justifyContent="space-between" xs={12}>
            <Grid item>
              <Grid container item alignItems="flex-end" justifyContent="center" spacing={1}>
                <Grid item container>
                  <FormControl>
                    {/*<InputLabel id="demo-simple-select-helper-label"><Typography variant="h3">Text:</Typography></InputLabel>*/}
                    <TextField
                      label={<Typography variant="h3" color="secondary">Width:</Typography>}
                      inputProps={{className: classes.textField}}
                      style={{width: '50px'}}
                      value={width}
                      type="number"
                      onChange={(event) => setWidth(parseInt(event.target.value))}
                      color="secondary"/>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item><Grid item>
              <Grid container item alignItems="center" justifyContent="center" spacing={1}>
                <Grid item container>
                  <FormControl>
                    {/*<InputLabel id="demo-simple-select-helper-label"><Typography variant="h3">Text:</Typography></InputLabel>*/}
                    <TextField
                      label={<Typography variant="h3" color="secondary">Height:</Typography>}
                      inputProps={{className: classes.textField}}
                      style={{width: '50px'}}
                      type="number"
                      value={height}
                      onChange={(event) => setHeight(parseInt(event.target.value))}
                      color="secondary"/>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid></Grid>

            <Grid item>
              <Grid container item alignItems="center" justifyContent="center" spacing={1}>
                <Grid item container>
                  <FormControl fullWidth>
                    {/*<InputLabel id="demo-simple-select-helper-label"><Typography variant="h3">Text:</Typography></InputLabel>*/}
                    <TextField
                      fullWidth
                      label={<Typography variant="h3" color="secondary">Text:</Typography>}
                      inputProps={{className: classes.textField}}
                      value={text}
                      onChange={(event) => setText(event.target.value)}
                      color="secondary"/>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container>
                <FormControl fullWidth>
                  <InputLabel>
                    <Typography
                      variant="h3"
                      color="secondary">Font:</Typography>
                  </InputLabel>
                  <Select
                    fullWidth
                    color="secondary"
                    value={fontFace.fontFamily}
                    inputProps={{className: classes.textField}}
                    MenuProps={{classes: {paper: classes.menuPaper}}}
                    onChange={(e) => setFontFace(getFontFace(e.target.value as string))}
                  >
                    {
                      theFontsString.map((fontKey: string, index) => {
                        return <MenuItem key={index} value={fontKey}><Typography variant="h6"
                        >{fontKey}</Typography></MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item><Grid container item wrap="nowrap" alignItems="center" justifyContent="center" spacing={1}>
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
            </Grid></Grid>
            <Grid item><Grid container item wrap="nowrap" alignItems="center" justifyContent="center" spacing={1}>
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
            </Grid></Grid>
            <Grid item><Grid container item wrap="nowrap" alignItems="center" justifyContent="center" spacing={1}>
              <Grid item container>
                <FormControl fullWidth style={{transform: 'rotate(270deg)'}}>
                  <Switch
                    checked={flickerOn}
                    onChange={(e) => setFlickerOn(!flickerOn)}
                    color="secondary"
                    name="flickerOn"
                  />
                </FormControl>
              </Grid>
              <Grid item container>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label"><Typography variant="h3"
                                                                               color="secondary">Flicker:</Typography></InputLabel>

                  <Select
                    disabled={!flickerOn}
                    fullWidth
                    color="secondary"
                    value={flickerStyle}
                    MenuProps={{classes: {paper: classes.menuPaper}}}
                    inputProps={{className: classes.textField}}
                    onChange={(e) => setFlickerStyle(e.target.value as string)}
                  >
                    {
                      ['BASIC', 'PULSATE', 'SUBTLE'].map((flickerKey, index) => {
                        return <MenuItem key={index} value={flickerKey} disabled={!flickerOn}><Typography
                          variant="h6" aria-disabled={!flickerOn}>{flickerKey}</Typography></MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid></Grid>


          </Grid>
        </CardContent>
        {
          props.addDesignElement && <CardActions
            style={{width: '100%', margin: NeonTheme.spacing(0, 0, 0, 0), backgroundColor: NeonFuchsiaHex}}><Grid
            container item>
            <Grid
              container
              item
              wrap="nowrap"
              alignItems="center"
              justifyContent="center">
              <Button
                style={{width: '100%', height: '100%'}}
                onClick={() => props.addDesignElement && props.addDesignElement({
                  size: {width: width, height: height},
                  text: text,
                  fontFace: fontFace,
                  flickerStyle: flickerStyle,
                  color: color,
                  flickerOn: flickerOn,
                  fontSize: fontSize,
                  layer: layer,
                  type: DesignElementTypesEnum.TEXT,
                  x: props.designElement?.x ?? 0,
                  y: props.designElement?.y ?? 0,
                })}>
                <Typography variant="button">
                  Add New Text</Typography>
              </Button>
            </Grid>
          </Grid>
          </CardActions>
        }
      </Card>
    </Toolbar>
  )
}

export default DesignElementContextMenu