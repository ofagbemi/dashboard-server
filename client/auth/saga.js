import urlJoin from 'url-join'
import request from 'superagent'
import { fork, put, takeEvery } from 'redux-saga/effects'

import { issueLogin, receiveLogin } from './redux'
import { API_URL } from '../util'


const AUTH_URL = urlJoin(API_URL, '/auth')

function* handleIssueLogin({ payload }) {
  let response
  try {
    response = yield request
      .post(AUTH_URL)
      .send(payload.toJS())
  } catch (err) {
    yield put(receiveLogin(err))
    return
  }
  const action = receiveLogin(response.body)
  yield put(action)
}

export default function* rootSaga() {
  yield [
    fork(takeEvery, issueLogin, handleIssueLogin),
  ]
}
