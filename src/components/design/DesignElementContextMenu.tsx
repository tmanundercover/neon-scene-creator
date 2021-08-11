import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import NeonTheme, {fonts} from '../../theme/Theme'
import {colors, DesignElementType} from '../Canvas'
import {
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

export const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    // color: theme.palette.text.secondary,
    marginTop: '2px',
    height: '12px',
    ...fonts['Margot']
  },
  menuPaper: {
    backgroundColor: theme.palette.background.default,
    border: '1px solid #FAFAFA'
  }
}))

export type DesignElementContextMenuProps = DesignElementType & {
  setDesignElement(element: DesignElementType): any
}

const DesignElementContextMenu: FunctionComponent<DesignElementContextMenuProps> = (props) => {
  const classes = useStyles(NeonTheme)

  const [height, setHeight] = React.useState<number>(props.size.height ?? 250)
  const [width, setWidth] = React.useState<number>(props.size.width ?? 250)
  const [text, setText] = React.useState<string>(props.text ?? 'New Text')
  const [fontFace, setFontFace] = React.useState<string>(props.fontFace ?? 'Barbaro')
  const [fontSize, setFontSize] = React.useState<number>(4)
  const [flickerStyle, setFlickerStyle] = React.useState<string>(props.flickerStyle ?? 'pulsate')
  const [color, setColor] = React.useState<string>(props.color ?? 'green')
  const [flickerOn, setFlickerOn] = React.useState<boolean>(props.flickerOn ?? true)

  React.useEffect(() => {
    const designElement = {
      size: {width: width, height: height},
      text: text,
      fontFace: fontFace,
      flickerStyle: flickerStyle,
      color: color,
      flickerOn: flickerOn,
      fontSize: fontSize
    }

    props.setDesignElement(designElement)
  }, [width, height, text, fontFace, flickerStyle, color, fontSize, flickerOn])

  React.useEffect(() => {
    const designElement = {
      size: {width: props.size.width, height: props.size.height},
      text: props.text,
      fontFace: props.fontFace,
      flickerStyle: props.flickerStyle,
      color: props.color,
      flickerOn: flickerOn,
      fontSize: props.fontSize
    }

    props.setDesignElement(designElement)
  }, [props])

  return (<Toolbar style={{width: '100%'}}>
      <Grid container alignItems="flex-end" justifyContent="space-between" spacing={3}>
        <Grid item>
          <Grid container item alignItems="flex-end" justifyContent="center" spacing={1}>
            <Grid item container>
              <FormControl fullWidth>
                {/*<InputLabel id="demo-simple-select-helper-label"><Typography variant="h3">Text:</Typography></InputLabel>*/}
                <TextField
                  fullWidth
                  label={<Typography variant="h3" color="secondary">Width:</Typography>}
                  inputProps={{className: classes.textField}}
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
              <FormControl fullWidth>
                {/*<InputLabel id="demo-simple-select-helper-label"><Typography variant="h3">Text:</Typography></InputLabel>*/}
                <TextField
                  fullWidth
                  label={<Typography variant="h3" color="secondary">Height:</Typography>}
                  inputProps={{className: classes.textField}}
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label"><Typography variant="h3"
                                                                           color="secondary">Flicker:</Typography></InputLabel>

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
                onChange={(e)=> setFlickerOn(!flickerOn)}
                color="secondary"
                name="flickerOn"
              />
            </FormControl>
          </Grid>
        </Grid></Grid>


      </Grid>
      {/*<IconButton edge="start" color="inherit" aria-label="menu">*/}
      {/*  <MenuIcon/>*/}
      {/*</IconButton>*/}

      {/*<Button color="inherit">Login</Button>*/}
    </Toolbar>
  )
}

export default DesignElementContextMenu