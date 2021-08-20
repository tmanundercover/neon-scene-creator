import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import NeonTheme, {NeonFuchsiaHex} from '../../theme/Theme'
import {Grid, Typography} from '@material-ui/core'
import {ArrowLeft, ArrowRight} from '@material-ui/icons'
import {DesignElementType, DesignElementTypesEnum} from '../Canvas'

export const useStyles = makeStyles((theme: Theme) => ({
  arrows: {
      color: NeonFuchsiaHex,
    "&:hover":{
      color: "#FAFAFA !important"
    }
  }
}))

export type FontSampleProps = {
  layer?: number
  fontFace?: any
  addDesignElement(iconDesignElement: DesignElementType): void
}

const FontSample: FunctionComponent<FontSampleProps> = (props) => {
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
      color: 'green',
      layer: props.layer ?? 0,
      type: DesignElementTypesEnum.ICON,
      x: 0,
      y: 0
    }

    console.log("about to add this element", iconDesignElement)

    props.addDesignElement(iconDesignElement)
  }

  return (
    <Grid item>
    <Grid container direction="column" item alignItems="center">
      <Grid item>
        <Grid item container wrap="nowrap" alignItems="center">
          <Grid item onClick={() => decLetter()} className={classes.arrows}><ArrowLeft fontSize="large"/></Grid>
          <Grid item style={{width: '54px'}} onClick={() => addToDesign(characterString.charAt(currentLetter))}>
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
          <Grid item onClick={() => incLetter()} className={classes.arrows}><ArrowRight fontSize="large"/></Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h6" style={{textAlign: "center"}}>{props.fontFace.fontFamily}</Typography>
      </Grid>
    </Grid>
    </Grid>
  )
}

export default FontSample