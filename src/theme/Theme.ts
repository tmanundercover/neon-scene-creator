import {createTheme, responsiveFontSizes} from '@material-ui/core'
import NeonFontFile from './fonts/neon-font/Neon.ttf'
import KlaxonsFontFile from './fonts/Klaxons.otf'
import NeoNeonFontFile from './fonts/Neoneon.otf'
import designerFont from './fonts/Designer-Font-Family/Designer.otf'
import designerBoldFont from './fonts/Designer-Font-Family/Designer-Bold.otf'
import SortDecaiScriptFontFile from './fonts/Swistblnk Sortdecai Cursive Script and Bonus/Swistblnk Sortdecai Cursive Script and Bonus/Sortdecai Cursive Script.ttf'

type FontFace = {
  fontDisplay?: any
  fontFamily?: any
  fontStyle?: any
  fontWeight?: number
  src?: string
}
export const designerRegular: FontFace = {
  fontFamily: 'Designer-Regular',
  fontStyle: 'normal',
  fontDisplay: 'swap', // uses the fallback font to display the text until the custom font has fully downloaded. This is also known as a “flash of unstyled text” or FOUT.
  fontWeight: 400,
  src: `
    local('desinger'),
    url(${designerFont}) format('opentype')
  `
}


export const designerBold: FontFace = {
  fontFamily: 'Designer-Bold',
  fontStyle: 'bold',
  fontDisplay: '', // uses the fallback font to display the text until the custom font has fully downloaded. This is also known as a “flash of unstyled text” or FOUT.
  fontWeight: 700,
  src: `
    local('designer-bold'),
    url(${designerBoldFont}) format('opentype')
  `
}

export const NeonFontFace: FontFace = {
  fontFamily: 'NEON Regular',
  fontStyle: 'bold',
  fontDisplay: 'auto', // uses the fallback font to display the text until the custom font has fully downloaded. This is also known as a “flash of unstyled text” or FOUT.
  fontWeight: 500,
  src: `
    local('NEON Regular'),
    url(${NeonFontFile}) format('truetype')
  `
  // unicodeRange:
  //   'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}

export const KlaxonsFontFace: FontFace = {
  fontFamily: 'Klaxons',
  fontStyle: 'normal',
  fontDisplay: 'swap', // uses the fallback font to display the text until the custom font has fully downloaded. This is also known as a “flash of unstyled text” or FOUT.
  fontWeight: 400,
  src: `
    local('Klaxons'),
    url(${KlaxonsFontFile}) format('opentype')
  `
}

export const NeoNeonFontFace: FontFace = {
  fontFamily: 'Neo Neon',
  fontStyle: 'normal',
  fontDisplay: 'swap', // uses the fallback font to display the text until the custom font has fully downloaded. This is also known as a “flash of unstyled text” or FOUT.
  fontWeight: 400,
  src: `
    local('Neo Neon'),
    url(${NeoNeonFontFile}) format('opentype')
  `
}

export const SortDecaiCursiveFontFace: FontFace = {
  fontFamily: 'Sortdecai Cursive Script',
  fontStyle: 'normal',
  fontDisplay: 'swap', // uses the fallback font to display the text until the custom font has fully downloaded. This is also known as a “flash of unstyled text” or FOUT.
  fontWeight: 400,
  src: `
    local('Sortdecai Cursive Script'),
    url(${SortDecaiScriptFontFile}) format('truetype')
  `
}

const fonts = [' Designer-Regular, Designer-Bold, Sortdecai Cursive Script, Klaxons, Neo Neon, NEON Regular,sans-serif'].join(',')

export const NeonBlueHex = '#1900A0'
export const NeonGreenHex = '#38FF12'
export const NeonFuchsiaHex = '#f09'
export const NeonYellowRoseBlueHex = '#FFF100'
export const NeonElectricVioletHex = '#9600FF'
export const NeonAquaHex = '#00F5FB'


const NeonTheme = responsiveFontSizes(
  createTheme({
    palette: {
      background: {
        default: '#000000',
        paper: '#FAFAFA'
      },
      primary: {
        main: '#00F5FB'
      },
      secondary: {
        main: '#FF00E3'
      },
      error: {
        main: '#AE2727',
        light: '#D79393',
        dark: '#840E0E'
      },
      success: {
        main: '#27AE60',
        light: '#93D7B0',
        dark: '#0E8433'
      },
      warning: {
        main: '#E2AB1F',
        light: '#F1D58F',
        dark: '#CF800A'
      },
      text: {
        primary: '#FAFAFA',
        secondary: '#6B6B6B'
      }
    },
    typography: {
      fontFamily: fonts,
      h1: {
        // Title1
        ...designerBold,
        textTransform: 'uppercase',
        fontSize: '44px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 1.8,
        letterSpacing: '-0.03em'
      },
      h2: {
        ...designerBold,
        textTransform: 'uppercase',
        // Title2
        fontSize: '32px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: '-0.03em'
      },
      h3: {
        // Title3
        ...designerBold,
        textTransform: 'uppercase',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '-0.03em'
      },
      h6: {
        // Title3
        ...designerBold,
        textTransform: 'uppercase',
        fontSize: '1.25rem',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 1.5,
        letterSpacing: '-0.03em'
      },
      body1: {
        // Body
        fontSize: '17px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '-0.03em'
      },
      body2: {
        // Large
        fontSize: '19px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.03em'
      },
      button: {
        // Button
        ...designerRegular,
        fontSize: '19px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: '-0.03em'
      },
      caption:{
        ...designerBold,
        textTransform: 'uppercase',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: '-0.03em'
      },
      subtitle1: {
        // Small
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 1.45,
        letterSpacing: '-0.03em'
      },
      subtitle2: {
        // Micro
        fontSize: '8px',
        fontStyle: 'normal',
        fontWeight: 850,
        lineHeight: 1.35,
        letterSpacing: '-0.03em'
      }
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [designerRegular, designerBold,SortDecaiCursiveFontFace, NeoNeonFontFace, KlaxonsFontFace, NeonFontFace]
        }
      }

    }
  })
)

export default NeonTheme
