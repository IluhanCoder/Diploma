import { IEvent } from "../../../models/IEvent"
import DateFormater from "../DateFormater"

type LocalParams = {
    events: Array<IEvent>
}

const EventsMapper = (params: LocalParams) => {
    const {events} = params
    return <div>
        {events?.map((event: IEvent) => {
            return <div className="bg-cyan-400 rounded px-16 py-3 text-white grid grid-cols-3">
                <div className="flex">
                    {event.name}
                </div>
                <div className="flex justify-center">
                    {event.adress}
                </div>
                <div className="flex right flex-row-reverse">
                    <DateFormater value={event.date} dayOfWeek={false}/>
                </div>
            </div>
        })}
    </div>
}

export default EventsMapper