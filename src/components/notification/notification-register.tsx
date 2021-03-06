import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {connect} from 'react-redux'
import {firebaseConnect} from 'react-redux-firebase'
import RaisedButton from 'material-ui/RaisedButton'
import {requestMessagingPermission} from '../../request-messaging-permission'
import {uidSelector} from '../../selectors/uid'
import {IRootState} from '../../types'

const mapStateToProps = (state: IRootState) => ({
  uid: uidSelector(state)
})

interface INotificationRegisterProps {
  uid: string
  firebase: any
}

interface INotificationRegisterState {
  error: string | null
}

class NotificationRegisterImpl extends React.Component {
  public props: INotificationRegisterProps
  public state: INotificationRegisterState = {
    error: null
  }

  public render() {
    const {error} = this.state
    return (
      <div>
        <RaisedButton label="Register Notification" secondary={true} onClick={this.requestPermission} />
        {error ? <div>Register error: {error}</div> : null}
      </div>
    )
  }

  private requestPermission = async () => {
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
}

export const NotificationRegister = flowRight(
  firebaseConnect(),
  connect(mapStateToProps)
)(NotificationRegisterImpl)
