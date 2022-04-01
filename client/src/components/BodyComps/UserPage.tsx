import UserService from "../../services/UserService"
import { IUser } from '../../models/IUser'
import React, {useEffect, useState} from "react"
import { useParams } from "react-router"
import $api from "../../http";
import{ API_URL } from "../../http"
import Avatar from "react-avatar"
import DateFormater from "./DateFormater";
import InviteButtons from "./InviteButtons"
import { isUndefined } from "util";
import { observer } from "mobx-react-lite"
import Invites from "./UserPageComps/Invites";

type LocalParams = {
    id: string
}

const UserPage: React.FC = () => {
    let url = API_URL.replace("/api", "")

    const [user, setUser] = useState<IUser>()

    const params = useParams<LocalParams>()
    let id = params?.id ?? ""

    React.useEffect(() => {
        $api.get("/users/" + id).then((response) => {
          setUser(response.data);
        });
      }, []);

   return (
        <div className="bg-gray-100 p-5">
            <div className="flex flex-wrap gap-5 justify-center">
                <div className="grid grid-col gap-5 h-fit">
                    <div className="p-10 bg-white rounded w-80 flex flex-col border drop-shadow h-fit">
                            <div className="flex justify-center">
                                <Avatar 
                                    name={user?.login} 
                                    src={url + '/' + user?.avatar}
                                    size="180"
                                    className="rounded"
                                />
                            </div>
                            <div className="flex justify-center p-5">
                                <p className="text-4xl">{user?.login}</p>
                            </div>                   
                    </div>
                    <InviteButtons id={id}/>
                </div>
                <div className="p-10 bg-white border drop-shadow rounded md:w-7/12 sm:w-full grid grid-col h-fit gap-8">
                    <div>
                        <div>
                            <p>Коротка інформація:</p>
                        </div>
                        <div className="mt-1">
                            <p>Test test test test test test test test test test test test test test test
                            test test test test test test test test test test test test test test test test
                            test test test test test test test test test test test test test test test test 
                            test test test test test test test test test test test test test test test test 
                            test test test test test test test test test test test test test test test test </p>
                        </div>
                    </div>
                    <div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-5">
                        <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
                            <div>
                                <p>Email:</p>
                            </div>
                            <div className="flex flex-row-reverse">
                                <p>{user?.email}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
                            <div>
                                <p>Номер телефону:</p>
                            </div>
                            <div className="flex flex-row-reverse">
                                <p>{user?.cell}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
                            <div>
                                <p>Стать:</p>
                            </div>
                            <div className="flex flex-row-reverse">
                                <p>{user?.gender}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
                            <div>
                                <p>Місто:</p>
                            </div>
                            <div className="flex flex-row-reverse">
                                <p>{user?.city}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
                            <div>
                                <p>Дата народження:</p>
                            </div>
                            <div className="flex flex-row-reverse">
                                <DateFormater value={user?.birthday} dayOfWeek={false}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-white border drop-shadow rounded md:w-4/12 sm:w-full grid grid-col">
                    <div className="flex justify-center">
                        <p className="text-xl">Історія подій користувача:</p>
                    </div>
                    <div className="h-80 w-full mt-6 overflow-auto">
                        <div className="h-fit grid drid-col gap-5 text-white">
                            <div className="bg-cyan-400 p-5 rounded drop-shadow border-1 grid grid-cols-3 ">
                                <div>Назва події</div>
                                <div className="flex justify-center">Роль у події</div>
                                <div className="flex flex-row-reverse">24.10.22</div>
                            </div>
                            <div className="bg-cyan-400 p-5 rounded drop-shadow border-1 grid grid-cols-3 ">
                                <div>Назва події</div>
                                <div className="flex justify-center">Роль у події</div>
                                <div className="flex flex-row-reverse">24.10.22</div>
                            </div><div className="bg-cyan-400 p-5 rounded drop-shadow border-1 grid grid-cols-3 ">
                                <div>Назва події</div>
                                <div className="flex justify-center">Роль у події</div>
                                <div className="flex flex-row-reverse">24.10.22</div>
                            </div><div className="bg-cyan-400 p-5 rounded drop-shadow border-1 grid grid-cols-3 ">
                                <div>Назва події</div>
                                <div className="flex justify-center">Роль у події</div>
                                <div className="flex flex-row-reverse">24.10.22</div>
                            </div><div className="bg-cyan-400 p-5 rounded drop-shadow border-1 grid grid-cols-3 ">
                                <div>Назва події</div>
                                <div className="flex justify-center">Роль у події</div>
                                <div className="flex flex-row-reverse">24.10.22</div>
                            </div><div className="bg-cyan-400 p-5 rounded drop-shadow border-1 grid grid-cols-3 ">
                                <div>Назва події</div>
                                <div className="flex justify-center">Роль у події</div>
                                <div className="flex flex-row-reverse">24.10.22</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-white border drop-shadow rounded md:w-4/12 sm:w-full grid grid-col">
                    <div className="flex justify-center">
                        <p className="text-xl">Майбутні події користувача:</p>
                    </div>
                    <div className="h-80 w-full mt-6 overflow-auto text-white">
                        <div className="h-fit grid drid-col gap-5">
                            <div className="bg-cyan-400 p-5 rounded drop-shadow border-1 grid grid-cols-3 ">
                                <div>Назва події</div>
                                <div className="flex justify-center">Роль у події</div>
                                <div className="flex flex-row-reverse">24.10.22</div>
                            </div>
                            <div className="bg-cyan-400 p-5 rounded drop-shadow border-1 grid grid-cols-3 ">
                                <div>Назва події</div>
                                <div className="flex justify-center">Роль у події</div>
                                <div className="flex flex-row-reverse">24.10.22</div>
                            </div>
                            <div className="bg-cyan-400 p-5 rounded drop-shadow border-1 grid grid-cols-3 ">
                                <div>Назва події</div>
                                <div className="flex justify-center">Роль у події</div>
                                <div className="flex flex-row-reverse">24.10.22</div>
                            </div>
                            <div className="bg-cyan-400 p-5 rounded drop-shadow border-1 grid grid-cols-3 ">
                                <div>Назва події</div>
                                <div className="flex justify-center">Роль у події</div>
                                <div className="flex flex-row-reverse">24.10.22</div>
                            </div>
                            <div className="bg-cyan-400 p-5 rounded drop-shadow border-1 grid grid-cols-3 ">
                                <div>Назва події</div>
                                <div className="flex justify-center">Роль у події</div>
                                <div className="flex flex-row-reverse">24.10.22</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-white border drop-shadow rounded rounded w-3/12 grid grid-col">
                    <div className="flex justify-center">
                        <p className="text-xl">Пропозиції на участь:</p>
                    </div>
                    <div className="h-80 w-full mt-6 overflow-auto">
                        <Invites invites={user?.eventInvites? user?.eventInvites : []} display={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default observer(UserPage)