import React, {FunctionComponent, useRef} from 'react'
import {Grid} from '@material-ui/core'
import {DesignElementType, DesignType} from '../Canvas'
import DesignElement from './DesignElement'
import {motion} from 'framer-motion'
import {PanInfo} from 'framer-motion/types/gestures/PanSession'

export type DesignProps = {
  design: DesignType,
  inProgress?: boolean,
  background?: any,
  setContextMenu(menu: any, setDesignElement: any): any
  selectedDesignElements?: number[] | null
  setDesignElement(designElement: DesignElementType, index: number): void
}

// const useStyles = makeStyles((theme: Theme) => ({
//   designCover: {
//     position: 'relative',
//     content: '',
//     height: 'calc(250px + 1.8em)',
//     color: 'whitesmoke',
//     padding: NeonTheme.spacing(2, 1)
//   }
// }))

const Design: FunctionComponent<DesignProps> = (props) => {
  const textContainerRef = useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (textContainerRef.current) {
      console.log('the size of the text box?', textContainerRef.current, textContainerRef.current?.clientHeight, textContainerRef.current?.clientWidth)
    }
    // setDesignElement({...des})

  }, [textContainerRef])

  const [isSelected, setIsSelected] = React.useState<number[]>(props.selectedDesignElements ?? [])

  const select = (index: number) => {
    console.log('selecting', index)
    setIsSelected([index])
  }

  React.useEffect(() => {
    setIsSelected(props.selectedDesignElements ?? [])
  }, [props.selectedDesignElements])

  const onDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, index: number) => {
    props.setDesignElement({...props.design.elements[index], x: info.point.x, y: info.point.y}, index)

    // setDraggedX(info.point.x)
    // setDraggedY(info.point.y)
  }

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
            props.design.elements.map && props.design.elements.map((designElement, index) => {
              return <motion.div
                key={index}
                dragMomentum={false}
                drag
                onDrag={(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => onDrag(event, info, index)}
              >
                <Grid
                  // style={{border: isSelected.includes(index) ? '1px solid white' : '1px solid black', }}
                  item
                  onClick={() => {
                    select(index)
                  }}>
                  <Grid item>
                    <DesignElement
                      setDesignElement={(designElement: DesignElementType) => props.setDesignElement(designElement, index)}
                      designElement={{...designElement}} setContextMenu={props.setContextMenu}
                      isSelected={isSelected.includes(index)}/>
                  </Grid>
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