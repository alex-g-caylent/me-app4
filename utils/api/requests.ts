import { fetchApi } from "../fetchInterceptor";


export const getChat = (chatId: string): Promise<Chat> => fetchApi(
    `/my/chats/${chatId}`,
    {
        method: "GET",
    }
);