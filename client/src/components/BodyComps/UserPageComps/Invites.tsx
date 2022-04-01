import { IEvent } from "../../../models/IEvent"
import { Context } from "../../../index"
import { useContext } from "react"

type LocalParams = {
    invites: Array<string>,
    display: boolean
}

const Invites = (params: LocalParams) => {
    const {store} = useContext(Context)

    return(
        <div className="flex flex-col gap-5 text-white">
            {params.invites.map((item) => {
                return(
                    <div className="bg-cyan-400 p-5 rounded drop-shadow border-1">
                        <div>{item}</div>
                    </div>
                )
            })}
        </div>
    )
    // return <></>
}

export default Invites