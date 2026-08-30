// Servizio che si occupa delle chiamate alle API del CommentController

import axios from '../axios'

// GET /posts/:postId/comments
// Recupera tutti i commenti di un post, ordinati cronologicamente (dal backend).
export async function getComments(postId) {
    const response = await axios.get(`/posts/${postId}/comments`)
    return response.data
}

// POST /posts/:postId/comments
// Crea un nuovo commento e restituisce l'oggetto commento già popolato con l'autore.
// ! FIX: il backend risponde con { newComment: {...} } (oggetto wrappato),
// ! quindi estraiamo newComment per restituire direttamente il commento al chiamante.
export async function createComment(postId, data) {
    const response = await axios.post(`/posts/${postId}/comments`, data)
    return response.data.newComment // <-- estratto dall'oggetto wrappato
}

// PUT /posts/:postId/comments/:commentId
// Aggiorna il testo di un commento esistente (solo l'autore può farlo).
export async function updateComment(postId, commentId, data) {
    const response = await axios.put(`/posts/${postId}/comments/${commentId}`, data)
    return response.data
}

// DELETE /posts/:postId/comments/:commentId
// Elimina un commento (solo l'autore può farlo).
export async function deleteComment(postId, commentId) {
    const response = await axios.delete(`/posts/${postId}/comments/${commentId}`)
    return response.data
}