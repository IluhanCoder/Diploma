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
  console.log(store.user.email)

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

  return (
    <div className="bg-gray-100">
      <div>
        <div>
          <div className="bg-gray-200 grid grid-cols-6 px-10 py-2">
            <Link to="/event-form">
              <button className="rounded bg-green-500 text-white hover:bg-green-700 transition px-4 py-2 hover:text-white lg:mt-0">
                Додати нову подію
              </button>
            </Link>
            <form className="grid grid-cols-4 col-span-2 gap-1">
              <div className="col-span-2 px-1 grid grid-cols-6">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="placeholder:italic w-full col-span-5 placeholder:text-slate-400 block bg-white  rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                />
                <button
                  type="button"
                  className="bg-cyan-500 mx-auto items-center px-4 py-2 text-white hover:border-transparent hover:text-teal-500 hover:bg-white flex justify-center rounded-md"
                  onClick={() => {
                    EventService.findEvent(searchValue, searchType).then(
                      (response) => {
                        console.log(response.data);
                        setEvents(response.data);
                      }
                    );
                  }}
                >
                  <BiSearch />
                </button>
              </div>
              <div className="">
                <select
                  onChange={(e) => setSearchType(e.target.value)}
                  value={searchType}
                  className="block border h-full border-grey-light rounded w-full"
                  name="search"
                >
                  <option value="name">по назві</option>
                  <option value="adress">за адресом</option>
                  <option value="date">по даті</option>
                  <option value="genre">по жанру</option>
                  <option value="participant">по учасникаx</option>
                  <option value="creator">по творцю</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:px-20 mt-2">
        { events.map((item) => {
          return (
            <div className="bg-white border-gray-300 border-2 rounded-md md:px-24 px-2 py-6 mb-4">
              <div className="grid grid-rows-8">
                <div className="flex md:place-content-end place-content-center">
                  <h2>Створив подію: {item.creator}</h2>
                </div>
                <div className="flex justify-center">
                  <h1 className="font-bold text-4xl">{item.name}</h1>
                </div>
                <div className="row-span-2 lg:px-1/4 flex justify-center content-center py-4">
                  <img
                    src="https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png"
                    className="h-full"
                  ></img>          
                </div>
                <div>
                  <input onChange={e => handleFileSelected(e)} type="file" name="file"/>
                  <div className="mt-4 mb-6 mx-2">
                    <p>{item.desc}</p>
                  </div>
                </div>
                <div className="row-span-3">
                  <div className="grid md:grid-cols-2 sm:grid-rows-2">
                    <div>
                      <p className="mb-2">Жанри:</p>
                      <div className="flex flex-wrap">
                        { item.genres.map((genre => {
                          return (
                            <div className="bg-gray-400 mr-4 mb-2 rounded"><p className="mx-4 md:my-1">{genre}</p></div>
                          )
                        })) }
                      </div>
                    </div>
                    <div>
                      <p className="mb-2">Учасники:</p>
                      <div className="flex flex-wrap">
                        { item.participants.map((participant => {
                          return (
                            <div className="bg-gray-400 mr-4 mb-2 rounded"><p className="mx-4 md:my-1">{participant}</p></div>
                          )
                        })) }
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>Дата проведення: {item.date}</p>
                    <p>Адреса: {item.adress}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default observer(UserEvents);
