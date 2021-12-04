let previousTimeout = null

const notificationReducer = (state = {content: '', duration: 0}, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return { content: action.content, duration: action.duration }
      default:
        return state
  }
}

export const setNotification = (notification, duration) => {
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      content: notification,
      duration: duration
    })

    if (previousTimeout !== null) {
      clearTimeout(previousTimeout)
    }

    previousTimeout = setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        content: '',
        duration: 0
      })
    }, duration)
  }
}

export const clearNotification = () => {
  return {
    type: "SET_NOTIFICATION",
    content: '',
    duration: 0
  }
}

export default notificationReducer