import { useEffect, useState } from "react";
import { IEvent } from "../../../models/IEvent";
import EventService from "../../../services/EventService";

type LocalParams = {
  userId: string;
};

const History = ({ userId }: LocalParams) => {
  const [events, setEvents] = useState<IEvent[]>();

  const getData = () => {
    EventService.getUserEvents(userId).then((res) => setEvents(res.data));
  };
  useEffect(() => getData(), [userId]);

  return (
    <div className="flex gap-2 w-full">
      <div className="bg-white rounded drop-shadow w-1/2 p-4 flex flex-col gap-2">
        <div className="text-center text-xl flex flex-col gap-2">
          історія подій:
        </div>
        {events
          ?.filter((event: IEvent) => {
            const currentDate = new Date();
            const tempDate = new Date(event.date);
            return tempDate.getTime() < currentDate.getTime();
          })
          .map((event: IEvent) => {
            return (
              <div className="bg-cyan-400 hover:bg-cyan-200 rounded drop-shadow">
                <div className="flex justify-center font-bol">{event.name}</div>
                <div className="flex justify-center font-bol">
                  {event.creator._id == userId
                    ? "творець"
                    : event.participants.filter((participant: any) => {
                        return participant.id == userId;
                      })[0]?.role}
                </div>
              </div>
            );
          })}
      </div>
      <div className="bg-white rounded drop-shadow w-1/2 p-4">
        <div className="text-center text-xl">майбутні події:</div>
        {events
          ?.filter((event: IEvent) => {
            const currentDate = new Date();
            const tempDate = new Date(event.date);
            return tempDate.getTime() >= currentDate.getTime();
          })
          .map((event: IEvent) => {
            return (
              <div className="bg-cyan-400 hover:bg-cyan-200  rounded drop-shadow">
                <div>event.name</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default History;
