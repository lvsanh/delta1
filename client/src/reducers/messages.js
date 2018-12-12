import {ADD_MESSAGE, FETCH_MESSAGES} from '../actions/messages'
import {USER_LOGOUT} from '../actions/users'


export default (state = null, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return null
      
    case FETCH_MESSAGES:
        return action.messages
    
    case ADD_MESSAGE:
      return [...state,action.message]

    default:
      return state
  }
}