import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core'
import {
  AccountCircle,
  Business,
  Email,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  Message,
  Phone,
  Twitter
} from '@material-ui/icons'
import NeonTheme, {getFontFace} from '../../theme/Theme'
import cmsClient from '../../clients/cmsClient'
import FirebaseAnalyticsClient from '../../clients/FirebaseAnalyticsClient'
import sanityIcon from '../../assets/sanity-icon.svg'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100vw',
    minHeight: '100vh',
    backgroundColor: '#1f1f1f',
    color: '#FAFAFA',
    padding: theme.spacing(0, 4)
  },
  header: {
    fontWeight: 800,
    letterSpacing: '10px',
    lineHeight: 1.4,
    fontSize: '30px',
    textTransform: 'uppercase'
  },
  headerAccent: {
    display: 'inline-block',
    marginLeft: theme.spacing(1)
  },
  formContainer: {
    // height: '500px',
    paddingTop: '28px',
    paddingLeft: '48px',
    paddingRight: '48px',
    paddingBottom: '18px',
    borderRadius: ' 0.63rem',
    backgroundColor: '#313131',
    boxShadow: '11px 10px 38px rgb(0 0 0 / 38%)'
  },
  inputAdornmentContainer: {
    marginTop: theme.spacing(1),
    zIndex: 3
  },
  inputAdornmentTextBlockContainer: {
    position: 'relative',
    top: -25,
    zIndex: 3
  },
  formTitle: {
    marginBottom: theme.spacing(1)
  },
  socialMediaContainer: {
    marginTop: theme.spacing(1)
  },
  lhsContainer: {
    width: '500px',
    height: '650px'
  },
  formInput: {
    color: 'white'
  },
  sectionTitle: {
    fontWeight: 800,
    color: 'white !important'
  },
  inputLabel: {
    marginBottom: '-16px', marginTop: '10px'
  },
  checkboxContainer: {
    position: 'absolute',
    top: 0
  }
}))

const StyledTextField = withStyles({
  root: {
    transition: 'all 0.3s ease-in-out',
    '& label': {
      display: 'inline-block',
      fontSize: '16px',
      fontWeight: 700,
      position: 'relative',
      top: '0px',
      left: '-14px'
    },
    '& legend': {
      maxWidth: '0px'
    },
    '& input': {
      height: '0px',
      zIndex: 2
    },
    '& textarea': {
      zIndex: 2
    },
    '& fieldset': {
      backgroundColor: '#292929'
    },
    '& .MuiOutlinedInput-root': {
      borderColor: `${NeonTheme.palette.primary.main} !important`,
      '&.Mui-focused': {
        borderColor: `${NeonTheme.palette.primary.main} !important`,
        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: `${NeonTheme.palette.primary.main} !important`
          }
        }
      },
      '&.Mui-disabled': {
        color: 'whitesmoke  !important'
      },
      '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: `#212121 !important`
        }
      }
    }
  }
})(TextField)

export type ContactUsProps = {
  address: string,
  email: string,
  phone: string,
  facebook: string,
  twitter: string,
  linkedIn: string,
  github: string,
  instagram: string
  sanity: string
}

export type ContactUsFormState = {
  name?: string,
  companyName?: string,
  email?: string,
  phone?: string,
  comment?: string,
  newsletter?: string
}

export type CheckBoxesType = {
  iAgree: boolean
}

const ContactUs: FunctionComponent<ContactUsProps> = (props) => {
  const classes = useStyles(NeonTheme)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [status, setStatus] = React.useState<boolean | undefined>(undefined)

  const [contactUsFormState, setContactUsFormState] = React.useState<ContactUsFormState>({})

  const [checkBoxes, setCheckBoxes] = React.useState<CheckBoxesType>({
    iAgree: false
  })

  const updateCheckboxes = (event: any) => {
    event.persist()
    console.log('event', event.target.name, event.target.value)

    setCheckBoxes(state => ({...state, [event.target.name]: event.target.value === 'true'}))
  }

  const createContactUs = () => {
    setLoading(true)
    const contactUs = {...contactUsFormState, ...checkBoxes}

    cmsClient.createContactUs(contactUs).then((result) => {
      setStatus(true)
      setLoading(false)
      // setTimeout(() =>{
      // history.push(RoutesEnum.LANDING)
      // }, 1000)
    })
  }

  const updateContactUsFormParams = (event: any) => {
    event.persist()

    setContactUsFormState(state => ({...state, [event.target.name]: event.target.value}))
  }

  return (
    <Grid container className={classes.root}>
      <Grid container item alignItems="stretch">
        <Grid container item xs={12} lg={6}>
          <Grid container direction="column" item justify="space-around" className={classes.lhsContainer}>
            <Grid container item>
              <Typography variant="h1" color="secondary">Give me some Feedback?</Typography>
            </Grid>
            <Grid container item>
              <Typography style={{...getFontFace('Margot')}} variant="body1" color="primary">
                This app is under heavy development and new features are being added almost daily until the
                core features are built out.
              </Typography>
            </Grid>
            <Grid container item>
              <Typography style={{...getFontFace('Margot')}} variant="body1" color="primary">
                Make choices for each tab on the left to create a scene of neon and regular text, icons, and symbols
              </Typography>
            </Grid>
            <Grid container item>
              <Typography style={{...getFontFace('Margot')}} variant="body1" color="primary">
                Choosing to "save" using the file menu at the top then your design will be written to the database
                currently for EVERYONE to see.
                You can "open" that design or any other design saved by any other user with the bottom Designs Tab.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={7} item xs={12} lg={6} justify="space-between"
              style={{padding: NeonTheme.spacing(8, 0, 0)}}>

          <Grid container item className={classes.formContainer}>
            <Grid container item justify="center" className={classes.formTitle}>
              <Typography variant="h1" className={classes.header}>
                Get in
                <Typography component="span" variant="h1" className={`${classes.header} ${classes.headerAccent}`}
                            color="secondary">
                  Touch
                </Typography>
              </Typography>
            </Grid>
            <Grid container item>
              <StyledTextField
                disabled={status}
                name="name"
                onChange={updateContactUsFormParams}
                fullWidth
                id="contact-name-input"
                value={contactUsFormState.name}
                label={<Typography variant="h2" className={classes.inputLabel}>Name</Typography>}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography className={classes.inputAdornmentContainer}>
                        <AccountCircle color="secondary"/>
                      </Typography>
                    </InputAdornment>
                  ),
                  className: classes.formInput
                }}
              />
            </Grid>
            <Grid container item>
              <StyledTextField
                disabled={status}
                name="companyName"
                value={contactUsFormState.companyName}
                onChange={updateContactUsFormParams}
                fullWidth
                id="contact-company-name-input"
                label={<Typography variant="h2" className={classes.inputLabel}>Company Name</Typography>}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography className={classes.inputAdornmentContainer}>
                        <Business color="secondary"/>
                      </Typography>
                    </InputAdornment>
                  ),
                  className: classes.formInput
                }}
              />
            </Grid>
            <Grid container item>
              <StyledTextField
                fullWidth
                disabled={status}
                value={contactUsFormState.email}
                name="email"
                onChange={updateContactUsFormParams}
                id="contact-email-input"
                label={<Typography variant="h2" className={classes.inputLabel}>Email</Typography>}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography className={classes.inputAdornmentContainer}>
                        <Email color="secondary"/>
                      </Typography>
                    </InputAdornment>
                  ),
                  className: classes.formInput
                }}
              />
            </Grid>
            <Grid container item>
              <StyledTextField
                fullWidth
                disabled={status}
                name="phone"
                value={contactUsFormState.phone}
                onChange={updateContactUsFormParams}
                id="contact-phone-input"
                label={<Typography variant="h2" className={classes.inputLabel}>Phone</Typography>}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography
                        className={classes.inputAdornmentContainer}><Phone color="secondary"/></Typography>
                    </InputAdornment>
                  ),
                  className: classes.formInput
                }}
              />
            </Grid>
            <Grid container item>
              <StyledTextField
                fullWidth
                disabled={status}
                name="comment"
                value={contactUsFormState.comment}
                id="contact-message-input"
                label={<Typography variant="h2" className={classes.inputLabel}>Message</Typography>}
                onChange={updateContactUsFormParams}
                variant="outlined"
                multiline
                rows="4"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography
                        className={classes.inputAdornmentTextBlockContainer}>
                        <Message color="secondary"/>
                      </Typography>
                    </InputAdornment>
                  ),
                  className: classes.formInput
                }}
              />
            </Grid>
            <Grid container item>
              <FormControl component="fieldset" style={{position: 'relative'}}>
                <FormGroup>
                  <FormControlLabel
                    disabled={status}
                    style={{paddingLeft: NeonTheme.spacing(4)}}
                    // classes={{root:classes.checkboxContainer}}
                    control={<Checkbox className={classes.checkboxContainer} color="secondary" name="iAgree"
                                       checked={checkBoxes.iAgree}
                                       onChange={updateCheckboxes} value={!checkBoxes.iAgree}/>}
                    label={
                      <Typography variant="subtitle1" style={{
                        ...getFontFace('Margot'),
                        paddingLeft: NeonTheme.spacing(6),
                        paddingTop: NeonTheme.spacing(.5)
                      }}>
                        <Typography variant="h6" style={{display: 'inline-block'}}>Click here</Typography> to receive
                        the
                        latest news, special offers, and other awesome updates.
                        <br/>The Handsomest Nerd is committed to protecting and respecting your privacy, and we’ll only
                        use
                        your personal information to provide info for the products you requested from us or that may be
                        of interest to you. If you consent to us contacting you for this purpose, please tick below to
                        say how you would like us to contact you.
                      </Typography>
                    }
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid container justifyContent="center" item>
              {
                status === undefined && <Button onClick={createContactUs} color="primary" variant="contained"
                  // disabled={loading || !contactUsFormState.email || contactUsFormState.email === ''}
                >
                  {
                    loading ? <CircularProgress style={{height: '90%', color: 'white'}}/> :
                      <Typography color="secondary" variant="h6">Send</Typography>
                  }
                </Button>
              }
            </Grid>
            <Grid container alignItems="center" item direction="column">
              <Grid item>
                {status === true && <Typography>Thanks for staying in touch.</Typography>}
                {status === false && <Typography>Something went wrong. Please try again</Typography>}
              </Grid>
              <Grid item>
                {status !== undefined &&
                <Link href={'/'}><Typography variant="h6" color="secondary">Home</Typography></Link>}
              </Grid>
            </Grid>
          </Grid>
          <Grid container item wrap="nowrap" justifyContent="space-between" style={{marginBottom: '32px'}}>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.sectionTitle} color="primary">Email:</Typography>
              <Typography variant="body2" color="secondary"
                          style={{...getFontFace('Margot')}}>{props.email}</Typography>
            </Grid>
            <Grid container xs={6} item className={classes.socialMediaContainer} spacing={1} justifyContent="flex-end">
              <Grid item>
                <Typography>
                  <Link href={'http://facebook.com/' + props.facebook}
                        onClick={() => FirebaseAnalyticsClient.contactUsClick('Facebook')}><Facebook color="secondary"
                                                                                                     fontSize="large"/></Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  <Link href={'http://twitter.com/' + props.twitter}
                        onClick={() => FirebaseAnalyticsClient.contactUsClick('Twitter')}><Twitter color="secondary"
                                                                                                   fontSize="large"/></Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  <Link href={'http://linkedIn.com/in/' + props.linkedIn}
                        onClick={() => FirebaseAnalyticsClient.contactUsClick('LinkedIn')}><LinkedIn color="secondary"
                                                                                                     fontSize="large"/></Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  <Link href={'http://instagram.com/' + props.instagram}
                        onClick={() => FirebaseAnalyticsClient.contactUsClick('Instagram')}><Instagram color="secondary"
                                                                                                       fontSize="large"/></Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  <Link href={'https://github.com/' + props.github}
                        onClick={() => FirebaseAnalyticsClient.contactUsClick('Github')}><GitHub color="secondary"
                                                                                                 fontSize="large"/></Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  <Link href={'https://www.sanity.io/exchange/community/' + props.sanity}
                        onClick={() => FirebaseAnalyticsClient.contactUsClick('Sanity')}><img alt="sanity io" src={sanityIcon} style={{
                    width: '36px',
                    height: '36px'
                  }}/></Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ContactUs