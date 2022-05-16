import $api from "../http";

export default class ChatService {
    static async newMessage(content: string, senderId: string, receiverId: string) {
        await $api.post("/message", {content, senderId, receiverId})
    }
    
    static async getChat(senderId: string, receiverId: string) {
        return await $api.get(`/chat/${receiverId}/${senderId}`);
    }
    
    static async getUserChats(userId: string) {
        return await $api.get(`/chats/${userId}`);
    }
}