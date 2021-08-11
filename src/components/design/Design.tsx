import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'
import {DesignType} from '../Canvas'
import DesignElement from './DesignElement'
import NeonTheme from '../../theme/Theme'
import discoBall from '../../assets/favpng_disco-ball-stock-photography-nightclub.png'


export type DesignProps = {
  design: DesignType,
  inProgress?: boolean,
  background?: any,
  setContextMenu(menu:any, setDesignElement:any): any
}

const useStyles = makeStyles((theme: Theme) => ({
  designCover: {
    position: 'relative',
    content: '',
    height: 'calc(250px + 1.8em)',
    color: 'whitesmoke',
    padding: NeonTheme.spacing(2, 1)
  }
}))

const Design: FunctionComponent<DesignProps> = (props) => {
  const classes = useStyles()

  const [isSelected, setIsSelected] = React.useState<number|null>(null)



  return (
    <Grid container item style={{backgroundColor: 'white'}}>
      <Grid container direction="column" alignItems="center"
            style={{
              height: 'calc(100vh - 80px)',
              width: 'calc(100vw - 55px)',
              position: 'relative',
              backgroundColor: 'black',
              backgroundImage: `url(${props?.background?.file})`, backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}>
        <Grid container item>
          {
            props.design.elements.map((designElement, index) => {
              return <Grid key={index} item onClick={()=>{ setIsSelected(index) }} ><DesignElement isSelected={isSelected === index} design={designElement} setContextMenu={props.setContextMenu} /></Grid>
            })
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Design