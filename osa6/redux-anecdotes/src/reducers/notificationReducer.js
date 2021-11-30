const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.content
      default:
        return state
  }
}

export const setNotification = notification => {
  return {
    type: "SET_NOTIFICATION",
    content: notification
  }
}

export default notificationReducer