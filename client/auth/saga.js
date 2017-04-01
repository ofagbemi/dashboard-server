import { fork, takeEvery } from 'redux-saga/effects'

import { ISSUE_LOGIN } from './redux'


function handleIssueLogin() {

}

export default function* rootSaga() {
  yield [
    fork(takeEvery, ISSUE_LOGIN, handleIssueLogin),
  ]
}
