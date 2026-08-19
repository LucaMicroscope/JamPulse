//Servizio che si occupa delle chiamate alle API del PostController 

import axios from '../axios'

export async function getPosts() {
    const response = await axios.get(`/posts`)
    return response.data
}

export async function createPost(data) {
    const response = await axios.post(`/posts`, data)
    return response.data
}

export async function updatePost(postId, data) {
    const response = await axios.put(`/posts/${postId}`, data)
    return response.data
}

export async function deletePost(postId) {
    const response = await axios.delete(`/posts/${postId}`)
    return response.data
}

export async function getPostById(postId) {
    const response = await axios.get(`/posts/${postId}`)
    return response.data
}

export async function toggleLike(postId) {
    const response = await axios.post(`/posts/${postId}/like`)
    return response.data
}