import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import NeonTheme from '../../../theme/Theme'


export const useRulerStyles = makeStyles((theme: Theme) => ({
  ruler: {
    position: 'relative',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    width: "100%"
  },
  rulerBackground: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '50%',
    bottom: 0 // top, when inverted;
  },
  rulerItem: {
    display: 'block',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translate(-50%,-50%)',
    margin: '-2px 0 0 -1px',
    color: '#444',
    '&:before': {
      content: '',
      position: 'absolute',
      left: '50%',
      top: '100%',
      width: '1px',
      height: '100vh',
      background: 'currentColor'
    },
    '&:hover': {
      color: 'blue'
    },
    // move the pointer line into the button to avoid focus-within
    '&:focus-within': {
      '& button': {
        boxShadow: '0 0 0 2px rgba(0,0,255, 0.3)'
      }
    }
  },
  button: {
    outline: 'none',
    // border: 'none',
    border: '1px solid',
    // color: white,
    borderRadius: '4px',
    padding: '1px 2px 2px',
    lineHeight: 1,
    color: 'currentColor',
    fontWeight: 700,
    backgroundColor: 'white',
    fontSize: '10px',
    '&:hover': {
      // background: darkgray;
    }
    // transform: rotate(90deg)
  }
}))

export type HorizontalRulerProps = {
  stops: any[],
  onSelectItem(item: any): void,
  grid: number,
  height: number
}


const toRulerGradient = (size = 8, color = 'rgba(0,0,0,0.15)') =>
  `repeating-linear-gradient(
    to right, 
    transparent, 
    transparent ${size - 1}px, 
    ${color} ${size - 1}px, 
    ${color} ${size}px
  )`


const HorizontalRuler: FunctionComponent<HorizontalRulerProps> = (props: HorizontalRulerProps & { children?: React.ReactNode | undefined }) => {
  const classes = useRulerStyles(NeonTheme)
  React.useEffect(() => {

  }, [])

  return (
    <div className={classes.ruler} style={{height: props.height+"px"}}>
      <div
        className={classes.rulerBackground}
        style={{background: toRulerGradient(props.grid)}}
      />
      <ul className={classes.rulerItem}>
        {props.stops.map((stop, idx) => (
          <li key={stop} className={classes.rulerItem} style={{left: stop}}>
            <button
              className={classes.button}
              onClick={e => props.onSelectItem({stop, idx})}
            >
              {stop}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HorizontalRuler