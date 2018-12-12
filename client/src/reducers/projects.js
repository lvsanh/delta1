import {ADD_PROJECT, FETCH_PROJECTS} from '../actions/projects'
import {USER_LOGOUT} from '../actions/users'

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = [], action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return null
      
    case FETCH_PROJECTS:
        return action.projects
    
    case ADD_PROJECT:
      return [...state,action.project]

    default:
      return state
  }
}