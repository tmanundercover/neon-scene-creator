import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import NeonTheme, {
  allFontFaces,
  getFontFace,
  getIconFont,
  iconFonts,
  NeonAquaHex,
  NeonFuchsiaHex, NeonYellowRoseBlueHex
} from '../../theme/Theme'
import {Grid, Typography} from '@material-ui/core'
import {ArrowLeft, ArrowRight} from '@material-ui/icons'
import {DesignElementType} from '../Canvas'

export const useStyles = makeStyles((theme: Theme) => ({
  arrows: {
      color: NeonFuchsiaHex,
    "&:hover":{
      color: "#FAFAFA !important"
    }
  }
}))

export type FontFaceSampleProps = {
  fontFace?: any
  addDesignElement(iconDesignElement: DesignElementType): void
}

const FontFaceSample: FunctionComponent<FontFaceSampleProps> = (props) => {
  const classes = useStyles(NeonTheme)

  const [currentLetter, setCurrentLetter] = React.useState<number>(0)

  const characterString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890;!@#$%^&*()_+'

  const incLetter = () => {
    if (currentLetter < characterString.length) {
      setCurrentLetter(currentLetter + 1)
    } else {
      setCurrentLetter(0)
    }
  }

  const decLetter = () => {
    if (currentLetter >= 1) {
      setCurrentLetter(currentLetter - 1)
    } else {
      setCurrentLetter(characterString.length - 1)
    }
  }

  const addToDesign = (charStr: string) => {
    const iconDesignElement: DesignElementType = {
      size: {height: 80, width: 80},
      text: charStr,
      fontSize: 8,
      fontFace: props.fontFace,
      flickerOn: false,
      flickerStyle: 'PULSATE',
      color: 'green'
    }

    console.log("about to add this element", iconDesignElement)

    props.addDesignElement(iconDesignElement)
  }

  return (
    <Grid item>
    <Grid container direction="column" item alignItems="center">
      <Grid item>
        <Grid item container wrap="nowrap" alignItems="center">
            <Typography variant="h1" style={{
              ...props.fontFace,
              textAlign: 'center',
              textTransform: 'none',
              // position: "absolute",
              // visibility: "hidden",
              height: "auto",
              width: "auto",
              whiteSpace: "nowrap"
            }}>{characterString.charAt(currentLetter)}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h6" style={{textAlign: "center"}}>{props.fontFace.fontFamily}</Typography>
      </Grid>
    </Grid>
    </Grid>
  )
}

export default FontFaceSample