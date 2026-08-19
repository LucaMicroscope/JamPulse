//Servizio che si occupa delle chiamate alle API del ChatController

import axios from '../axios'

export async function getChats() {
    const response = await axios.get('/chats')
    return response.data
}

export async function createChat(chatData) {
    const response = await axios.post('/chats', chatData)
    return response.data
}