import * as React from 'react'
import {connect} from 'react-redux'
import {firebaseConnect} from 'react-redux-firebase'
import RaisedButton from 'material-ui/RaisedButton'
import {requestMessagingPermission} from '../../request-messaging-permission'
import {uidSelector} from '../../selectors/uid'

const mapStateToProps = state => ({
  uid: uidSelector(state)
})

@firebaseConnect()
@connect(mapStateToProps)
export class NotificationRegister extends React.Component {
  state = {
    error: null
  }

  requestPermission = async () => {
    const {uid, firebase} = this.props
    try {
      await requestMessagingPermission(uid, firebase.set)
    } catch (e) {
      console.log('Error when requesting permission.', e)
      this.setState({
        error: e.message
      })
      throw e
    }
  }

  render() {
    const {error} = this.state
    return (
      <div>
        <RaisedButton label="Register Notification" secondary={true} onClick={this.requestPermission} />
        {error ? <div>Register error: {error}</div> : null}
      </div>
    )
  }
}
