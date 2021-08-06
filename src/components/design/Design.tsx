import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Button, Grid, Modal, Typography} from '@material-ui/core'
import {DesignType} from '../Canvas'
import DesignElement from './DesignElement'
import questionMark from '../../assets/neon-question.png'
import questionMarkFuchsia from '../../assets/Question-fuschia-on.png'
import questionMarkYellow from '../../assets/Question-yellow-on.png'
import {motion, useAnimation} from 'framer-motion'
import NeonTheme, {designerBold, NeonFuchsiaHex, NeonYellowRoseBlueHex} from '../../theme/Theme'
import {Close} from '@material-ui/icons'


export type DesignProps = {
  design: DesignType,
  inProgress?: boolean
}

type SanityModernServices = {
  title?: string,
  image?: any,
  servicesLinks?: { title: string, url: any, hoverColor: string, backgroundImage: any, color: string }[],
  buttonText?: string
}


const Design: FunctionComponent<DesignProps> = (props) => {
  function openDesign(index: number) {
    console.log('open Design', index)
    setOpenDesignModal(true)
    return undefined
  }

  function saveDesign(index: number) {
    console.log('save Design', index)

    return undefined
  }

  const services: SanityModernServices[] = [
    {
      title: 'Face',
      image: '',
      servicesLinks: [
        {
          title: 'Save',
          color: 'pink',
          url: saveDesign,
          hoverColor: NeonFuchsiaHex,
          backgroundImage: questionMarkFuchsia
        },
        {
          title: 'Open',
          url: openDesign,
          hoverColor: NeonYellowRoseBlueHex,
          color: 'yellow',
          backgroundImage: questionMarkYellow
        }
      ]
    }
  ]
  const [animationStage, setAnimationStage] = React.useState<string>('visible')
  const [openDesignModal, setOpenDesignModal] = React.useState<boolean>(false)

  const [backgroundImage, setBackgroundImage] = React.useState<any>(questionMark)
  React.useEffect(() => {
    console.log('backgroundImage UE', backgroundImage)
    controls.start(animationStage)
  }, [animationStage])

  const useStyles = makeStyles((theme: Theme) => ({
    designCover: {
      position: 'relative',
      content: '',
      height: 'calc(250px + 1.8em)',
      color: 'whitesmoke',
      padding: NeonTheme.spacing(2, 1)
    }
  }))

  const classes = useStyles()
  const controls = useAnimation()

  const [showLinks, setShowLinks] = React.useState<boolean[]>([false])
  React.useEffect(() => {
    console.log('SHowlinks', showLinks)
    if (showLinks && showLinks.length) {
      showLinks.forEach((serviceStatus, index) => {
        if (serviceStatus) {
          controls.start('visible' + index)
        } else {
          controls.start('hidden' + index)
        }
      })
    }
  }, [showLinks, controls])


  return (
    <Grid container item>
      {
        services.map((service: SanityModernServices, index) => {
          return <Grid key={index} container xs={12} item style={{position: 'relative', height: '100%'}}>
            {
              <Grid
                container
                onMouseEnter={() => {
                  let newLinkState = [false]
                  newLinkState[index] = true

                  setShowLinks(newLinkState)
                }}
                direction="column"
                alignItems="center"
                justifyContent="center"
                item
                spacing={1}
                style={{
                  // height: '500px',
                  backgroundImage: `url(${service.image})`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: 'center',
                  color: 'whitesmoke'
                  // padding: NeonTheme.spacing(6, 4),
                  // marginBottom: '32px'
                }}>
                <Grid container item><DesignElement width={250} height={250}/></Grid>
              </Grid>
            }
            {
              <motion.div
                style={{
                  width: '100%', position: 'absolute', top: 0, backgroundColor: 'black',
                  backgroundImage: `url(${questionMark})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'none'
                }}
                initial={'hidden' + index}
                animate={controls}
                variants={{
                  ['visible' + index]: {opacity: 1, scale: 1, backgroundImage: `url(${questionMark})`},
                  ['hidden' + index]: {opacity: 0, scale: 0, backgroundImage: `url(${questionMark})`},
                  ['pink' + index]: {backgroundImage: `url(${questionMarkFuchsia})`},
                  ['yellow' + index]: {backgroundImage: `url(${questionMarkYellow})`}
                }}
                exit={'hidden' + index}
                transition={{duration: .5}}
              >
                <Grid
                  key={`${service.title}`}
                  container
                  onMouseLeave={() => {
                    setShowLinks([false])
                  }}
                  alignItems="flex-end"
                  justifyContent="space-between"
                  item
                  spacing={1}
                  className={classes.designCover}
                >
                  {
                    service?.servicesLinks && service.servicesLinks.map((serviceLink: { title: string, url: any, hoverColor: string, backgroundImage: any, color: string }, linkIndex) => {
                      return <Grid
                        item
                        key={linkIndex}
                        onMouseOver={() => {
                          controls.start(serviceLink.color + index)
                        }}
                        onMouseOut={() => {
                          controls.start('visible' + index)
                        }}>
                        <Button onClick={() => {
                          serviceLink.url(index)
                        }}><Typography variant="h5" style={{
                          ...designerBold,
                          color: serviceLink.hoverColor
                        }}>{serviceLink.title}</Typography></Button>
                      </Grid>
                    })
                  }
                </Grid>
              </motion.div>
            }
          </Grid>
        })
      }
      <Modal
        open={true}>
        <Grid container alignItems="center" justifyContent="center"
              style={{height: 'calc(100vh - 80px)', width: '100vw', position: 'relative'}}>
          <Grid container item style={{backgroundColor: 'black'}} xs={8}>
            <Typography variant="h1">PROJECT:</Typography>
            <DesignElement width={props.design.width} height={props.design.height}/>
          </Grid>
          <Grid container style={{position: 'absolute', top: 0, padding: NeonTheme.spacing(4,12), color: 'white'}} justifyContent="flex-end">
            <Grid item onClick={()=>{setOpenDesignModal(false)}}>
              <Close fontSize="large"/>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </Grid>
  )
}

export default Design