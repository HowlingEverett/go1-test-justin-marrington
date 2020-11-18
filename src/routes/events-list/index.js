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
import EventListItem from './event-list-item';

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
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

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
        handleAddressSelected={(address) => {
          const { latitude, longitude } = address.coordinates;
          dispatch(setFilter('coordinates', [longitude, latitude].join(',')));
        }}
      />

      <DateQueryFields
        handleDateSelected={(dates) => dispatch(setFilter('between', dates))}
      />

      <div>
        {isFetching && <span>{'Loading events'}</span>}
        {events.length > 0 && (
          <div title="events">
            {events.map((event, index) => (
              <EventListItem key={index} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsList;
