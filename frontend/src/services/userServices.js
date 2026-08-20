//Servizio che si occupa delle chiamate alle API del UserController 

import axios from '../axios'

export async function getLoggedUser() {
    const response = await axios.get(`/users/me`)
    return response.data
}

export async function updateProfile(data) {
    const response = await axios.put(`/users/me`, data)
    return response.data
}

export async function getUsers() {
    const response = await axios.get(`/users`)
    return response.data
}

export async function getUserById(userId) {
    const response = await axios.get(`/users/${userId}`)
    return response.data
}

export async function getPosts(userId) {
    const response = await axios.get(`/users/${userId}/posts`)
    return response.data
}

export async function follow(userId) {
    const response = await axios.post(`/users/${userId}/follow`)
    return response.data
}

export async function unfollow(userId) {
    const response = await axios.delete(`/users/${userId}/follow`)
    return response.data
}