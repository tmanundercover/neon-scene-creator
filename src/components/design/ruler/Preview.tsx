import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles"
import NeonTheme from '../../../theme/Theme'
import HorizontalRuler from './HorizontalRuler'

export const useStyles = makeStyles((theme: Theme) => ({

}))

export type PreviewProps = {
sizes: number[]
}

const Preview: FunctionComponent<PreviewProps> = (props) => {
  const classes = useStyles(NeonTheme)
  React.useEffect(() => {

  }, [])

  return (
      <HorizontalRuler stops={props.sizes} onSelectItem={console.log} grid={10} height={24}/>
  )
}

export default Preview