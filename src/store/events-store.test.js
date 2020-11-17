import {
  setEvents,
  setFetching,
  setError,
  SET_EVENTS,
  SET_FETCHING,
  SET_ERROR,
  eventsReducer,
} from './events-store';

// Tests for Action creators
test('setEvents generates a dispatchable SET_EVENTS action', () => {
  const expectedEvents = [{ Title: 'Event A' }, { Title: 'Event B' }];

  const action = setEvents(expectedEvents);

  expect(action.type).toBe(SET_EVENTS);
  expect(action.events).toEqual(expectedEvents);
});

test('setFetching generates a dispatchable SET_FETCHING true action', () => {
  const action = setFetching(true);

  expect(action.type).toBe(SET_FETCHING);
  expect(action.isFetching).toBe(true);
});

test('setFetching generates a dispatchable SET_FETCHING false action', () => {
  const action = setFetching(false);

  expect(action.type).toBe(SET_FETCHING);
  expect(action.isFetching).toBe(false);
});

test('setError generates a dispatchable SET_ERROR action', () => {
  const expectedError = new Error('It all went wrong');

  const action = setError(expectedError);

  expect(action.type).toBe(SET_ERROR);
  expect(action.error).toBe(expectedError);
});

// Tests for reducer
test('reducer returns unmodified state by default', () => {
  const unknownAction = { type: 'WHAT_IS_THIS' };
  const state = { events: [], isFetching: false };

  const newState = eventsReducer(state, unknownAction);

  expect(newState).toEqual(state);
});

test('reducer adds events to state on SET_EVENTS', () => {
  const events = [{ Title: 'An event' }, { Title: 'Another event' }];
  const setEventsAction = setEvents(events);
  const oldState = { events: [], isFetching: false };

  const newState = eventsReducer(oldState, setEventsAction);

  expect(newState.events).toEqual(events);
});

test('reducer sets isFetching value from SET_FETCHING action', () => {
  const oldState = { events: [], isFetching: false };
  const setFetchingAction = setFetching(true);

  const newState = eventsReducer(oldState, setFetchingAction);

  expect(newState.isFetching).toBe(true);
});

test('reducer sets error from SET_ERROR action', () => {
  const error = new Error('Something went wrong');
  const setErrorAction = setError(error);
  const oldState = { events: [], isFetching: false };

  const newState = eventsReducer(oldState, setErrorAction);

  expect(newState.error).toEqual(error);
});
