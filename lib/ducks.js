import _ from 'lodash';
import { QUEUE } from '@recipher/queue';

export const INFO = 'recipher/flash/INFO';
export const WARNING = 'recipher/flash/WARNING';
export const ERROR = 'recipher/flash/ERROR';
export const NOTIFY = 'recipher/flash/NOTIFY';
export const CLOSE = 'recipher/flash/CLOSE';

const initialState = { text: '', type: 'info', active: false };

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case INFO:
    case WARNING:
    case ERROR:
    case NOTIFY:
      return action.payload;
    case CLOSE:
      return _.assign({}, state, { active: false, finish: null });
    default:
      return state;
  }
};

function message(type, text, delay) {
  const kind = _(type.split('/')).last().toLowerCase();

  return {
    [QUEUE]: {
      type: type
    , payload: { 
        text: text
      , type: kind
      , active: true
      , delay: delay
      , finish: { type: CLOSE }
      }
    }
  };
};

export function info(text, delay) {
  return (dispatch) => {
    return dispatch(message(INFO, text, delay));
  };
};

export function warning(text, delay) {
  return (dispatch) => {
    return dispatch(message(WARNING, text, delay));
  };
};

export function error(text, delay) {
  return (dispatch) => {
    return dispatch(message(ERROR, text, delay));
  };
};

export function notify(text, delay) {
  return (dispatch) => {
    return dispatch(message(NOTIFY, text, delay));
  };
};

export function close() {
  return { type: CLOSE };
};