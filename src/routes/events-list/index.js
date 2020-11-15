import React, { useReducer, useEffect } from 'react';

import {
  eventsReducer,
  initialState,
  setFetching,
  setError,
  setEvents,
} from './events-store';
import { fetchEvents } from '../../api';

const EventsList = () => {
  const [{ events, isFetching, error }, dispatch] = useReducer(
    eventsReducer,
    initialState
  );

  const fetchEventsData = async () => {
    try {
      dispatch(setFetching(true));
      const fetchedEvents = await fetchEvents();
      dispatch(setEvents(fetchedEvents));
    } catch (e) {
      dispatch(setError(e));
    } finally {
      dispatch(setFetching(false));
    }
  };

  useEffect(() => {
    fetchEventsData();
  }, [error]);

  return (
    <div>
      <h1>Events List</h1>

      <div>
        {isFetching && <span>{'Loading events'}</span>}
        {events.length > 0 && (
          <ul>
            {events.map((event) => (
              <li key={event.Title + event.Time.toString()}>{event.Title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventsList;
