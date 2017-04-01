import { Map } from 'immutable'
import { handleActions } from 'redux-actions'


const RECEIVE_LOGIN = 'sc/RECEIVE_LOGIN'

export default handleActions({
  [RECEIVE_LOGIN]: {
    next: (state, action) => (
      state.merge({
        ...action.payload,
      })
    ),
  },
}, Map())
