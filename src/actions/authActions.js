/*	логинимся */
export function login(data) {
  return {
    type: 'LOGIN',
    payload: data
  }
}

/*	разлогиниваемся	*/
export function logout(data) {
  return {
    type: 'LOGOUT',
    payload: data
  }
}