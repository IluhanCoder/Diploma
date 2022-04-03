import { useEffect, useState } from "react";
import { useParams } from "react-router";
import $api from "../../http";
import { IEvent } from "../../models/IEvent";

type LocalParams = {
  eventId: string;
};

const EventPage = () => {
  const params = useParams<LocalParams>();
  const { eventId } = params;

  const [event, setEvent] = useState<IEvent>();

  useEffect(() => {
    $api.get("/event/" + eventId).then((response) => {
      const eventData = response.data;
      setEvent(eventData);
    });
  }, []);

  return (
    <div className="flex flex-col">
      <div>
        <p>{event?.name}</p>
      </div>
    </div>
  );
};

export default EventPage;
