
import React from 'react'
import { connect } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = ({ content }) => {

  if (!content) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {content}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    content: state.notification.content
  }
}

export default connect(
  mapStateToProps,
  { clearNotification }
)(Notification)