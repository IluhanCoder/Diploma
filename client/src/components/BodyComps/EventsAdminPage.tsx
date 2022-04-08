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

export const EventsAdmin = () => {
  const [events, setEvents] = useState<Array<IEvent>>([]);
  const [searchParams, setSearchParams] =
    useState<SearchParams>(defaultSearchParams);

  React.useEffect(() => {
    $api.get("/events-unsubmited").then((response) => {
      setEvents(response.data);
    });
  }, []);

  return (
    <div className="bg-gray-100 flex flex-col">
      <div className="flex justify-center"><div className="px-2 py-6 text-3xl">Непідтвердженні події:</div></div>
      <EventsMapper events={events}/>
    </div>
  );
};

export default EventsAdmin;
