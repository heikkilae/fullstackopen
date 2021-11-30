const notificationReducer = (state = 'initial message', action) => {
  switch(action.type) {
    case 'ADD_NOTIFICATION':
      return action.message
      default:
        return state
  }
}

export default notificationReducer