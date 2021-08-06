import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Grid, Input, MenuItem, Select, TextField, Typography} from '@material-ui/core'
import NeonTheme, {
  designerBold,
  designerRegular, KlaxonsFontFace, NeonAquaHex, NeonBlueHex, NeonElectricVioletHex, NeoNeonFontFace,
  NeonFontFace,
  NeonFuchsiaHex,
  NeonGreenHex,
  NeonYellowRoseBlueHex
} from '../../theme/Theme'

export const useStyles = makeStyles((theme: Theme) => ({
  designInfoContainer: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    maxHeight: '2.0em',
    overflowX: 'scroll',
    width: '500px'
  },
  textField: {
    color: theme.palette.text.secondary,
    marginTop: '2px',
    height: '12px',
    width: '24px'
  },
  control: {
    color: theme.palette.text.secondary,
    height: '10px'
  },
}))



export type DesignElementProps = {
  width: number,
  height: number,
  inProgress?: boolean
}

const fonts: { [key: string]: any } = {
  'NEON': NeonFontFace,
  'NEONEON': NeoNeonFontFace,
  'KLAXONS': KlaxonsFontFace
}



const DesignElement: FunctionComponent<DesignElementProps> = (props) => {

  let classes = useStyles(NeonTheme)

  const colors: { [key: string]: string } = {
    'fuchsia': NeonFuchsiaHex,
    'green': NeonGreenHex,
    'yellow': NeonYellowRoseBlueHex,
    'aqua': NeonAquaHex,
    'purple': NeonElectricVioletHex,
    'blue': NeonBlueHex
  }

  const [size, setSize] = React.useState<{ height: number, width: number }>({height: props.height, width: props.width})
  const [text] = React.useState<string>('New Text')
  const [fontFace, setFontFace] = React.useState<string>('NEON')
  const [fontSize, setFontSize] = React.useState<number>(8)
  const [flickerStyle, setFlickerStyle] = React.useState<string>('BASIC')
  const [color,setColor] = React.useState<string>('green')

  const useBasicFlickerStyles = makeStyles((theme: Theme) => ({
    neonText: {
      animation: `$flicker 3000ms infinite alternate`
    },
    '@keyframes flicker': {
      '0%': {
        textShadow: `0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px ${color}, 0 0 82px ${color}, 0 0 92px ${color}, 0 0 102px ${color}, 0 0 151px ${color}`
      },
      '18%': {
        textShadow: `0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px ${color}, 0 0 82px ${color}, 0 0 92px ${color}, 0 0 102px ${color}, 0 0 151px ${color}`
      },
      '20%': {
        textShadow: 'none'
      },
      '22%': {
        textShadow: `0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px ${color}, 0 0 82px ${color}, 0 0 92px ${color}, 0 0 102px ${color}, 0 0 151px ${color}`
      },
      '24%': {
        textShadow: 'none'
      },
      '25%': {
        textShadow: `0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px ${color}, 0 0 82px ${color}, 0 0 92px ${color}, 0 0 102px ${color}, 0 0 151px ${color}`
      },
      '53%': {
        textShadow: `0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px ${color}, 0 0 82px ${color}, 0 0 92px ${color}, 0 0 102px ${color}, 0 0 151px ${color}`
      },
      '55%': {
        textShadow: 'none'
      },
      '57%': {
        textShadow: `0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px ${color}, 0 0 82px ${color}, 0 0 92px ${color}, 0 0 102px ${color}, 0 0 151px ${color}`
      },
      '100%': {
        textShadow: `0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px ${color}, 0 0 82px ${color}, 0 0 92px ${color}, 0 0 102px ${color}, 0 0 151px ${color}`
      }
    }
  }))

  const useSubtleFlickerStyles = makeStyles((theme: Theme) => ({
    neonText: {
      animation: `$pulsate 0.11s ease-in-out infinite alternate`
    },
    '@keyframes pulsate': {
      '100%': {
        textShadow: `0 0 4px #fff, 0 0 11px #fff,0 0 19px #fff,0 0 40px ${color},0 0 80px ${color},0 0 90px ${color},0 0 100px ${color},0 0 150px ${color}`
      },
      '0%': {
        textShadow: `0 0 4px #fff, 0 0 10px #fff,0 0 18px #fff,0 0 38px ${color},0 0 73px ${color},0 0 80px ${color},0 0 94px ${color},0 0 140px ${color}`
      }
    }
  }))

  const usePulsateStyles = makeStyles((theme: Theme) => ({
    neonText: {
      animation: `$pulsate 2.5s infinite alternate`,
    },
    '@keyframes pulsate': {
      '100%': {
        textShadow: `0 0 4px #fff, 0 0 11px #fff,0 0 19px #fff,0 0 40px ${color},0 0 80px ${color},0 0 90px ${color},0 0 100px ${color},0 0 150px ${color}`
      },
      '0%': {
        textShadow: `0 0 2px #fff, 0 0 4px #fff,0 0 6px #fff,0 0 10px ${color},0 0 45px ${color},0 0 55px ${color},0 0 70px ${color},0 0 80px ${color}`
      }
    }
  }))

  const flickers: { [key: string]: any } = {
    'BASIC': useBasicFlickerStyles(NeonTheme),
    'PULSATE': usePulsateStyles(NeonTheme),
    'SUBTLE': useSubtleFlickerStyles(NeonTheme)
  }
  return (
    <Grid container>
      <Grid item container direction="column" className={classes.designInfoContainer}>
        <Grid  item>
          <Grid container item wrap="nowrap" alignItems="center" justifyContent="center" spacing={1}>
            <Grid item>
              <Typography variant="caption">Width:</Typography>
            </Grid>
            <Grid item>
              <TextField
                color="secondary"
                inputProps={{className: classes.textField}}
                value={size.width}
                onChange={(event) => setSize((state) => ({...state, width: parseInt(event.target.value)}))}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container item wrap="nowrap" alignItems="center" justifyContent="center" spacing={1}>
            <Grid item>
              <Typography variant="caption">Height:</Typography>
            </Grid>
            <Grid item>
              <TextField
                color="secondary"
                inputProps={{className: classes.textField}}
                value={size.height}
                onChange={(event) => setSize((state) => ({...state, height: parseInt(event.target.value)}))}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={4} wrap="nowrap">
          <Grid container item wrap="nowrap" alignItems="center" justifyContent="center" spacing={1}>
            <Grid item>
              <Typography variant="caption">Font:</Typography>
            </Grid>
            <Grid item>
              <Select
                color="secondary"
                value={fontFace}
                input={<Input margin="dense"/>}
                inputProps={{className: classes.textField}}
                onChange={(e) => setFontFace(e.target.value as string)}
              >
                {
                  Object.keys(fonts).map((fontKey, index) => {
                    return <MenuItem key={index} value={fontKey}><Typography
                      color="textSecondary">{fontKey}</Typography></MenuItem>
                  })
                }
              </Select>
            </Grid>
          </Grid>
          <Grid container item wrap="nowrap" alignItems="center" justifyContent="center" spacing={1}>
            <Grid item>
              <Typography variant="caption">FontSize:</Typography>
            </Grid>
            <Grid item>
              <Select
                color="secondary"
                value={fontSize}
                input={<Input margin="dense"/>}
                inputProps={{className: classes.textField}}
                onChange={(e) => setFontSize(e.target.value as number)}
              >
                {
                  [1, 2, 3, 4, 5, 6, 7, 8].map((fontSize, index) => {
                    return <MenuItem key={index} value={fontSize}><Typography
                      color="textSecondary">{fontSize}</Typography></MenuItem>
                  })
                }
              </Select>
            </Grid>
          </Grid>
          <Grid container item wrap="nowrap" alignItems="center" justifyContent="center" spacing={1}>
            <Grid item>
              <Typography variant="caption">Flicker:</Typography>
            </Grid>
            <Grid item>
              <Select
                color="secondary"
                value={flickerStyle}
                input={<Input margin="dense"/>}
                inputProps={{className: classes.textField}}
                onChange={(e) => setFlickerStyle(e.target.value as string)}
              >
                {
                  Object.keys(flickers).map((flickerKey, index) => {
                    return <MenuItem key={index} value={flickerKey}><Typography
                      color="textSecondary">{flickerKey}</Typography></MenuItem>
                  })
                }
              </Select>
            </Grid>
          </Grid>
          <Grid container item wrap="nowrap" alignItems="center" justifyContent="center" spacing={1}>
            <Grid item>
              <Typography variant="caption">Color:</Typography>
            </Grid>
            <Grid item>
              <Select
                color="secondary"
                value={color}
                input={<Input margin="dense"/>}
                inputProps={{className: classes.textField}}
                onChange={(e) => setColor(e.target.value as string)}
              >
                {
                  Object.keys(colors).map((colorKey, index) => {
                    return <MenuItem key={index} value={colorKey}><Grid item style={{width: 24, height: 24, backgroundColor: colors[colorKey]}}></Grid></MenuItem>
                  })
                }
              </Select>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid
          container
          item
          // className={clsx(classes.animatedItem)}
          style={{
            height: size.height,
            width: size.width
          }}>
          <Typography className={flickers[flickerStyle].neonText}
                      style={{...fonts[fontFace], fontSize: `${fontSize * 12}px`}}>{text}</Typography>
        </Grid>
      </Grid>


    </Grid>
  )
}

export default DesignElement