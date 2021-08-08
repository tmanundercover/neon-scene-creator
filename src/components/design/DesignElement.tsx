import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField, Toolbar, Typography} from '@material-ui/core'
import NeonTheme from '../../theme/Theme'
import {motion, useAnimation} from 'framer-motion'
import {colors, DesignElementType, fonts} from '../Canvas'
import DesignElementContextMenu from './DesignElementContextMenu'

const FONT_MULTIPLIER = 20

export const useStyles = makeStyles((theme: Theme) => ({
  designInfoContainer: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    maxHeight: '2.0em',
    overflowX: 'scroll'
  },
  textField: {
    color: theme.palette.text.secondary,
    marginTop: '2px',
    height: '12px'
  },
  control: {
    color: theme.palette.text.secondary,
    height: '10px'
  },
  menuPaper: {
    backgroundColor: theme.palette.background.default,
    border: '1px solid #FAFAFA'
  }
}))


export type DesignElementProps = {
  design?: DesignElementType,
  inProgress?: boolean,
  setContextMenu(menu: any, setDesignElement:any):any
}

// export const fonts: { [key: string]: any } = {
//   'NEON': NeonFontFace,
//   'NEONEON': NeoNeonFontFace,
//   'KLAXONS': KlaxonsFontFace,
//   'SORTDESCAI': SortDecaiCursiveFontFace
// }
//
// export const colors: { [key: string]: string } = {
//   'fuchsia': NeonFuchsiaHex,
//   'green': NeonGreenHex,
//   'yellow': NeonYellowRoseBlueHex,
//   'aqua': NeonAquaHex,
//   'purple': NeonElectricVioletHex,
//   'blue': NeonBlueHex
// }

export type FlickerKeyType = 'BASIC' | 'PULSATE' | 'SUBTLE' | string

const DesignElement: FunctionComponent<DesignElementProps> = (props) => {

  let classes = useStyles(NeonTheme)
  const controls = useAnimation()
  controls.start('normal')

  const setContextMenu = (menu:any) =>{
    props.setContextMenu(menu, setDesignElement)
  }

  const [height,setHeight] = React.useState<number>(props.design?.size.height ?? 250)
  const [width,setWidth] = React.useState<number>(props.design?.size.width ?? 250)
  const [text, setText] = React.useState<string>(props.design?.text ?? 'New Text')
  const [fontFace, setFontFace] = React.useState<string>(props.design?.fontFace ?? 'NEON')
  const [fontSize, setFontSize] = React.useState<number>(4)
  const [flickerStyle, setFlickerStyle] = React.useState<string>(props.design?.flickerStyle ?? 'pulsate')
  const [color, setColor] = React.useState<string>(props.design?.color ?? 'green')

  const setDesignElement =(designElement: DesignElementType)=>{
    setHeight(designElement.size.height)
    setWidth(designElement.size.width)
    setText(designElement.text)
    setFontFace(designElement.fontFace)
    setFontSize(designElement.fontSize)
    setFlickerStyle(designElement.flickerStyle)
    setColor(designElement.color)
  }


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
      animation: `$pulsate 2.5s infinite alternate`
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
    <motion.div
      dragMomentum={false}
      drag
    >
      <Grid container item
            onClick={(e) => {
              const designElement: DesignElementType = {
                size: {width: width, height: height},
                text: text,
                fontFace: fontFace,
                flickerStyle: flickerStyle,
                color: color,
                fontSize:fontSize
              }

              setContextMenu(<DesignElementContextMenu
                key={text+width+height+fontFace+flickerStyle+color+fontSize}
                {...designElement}
                setDesignElement={setDesignElement}
              />)
            }}
            style={{
        height: `calc(${height} + '1.8em')`,
        width: width + "px"
      }}>
        <Grid container item>
          <Grid
            container
            item>
            <Typography className={flickers[flickerStyle].neonText}
                        style={{...fonts[fontFace], fontSize: `${fontSize * FONT_MULTIPLIER}px`}}>{text}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </motion.div>
  )
}

export default DesignElement