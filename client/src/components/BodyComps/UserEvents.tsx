import React, { FC, useContext, useState } from "react";
import { IEvent } from "../../models/IEvent";
import { Event } from "./EventsComps/Event";
import { useNavigate } from "react-router";
import { arrayBuffer } from "stream/consumers";
import $api from "../../http";
import { Link } from "react-router-dom";
import { Context } from "../../index";
import EventService from "../../services/EventService";
import { BiSearch } from "react-icons/bi";
import { observer } from 'mobx-react-lite'
import { useParams } from "react-router"

type LocalParams = {
  userId: string
}

export const UserEvents: FC = () => {
  const params = useParams<LocalParams>()
  const {userId: creatorId} = params
  
  const {store} = useContext(Context)
  const [events, setEvents] = useState<Array<IEvent>>([]);
  const [searchType, setSearchType] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  
  React.useEffect(() => {
    $api.get("/user-events/" + creatorId).then((response) => {
      setEvents(response.data);
    });
  }, []);
  
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files
    if(!files) return
    const file = files[0]
    if(!file) return
    EventService.setAvatar(events[0], files[0])
    window.location.reload();
  }

  return(
    <div className="bg-gray-100">
      <div className="flex flex-col md:px-20 mt-2">
        { events.map((item) => {
          return (
            <Event event={item}/>
          );
        })}
      </div>
    </div>
  )
};

export default observer(UserEvents);
