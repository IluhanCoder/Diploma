import { useEffect, useState } from "react";
import $api from "../../http";
import { IEvent } from "../../models/IEvent";

type LocalParams = {
  eventId: string;
};

const EventPage = (params: LocalParams) => {
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
