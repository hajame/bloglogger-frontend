export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user,
    })
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    state = action.data
    return state
  default:
    return state
  }
}

export default userReducer
