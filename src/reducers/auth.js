const initialState = {
  currentAccount: {
    idAccount: null,
    login: null,
    password: null,
    setting: ''
  }
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    
    case 'LOGIN':
    return { ...state, currentAccount: action.payload }
    
    case 'LOGOUT':
    return { ...state, currentAccount: initialState.currentAccount }


    default:
    return state
  }
}