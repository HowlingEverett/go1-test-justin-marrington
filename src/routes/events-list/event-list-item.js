import { Link } from 'react-router-dom';

const EventListItem = ({ event: { Title: title, id: eventId } }) => {
  return (
    <div title="event-list-item">
      <Link to={`/event/${eventId}`}>{title}</Link>
    </div>
  );
};

export default EventListItem;
