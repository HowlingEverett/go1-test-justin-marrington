import React, { useContext, useEffect } from 'react';

import {
  setFetching,
  setError,
  setEvents,
  setFilter,
  EventsContext,
} from '../../store/events-store';
import { fetchEvents } from '../../api';
import TitleQueryField from './title-query-field';
import LocationQueryField from './location-query-field';
import DateQueryFields from './date-query-fields';

const EventsList = ({ debounce }) => {
  const {
    state: { filters, isFetching, events, error },
    dispatch,
  } = useContext(EventsContext);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        dispatch(setFetching(true));
        const fetchedEvents = await fetchEvents(filters);
        dispatch(setEvents(fetchedEvents.events));
      } catch (e) {
        dispatch(setError(e));
      } finally {
        dispatch(setFetching(false));
      }
    };

    fetchEventsData();
  }, [filters]);

  return (
    <div>
      <h1>Events List</h1>

      <TitleQueryField
        debounce={debounce}
        q={filters.q}
        handleChange={(value) => dispatch(setFilter('q', value))}
      />

      <LocationQueryField
        debounce={debounce}
        handleAddressSelected={(address) =>
          dispatch(setFilter('coordinates', address.coordinates.join(',')))
        }
      />

      <DateQueryFields
        handleDateSelected={(dates) => dispatch(setFilter('between', dates))}
      />

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
