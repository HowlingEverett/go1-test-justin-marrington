import { useParams, Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import {
  EventsContext,
  setFetching,
  setEvents,
  setError,
} from '../../store/events-store';
import { fetchEvent } from '../../api';

const EventDetail = () => {
  const {
    state: { events = [], isFetching },
    dispatch,
  } = useContext(EventsContext);
  const { eventId } = useParams();

  const activeEvent = events.find((event) => event._id === eventId);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        dispatch(setFetching(true));
        const response = await fetchEvent(eventId);
        dispatch(setEvents([response.event]));
      } catch (e) {
        dispatch(setError(e));
      } finally {
        dispatch(setFetching(false));
      }
    };
    if (!activeEvent) {
      fetchEventData();
    }
  });

  return (
    <div title="event detail">
      <nav>
        <Link to="/">Back to events</Link>
      </nav>
      {isFetching && <span>{'Loading events'}</span>}
      {activeEvent && (
        <>
          <h2>{activeEvent.title}</h2>

          <img url={activeEvent.image} alt="Event detail" />

          <div title="event date">
            <strong>Event date: </strong>
            {new Intl.DateTimeFormat('en-AU', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(new Date(activeEvent.time))}
          </div>
        </>
      )}
    </div>
  );
};

export default EventDetail;
