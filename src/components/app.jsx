import * as React from 'react'
import {Webcam} from './webcam'
import {Status} from './status'
import {Log} from './log'
import {NotifySettings} from './notify-settings'
import {HttpsRedirect} from './https-redirect'
import {Login} from './login'
import * as firebase from 'firebase/app'
import {Logout} from './logout'

const auth = firebase.auth()

export class App extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      hasUser: auth.currentUser !== null
    }
  }

  componentWillMount() {
    auth.onAuthStateChanged(user => {
      this.setState({
        hasUser: user !== null
      })
    })
  }

  render() {
    const {hasUser} = this.state
    if (hasUser) {
      return (
        <div>
          <h1>JSSE PH23 smart mail box</h1>
          <h3>Webcam footage</h3>
          <Webcam />
          <h3>Current status</h3>
          <Status />
          <h3>Mail Log</h3>
          <Log />
          <h3>Notification settings</h3>
          <NotifySettings />
          <h3>Authentication</h3>
          <Logout />

          <HttpsRedirect />
        </div>
      )
    } else {
      return (
        <div>
          <h1>JSSE PH23 smart mail box</h1>
          <h3>Authentication</h3>
          <Login />

          <HttpsRedirect />
        </div>
      )
    }

  }
}