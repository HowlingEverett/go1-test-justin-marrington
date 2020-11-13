// Event type constants
export const SET_EVENTS = 'EVENTS_LIST/SET_EVENTS';
export const SET_ERROR = 'EVENTS_LIST/SET_ERROR';
export const SET_FETCHING = 'EVENTS_LIST/SET_FETCHING';

// Action creators
export const setEvents = (events = []) => ({
  type: SET_EVENTS,
  events,
});

export const setFetching = (isFetching = false) => ({
  type: SET_FETCHING,
  isFetching,
});

export const setError = (error) => ({
  type: SET_ERROR,
  error,
});

// Events reducer, to be applied by redux or useReducer hook
export const eventsReducer = (state, action) => {
  switch (action.type) {
    case SET_EVENTS: {
      return { ...state, events: action.events };
    }
    case SET_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case SET_ERROR: {
      return { ...state, error: action.error };
    }
    default: {
      return state;
    }
  }
};

// Provide a valid default state structure on useReducer calls
export const initialState = {
  events: [],
  isFetching: false,
};
