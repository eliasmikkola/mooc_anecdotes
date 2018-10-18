import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
    render() {
        const style = {
            border: 'solid',
            padding: 10,
            borderWidth: 1
        }
        const { message } = this.props
        return (
            message !== '' ?
                <div style={style}>
                    {message}
                </div>
                : ''
        )
    }
}
const ConnectedNotification = connect()(Notification)
export default ConnectedNotification

