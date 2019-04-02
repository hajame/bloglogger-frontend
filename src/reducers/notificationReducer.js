export const setNotification = ({ message, type }) => {
  console.log('mes', message, 'type', type)
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, type },
    })
  }
}

export const notificationReducer = (state = { message: null, type: null }, action) => {
  console.log('message', state.message, 'type', state.type)
  switch (action.type) {

  case 'SET_NOTIFICATION':
    state = action.data
    return state
  default:
    return state
  }

}

export default notificationReducer
