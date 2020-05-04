import socket from '../Components/Functions/Users'
import history from '../Components/history'
// import axios from 'axios'
//connect to the server

// console.log(socket)
//
const init = {
  users: null,
}

//listen for number of users
// export const users = (state = init, action) => {
//   switch (action.type) {

//     default:
//       return state
//   }
// }

export const setUser = (state = init, action) => {
  switch (action.type) {
    case 'SET_NAME':
      // console.log(action.name)
      const data = {
        name: action.name,
      }

      //sent user using socket
      socket.emit('Create_name', data)

      history.push(`/list/${btoa(action.name)}`)

      return state

    //lilsten for number of users
    case 'Get_USERS':
      let nows
      socket.on('users', (userss) => {
        // console.log(userss)
        // return { ...state, userss }
        nows = userss

        return nows
      })
      return { ...state, nows }
    default:
      // console.log('Default State')
      console.log(state)
      return state
  }
}
