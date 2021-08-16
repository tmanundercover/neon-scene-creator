import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Grid, Typography} from '@material-ui/core'
import NeonTheme, {FontFace, fonts, NeonYellowRoseBlueHex} from '../../theme/Theme'
import {motion, useAnimation} from 'framer-motion'
import {DesignElementType, DesignElementTypesEnum} from '../Canvas'
import DesignElementContextMenu from './DesignElementContextMenu'

const FONT_MULTIPLIER = 20

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: '1px solid #FAFAFA'
  },
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
  }
}))


export type DesignElementProps = {
  design?: DesignElementType,
  setDesignElement(designElement:DesignElementType):void,
  inProgress?: boolean,
  // isSelected?: boolean,
  setContextMenu(menu: any, setDesignElement: any): any
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

  const setContextMenu = (menu: any) => {
    props.setContextMenu(menu, setDesignElement)
  }



  const [height, setHeight] = React.useState<number>(props.design?.size.height ?? 250)
  const [width, setWidth] = React.useState<number>(props.design?.size.width ?? 250)
  const [text, setText] = React.useState<string>(props.design?.text ?? 'New Text')
  const [fontFace, setFontFace] = React.useState<FontFace>(props.design?.fontFace ?? fonts[0])
  const [fontSize, setFontSize] = React.useState<number>(4)
  const [flickerStyle, setFlickerStyle] = React.useState<string>(props.design?.flickerStyle ?? 'pulsate')
  const [color, setColor] = React.useState<string>(props.design?.color ?? 'green')
  const [flickerOn,setFlickerOn] = React.useState<boolean>(props.design?.flickerOn ?? false)
  const [layer,setLayer] = React.useState<number>(props.design?.layer ?? 0)

  const setDesignElement = (designElement: DesignElementType) => {
    setHeight(designElement.size.height)
    setWidth(designElement.size.width)
    setText(designElement.text)
    setFontFace(designElement.fontFace)
    setFontSize(designElement.fontSize)
    setFlickerStyle(designElement.flickerStyle)
    setFlickerOn(designElement.flickerOn)
    setColor(designElement.color)
    setLayer(designElement.layer)
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




  // React.useEffect(()=>{
  //   selectThisDesignElement(isSelected)
  // },[isSelected])

  // React.useEffect(()=>{
  //   if(props.isSelected) {
  //
  //   selectThisDesignElement()
  //   }
  // },[props.isSelected])

  return (
      <Grid container item
            // className={props.isSelected === true ? classes.root: ''}
            onClick={(e) => {
              const designElement: DesignElementType = {
                size: {width: width, height: height},
                text: text,
                fontFace: fontFace,
                flickerStyle: flickerStyle,
                color: color,
                flickerOn: flickerOn,
                fontSize: fontSize,
                layer: layer,
                type: DesignElementTypesEnum.TEXT
              }

              setContextMenu(<DesignElementContextMenu
                key={text + width + height + fontFace + flickerStyle + color + fontSize}
                color={NeonYellowRoseBlueHex}
                designElement={designElement}
                setDesignElement={setDesignElement}
              />)
            }}
            style={{
              // border: `${props.isSelected? '1px solid white': '1px solid black'}`,
              height: `calc(${height} + '1.8em')`,
              width: width + 'px'
            }}>
        <Grid container item>
          <Grid
            container
            item>
            <Typography className={flickerOn?flickers[flickerStyle].neonText: ''}
                        style={{...fontFace, fontSize: `${fontSize * FONT_MULTIPLIER}px`}}>{text}</Typography>
          </Grid>
        </Grid>
      </Grid>
  )
}

export default DesignElement