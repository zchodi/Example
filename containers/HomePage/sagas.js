/**
 * Gets the repositories of the user from Github
 */

import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_REPOS, LOAD_CONTENT } from 'containers/App/constants';
import { reposLoaded, repoLoadingError , contsLoaded, contLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { selectUsername, selectContent } from 'containers/HomePage/selectors';


const NEWS_KEY = 'abec5cae27a747c598497edf21287144';
/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(selectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Watches for LOAD_REPOS actions and calls getRepos when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* getReposWatcher() {
  yield fork(takeLatest, LOAD_REPOS, getRepos);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getReposWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

/********************************************************************************************************
 *                                  GET API NEWS     
 *********************************************************************************
 */
export function* getContent() {
  // Select username from store
  const content = yield select(selectContent());
  // const requestURL = `https://newsapi.org/v1/articles?source=bbc-sport&apiKey=${ NEWS_KEY }&sortBy=latest`;
    const requestURL = `https://api.github.com/users/${content}/repos?type=all&sort=updated`;


  try {
    // Call our request helper (see 'utils/request')
    const conts = yield call(request, requestURL);
    yield put(contsLoaded(conts, content));
  } catch (err) {
    yield put(contLoadingError(err));
  }
}

export function* getContsWatcher() {
  yield fork(takeLatest, LOAD_CONTENT, getContent);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* newsData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getContsWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}



// Bootstrap sagas
export default [
  githubData, newsData,
];
