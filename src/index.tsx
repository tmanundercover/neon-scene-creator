import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Canvas from './components/Canvas'
import {CssBaseline, MuiThemeProvider} from '@material-ui/core'
import NeonTheme from './theme/Theme'
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MuiThemeProvider theme={NeonTheme}>
        <CssBaseline/>
        <Canvas/>
      </MuiThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
