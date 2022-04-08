import { IEvent } from "../../models/IEvent";
import Event from "../BodyComps/EventsPageComps/Event";

type LocalParams = {
  events?: Array<IEvent>;
};

const EventMapper = (params: LocalParams) => {
  const { events } = params;
  if (events?.length == 0)
    return (
      <div className="p-20 w-full">
        <div className="text-4xl flex justify-center">
          <p>Подій нема</p>
        </div>
      </div>
    );
  else
    return (
      <div className="grid lg:grid-cols-2 md:grid-cols-1 px-5 py-2 gap-4">
        {events?.map((item) => {
          return <Event key={item.name} event={item} />;
        })}
      </div>
    );
};

export default EventMapper;
