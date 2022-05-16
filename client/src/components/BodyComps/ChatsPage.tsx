import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../..";
import { IChat } from "../../models/IChat";
import ChatService from "../../services/ChatService";

const ChatsPage = () => {
    const {store} = useContext(Context);
    const [chats, setChats] = useState<IChat[]>([]);

    const getData = () => {
        ChatService.getUserChats(store.user._id).then(res => setChats(res.data));
    }
    useEffect(() => {
        if(store.user._id)getData();
    }, [store.user._id]);
    
    return(
        <div className="flex flex-col gap-2 bg-gray-100">
            {chats!.map((chat: IChat) => {
                const receiver = (chat.user1._id != store.user._id) ? chat.user1 : chat.user2;
                return(<Link to={`/chat/${receiver._id}`} className="bg-white rounded drop-shadow">
                    <div>{receiver.login}</div>
                </Link>)
            })}
            
        </div>
    )
}

export default ChatsPage;