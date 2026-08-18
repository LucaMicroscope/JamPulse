//Servizio per la gestione dell'autenticazione. Si occupa delle chiamate alle API dell'AuthController

import axios from '../axios'

export async function register(userData) {
    //axios prende userData e lo inserisce nel req.body della richiesta
    const response = await axios.post('/auth/register', userData)
    return response.data
}

export async function login(userData) {
    //axios prende userData e lo inserisce nel req.body della richiesta
    const response = await axios.post('/auth/login', userData)
    //se la risposta contiene il token, viene salvato nel localStorage
    if (response.data.token)
        localStorage.setItem('token', response.data.token)
    return response.data
}