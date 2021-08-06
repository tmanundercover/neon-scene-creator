import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Button, Grid, Typography} from '@material-ui/core'
import Design from './design/Design'
import NeonTheme from '../theme/Theme'

export const useStyles = makeStyles((theme: Theme) => ({
  design: {
    border: '1px solid #FAFAFA',
    minHeight: '250px',
    minWidth: '250px'
  }
}))

export type CanvasProps = {}


// export type InProgressDesignType = {
//   title?: string,
//   font?: string,
//   text?: string,
//   width: number,
//   height: number
// }

export type DesignType = {
  title?: string,
  font?: string,
  text?: string,
  width: number,
  height: number
}


const Canvas: FunctionComponent<CanvasProps> = (props) => {
  const classes = useStyles(NeonTheme)

  const [designs] = React.useState<DesignType[]>([])
  const [inProgressDesign, setInProgressDesign] = React.useState<DesignType>({height: 250, width: 250})

  React.useEffect(() => {

  }, [])

  const addNewDesign = (): void => {
    const design = {
      title: 'New Design',
      font: '',
      text: '',
      width: 250,
      height: 250
    }
    setInProgressDesign(design)
  }

  return (
    <Grid container style={{width: '100vw', height: '100vh - 80px'}}>
      <Grid container item><Typography variant="h1">Canvas</Typography></Grid>
      <Grid container item spacing={1}>
        <Grid item xs={2} className={classes.design}>
          <Button fullWidth onClick={()=>addNewDesign()} variant="contained" color="primary" style={{height: "100%"}}>Add New</Button>
        </Grid>
        {
          inProgressDesign && <Grid container item xs={2} className={classes.design}>
            <Design design={inProgressDesign} inProgress/>
          </Grid>
        }
        {
          designs.map((design) => {
            return <Grid item xs={2} className={classes.design}>
              <Design design={design}/>
            </Grid>
          })
        }

      </Grid>
    </Grid>
  )
}

export default Canvas