//Servizio che si occupa delle chiamate alle API del ChatController getMessages,createMessage,updateMessage,deleteMessage

import axios from '../axios'

export async function getMessages(chatId) {
    const response = await axios.get(`/chats/${chatId}/messages`)
    return response.data
}

export async function createMessage(chatId, data) {
    const response = await axios.post(`/chats/${chatId}/messages`, data)
    return response.data
}

export async function updateMessage(chatId, messageId, data) {
    const response = await axios.post(`/chats/${chatId}/messages/${messageId}`, data)
    return response.data
}

export async function deleteMessage(chatId, messageId) {
    const response = await axios.post(`/chats/${chatId}/messages/${messageId}`)
    return response.data
}