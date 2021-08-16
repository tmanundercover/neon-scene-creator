import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'
import {DesignElementType, DesignType} from '../Canvas'
import DesignElement from './DesignElement'
import NeonTheme from '../../theme/Theme'
import {motion} from 'framer-motion'

export type DesignProps = {
  design: DesignType,
  inProgress?: boolean,
  background?: any,
  setContextMenu(menu: any, setDesignElement: any): any
  selectedDesignElements?: number[] | null
  setDesignElement(designElement: DesignElementType, index: number): void
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
  const classes = useStyles(NeonTheme)

  const [isSelected, setIsSelected] = React.useState<number[]>(props.selectedDesignElements ?? [])

  const select = (index: number) => {
    console.log('selecting', index)
    setIsSelected([index])
  }

  React.useEffect(() => {
    setIsSelected(props.selectedDesignElements ?? [])
  }, [props.selectedDesignElements])

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
              return <motion.div
                dragMomentum={false}
                drag
              >
                <Grid
                  style={{border: isSelected.includes(index) ? '1px solid white' : '1px solid black'}}
                  key={index}
                  item
                  onClick={() => {
                    select(index)
                  }}>
                  <DesignElement
                    setDesignElement={(designElement: DesignElementType) => props.setDesignElement(designElement, index)}
                    design={designElement} setContextMenu={props.setContextMenu}/>
                </Grid>
              </motion.div>
            })
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Design