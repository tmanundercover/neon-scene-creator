import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {NeonFuchsiaHex} from '../../theme/Theme'
import {Grid, Typography} from '@material-ui/core'
import {DesignElementType, DesignElementTypesEnum} from '../Canvas'

export const useStyles = makeStyles((theme: Theme) => ({
  arrows: {
    color: NeonFuchsiaHex,
    '&:hover': {
      color: '#FAFAFA !important'
    }
  }
}))

export type FontFaceSampleProps = {
  layer?: number
  fontFace?: any
  addDesignElement(iconDesignElement: DesignElementType): void
}

const FontFaceSample: FunctionComponent<FontFaceSampleProps> = (props) => {

  const [currentLetter] = React.useState<number>(0)

  const characterString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890;!@#$%^&*()_+'

  const addToDesign = () => {
    const iconDesignElement: DesignElementType = {
      size: {height: 100, width: 120},
      text: 'New Text',
      fontSize: 8,
      fontFace: props.fontFace,
      flickerOn: false,
      flickerStyle: 'PULSATE',
      color: 'green',
      layer: props.layer ?? 0,
      type: DesignElementTypesEnum.TEXT,
      x: 0,
      y: 0
    }

    console.log('about to add this element', iconDesignElement)

    props.addDesignElement(iconDesignElement)
  }

  return (
    <Grid item>
      <Grid container direction="column" item alignItems="center">
        <Grid item>
          <Grid item container wrap="nowrap" alignItems="center">
            <Typography
              onClick={() => addToDesign()}
              variant="h1"
              style={{
                ...props.fontFace,
                textAlign: 'center',
                textTransform: 'none',
                // position: "absolute",
                // visibility: "hidden",
                height: 'auto',
                width: 'auto',
                whiteSpace: 'nowrap'
              }}>{characterString.charAt(currentLetter)}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h6" style={{textAlign: 'center'}}>{props.fontFace?.fontFamily}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default FontFaceSample