//Configurazione globale di axios. 
//Serve per indicare l'URL base per le chiamate API e per aggiungere ad ogni richiesta il token
import axios from 'axios'
//prefisso globale per tutti gli URL delle richieste
axios.defaults.baseURL = 'http://localhost:4000/api/v1'
//Interceptor che interviene prima che ogni richiesta parta verso il backend
//config contiene tutte le informazioni della richiesta
axios.interceptors.request.use((config) => {
    //recupero del token dal local Storage
    const token = localStorage.getItem('token')
    if (token)
        //Aggiunta del token nell'Authorization Header della richiesta
        config.headers.Authorization = `Bearer ${token}`
    return config
},
    //funzione che gestisce i casi in cui la generazione della richiesta fallisce
    //restituisce una promise rifiutata in modo da attivare il blocco catch
    (error) => {
        return Promise.reject(error)
    })

export default axios