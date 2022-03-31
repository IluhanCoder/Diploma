import { useState } from "react"
import { IEvent } from "../../../models/IEvent"
import DateFormater from "../DateFormater"
import SmallEvent from "./EventMapperComps/SmallEvent"

type LocalParams = {
    events: Array<IEvent>
}

const EventsMapper = (params: LocalParams) => {
    const {events} = params
    const [chosenIndex, setChosenIndex] = useState<number>(0)
    return <div className="flex flex-col gap-2">
        {events?.map((event: IEvent) => {
            return <SmallEvent event={event} isSelected={true}/>
        })}
    </div>
}

export default EventsMapper