//Configurazione globale di axios. 
//Serve per indicare l'URL base per le chiamate API e per aggiungere ad ogni richiesta il token
import axios from 'axios'
//prefisso globale per tutti gli URL delle richieste
axios.defaults.baseURL = '/api/v1'
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

// Interceptor che interviene sulle risposte dal backend
axios.interceptors.response.use(
    (response) => {
        // Se la richiesta va a buon fine, restituiamo i dati normalmente
        return response;
    },
    (error) => {
        // Se il backend risponde con 401 (Non Autorizzato / Token scaduto)
        if (error.response && error.response.status === 401) {
            console.error("Sessione scaduta. Reindirizzamento al login.");
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Forziamo il riavvio dell'app sulla pagina di login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axios