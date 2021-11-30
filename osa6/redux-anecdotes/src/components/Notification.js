
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const content = useSelector(state => state.notification.content)
  const duration = useSelector(state => state.notification.duration)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration)
  }, [dispatch, duration])

  return (
    <div style={style}>
      {content}
    </div>
  )
}

export default Notification