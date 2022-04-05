import React, { useState } from "react";
import { IEvent } from "../../models/IEvent";
import { Event } from "./EventsPageComps/Event";
import $api from "../../http";
import SubHeader from "../UniversalComps/SearchBar";

export type SearchParams = {
  searchType: string;
  searchValue: string;
};

const defaultSearchParams: SearchParams = {
  searchType: "name",
  searchValue: "",
};

export const Events = () => {
  const [events, setEvents] = useState<Array<IEvent>>([]);
  const [searchParams, setSearchParams] =
    useState<SearchParams>(defaultSearchParams);

  React.useEffect(() => {
    $api.get("/events").then((response) => {
      setEvents(response.data);
    });
  }, []);

  return (
    <div className="bg-gray-100">
      <div>
        <SubHeader
          value={searchParams}
          setValue={setSearchParams}
          setEvents={setEvents}
        />
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 px-5 py-2 gap-4">
        {events.map((item) => {
          return <Event key={item.name} event={item} />;
        })}
      </div>
    </div>
  );
};

export default Events;
