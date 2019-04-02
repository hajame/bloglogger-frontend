export const setNotification = ({ message, type }) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, type },
    })
  }
}

const notificationReducer = (state = { message: null, type: null }, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    state = action.data
    return state
  default:
    return state
  }

}

export default notificationReducer
