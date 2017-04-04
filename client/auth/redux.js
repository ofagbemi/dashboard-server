import { Map } from 'immutable'
import { handleActions, createAction } from 'redux-actions'


const ISSUE_LOGIN = 'sc/ISSUE_LOGIN'
const RECEIVE_LOGIN = 'sc/RECEIVE_LOGIN'

export const issueLogin = createAction(ISSUE_LOGIN)
export const receiveLogin = createAction(RECEIVE_LOGIN)

export default handleActions({
  [receiveLogin]: {
    next: (state, action) => (
      state.merge(action.payload)
    ),
  },
}, Map())
