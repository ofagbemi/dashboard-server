import { Map } from 'immutable'
import { handleActions } from 'redux-actions'


export const ISSUE_LOGIN = 'sc/ISSUE_LOGIN'
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
