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

// Elimina una chat dal backend tramite il suo ID.
export async function deleteChat(chatId) {
    const response = await axios.delete(`/chats/${chatId}`)
    return response.data
}