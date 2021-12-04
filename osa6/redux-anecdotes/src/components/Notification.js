
import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  
const { content, duration } = props

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  useEffect(() => {
    setTimeout(() => {
      props.clearNotification()
    }, duration)
  }, [props, duration])

  return (
    <div style={style}>
      {content}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    content: state.notification.content,
    duration: state.notification.duration,
  }
}

export default connect(
  mapStateToProps,
  { clearNotification }
)(Notification)