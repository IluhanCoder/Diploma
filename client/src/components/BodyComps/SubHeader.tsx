import { useContext } from "react";
import { Link } from "react-router-dom"
import EventService from "../../services/EventService";
import { BiSearch } from "react-icons/bi";
import { SearchParams } from "./Events"
import { IEvent } from "../../models/IEvent";

type LocalProps = {
  value: SearchParams,
  setValue: React.Dispatch<React.SetStateAction<SearchParams>>,
  setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>
}

const SubHeader = (props: LocalProps) => {
    const searchType = props.value.searchType
    const searchValue = props.value.searchValue
    const setParams = props.setValue
    const setEvents = props.setEvents
    
    const setSearchType = (value: string) => {
      setParams({ searchType: value, searchValue })
    }
    
    const setSearchValue = (value: string) => {
      setParams({ searchValue: value, searchType })
    }

    return (
        <div className="bg-gray-200 grid grid-cols-6 px-10 py-2">
          <Link to="/event-form">
            <button className="rounded bg-green-500 text-white hover:bg-green-700 transition px-4 py-2 hover:text-white lg:mt-0">
              Додати свою подію
            </button>
          </Link>
          <form className="grid grid-cols-4 col-span-2 gap-1">
            <div className="col-span-2 px-1 grid grid-cols-6">
              <input
                type="text"
                value={ searchValue }
                onChange={ (e) => setSearchValue(e.target.value) }
                className="placeholder:italic w-full col-span-5 placeholder:text-slate-400 block bg-white px-2 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              />
              <button
                type="button"
                className="bg-cyan-500 mx-auto ml-2 items-center px-4 py-2 text-white hover:border-transparent hover:text-teal-500 hover:bg-white flex justify-center rounded-md"
                onClick={() => {
                  EventService.findEvent(searchValue, searchType).then(
                    (response) => {
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
                className="block border h-full border-grey-light rounded w-full ml-2"
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
    )
}

export default SubHeader