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


  return (
    <Grid container item style={{backgroundColor: 'white'}}>
      <Grid container direction="column" alignItems="center"
            style={{
              height: 'calc(100vh - 80px)',
              width: 'calc(100vw - 55px)',
              position: 'relative',
              backgroundColor: 'black',
              // backgroundImage: `url('${discoBall}')`, backgroundSize: 'contain',
              // backgroundRepeat: 'no-repeat'
            }}>
        <Grid container item>
          {
            props.design.elements.map((designElement, index) => {
              return <DesignElement key={index} design={designElement} setContextMenu={props.setContextMenu} />
            })
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Design