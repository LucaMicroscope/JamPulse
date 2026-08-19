//Servizio che si occupa delle chiamate alle API del CommentController

import axios from '../axios'

export async function getComments(postId) {
    const response = await axios.get(`/posts/${postId}/comments`)
    return response.data
}

export async function createComment(postId, data) {
    const response = await axios.post(`/posts/${postId}/comments`, data)
    return response.data
}

export async function updateComment(postId, commentId, data) {
    const response = await axios.put(`/posts/${postId}/comments/${commentId}`, data)
    return response.data
}

export async function deleteComment(postId, commentId) {
    const response = await axios.delete(`/posts/${postId}/comments/${commentId}`)
    return response.data
}