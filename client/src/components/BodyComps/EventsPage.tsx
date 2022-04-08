import React, { useState } from "react";
import { IEvent } from "../../models/IEvent";
import { Event } from "./EventsPageComps/Event";
import $api from "../../http";
import SubHeader from "../UniversalComps/SearchBar";
import EventCreateRequest from "./EventsPageComps/EventCreateRequest";
import EventsMapper from "../UniversalComps/EventsMapper";

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
    $api.get("/events-submited").then((response) => {
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
      <div className="flex justify-center p-2">
        <EventCreateRequest
          className="bg-red-200 rounded px-2 py-1 border-4 border-red-400 text-red-600 hover:bg-red-100
          hover:border-red-200 hover:text-red-400"
        />
      </div>
      <EventsMapper events={events} />
    </div>
  );
};

export default Events;
