import { useContext } from "react"
import { useNavigate } from "react-router"
import { Context } from "../.."
import UserService from "../../services/UserService"

type LocalParams = {
    id: string
}

const InviteButtons = (params: LocalParams) => {
    const navigate = useNavigate()
    const { store } = useContext(Context)
    const { id } = params
    if(store.isAuth && store.user.id != id){
        return (
            <div className="flex flex-col gap-3 justify-center bg-white rounded drop-shadow border-1 p-4">
                <button type="button" className="rounded bg-green-500 text-white hover:bg-green-700 transition px-4 py-2 hover:text-white lg:mt-0" onClick={() => navigate('/send-event-request/' + id)}>Запропонувати участь у події</button>
                <button type="button" className="rounded bg-cyan-400 text-white hover:bg-cyan-400 transition px-4 py-2 hover:text-white lg:mt-0">Надіслати повідомлення</button>
            </div>
        )
    }
    else return <></>
}

export default InviteButtons