// Hook custom che gestisce tutta la logica di connessione a Socket.IO.
// Centralizzare qui la logica è buona pratica: Chat.jsx e PostDetail.jsx rimangono puliti
// e se in futuro aggiungiamo altre pagine con real-time, riusiamo questo hook.

import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

// ! IMPORTANTE: questo URL deve corrispondere all'indirizzo del tuo server backend.
// ! Socket.IO si connette direttamente al server HTTP (NON alle rotte /api/...).
const SOCKET_SERVER_URL = 'http://localhost:4000'; // <- ATTENTO ALLA PORTA!!!

/**
 * Hook custom per gestire la connessione Socket.IO.
 * Supporta sia la chat real-time che i commenti real-time sui post.
 *
 * @param {string|null} activeChatId    - L'ID della chat aperta (o null se nessuna).
 * @param {function}    onMessageReceived - Callback per nuovi messaggi in chat.
 * @param {string|null} activePostId    - L'ID del post aperto (o null se nessuno).
 * @param {function}    onCommentReceived - Callback per nuovi commenti real-time.
 * @returns {{ emitSendMessage, emitSendComment }} - Funzioni per emettere eventi.
 */
export function useSocket(activeChatId, onMessageReceived, activePostId, onCommentReceived) {
    // ! useRef invece di useState: vogliamo conservare il riferimento al socket
    // ! tra i re-render senza che cambiarlo causi un nuovo render.
    // ! socketRef.current conterrà l'istanza della connessione socket.
    const socketRef = useRef(null);

    // ! Effetto 1: gestisce la connessione/disconnessione del socket al mount/unmount.
    // ! L'array di dipendenze vuoto [] garantisce che giri UNA SOLA VOLTA all'avvio.
    useEffect(() => {
        // Creiamo la connessione WebSocket al server
        socketRef.current = io(SOCKET_SERVER_URL);

        console.log('[Socket.IO] Connessione al server stabilita');

        // ! PULIZIA (cleanup): quando il componente viene smontato (es. navigazione),
        // ! disconnettiamo il socket per non lasciare connessioni aperte inutilmente.
        return () => {
            socketRef.current.disconnect();
            console.log('[Socket.IO] Disconnesso dal server');
        };
    }, []); // Solo al mount/unmount

    // ! Effetto 2: gestisce l'entrata/uscita dalle stanze CHAT quando cambia la chat attiva.
    // ! Viene rieseguito ogni volta che activeChatId o onMessageReceived cambiano.
    useEffect(() => {
        const socket = socketRef.current;

        // Se il socket non è ancora pronto o non c'è una chat aperta, non fare nulla
        if (!socket || !activeChatId) return;

        // Entriamo nella stanza della chat appena selezionata
        socket.emit('join_chat', activeChatId);
        console.log(`[Socket.IO] Entrato nella stanza chat: ${activeChatId}`);

        // ! Registriamo il listener per i messaggi in arrivo dalla chat.
        socket.on('receive_message', onMessageReceived);

        // ! PULIZIA: prima di cambiare stanza (o allo smontaggio),
        // ! usciamo e rimuoviamo il listener per evitare memory leak.
        return () => {
            socket.emit('leave_chat', activeChatId);
            socket.off('receive_message', onMessageReceived);
            console.log(`[Socket.IO] Uscito dalla stanza chat: ${activeChatId}`);
        };
    }, [activeChatId, onMessageReceived]);

    // ! Effetto 3: gestisce l'entrata/uscita dalle stanze POST quando cambia il post aperto.
    // ! Struttura identica all'effetto della chat, ma per i commenti.
    // ! Viene rieseguito ogni volta che activePostId o onCommentReceived cambiano.
    useEffect(() => {
        const socket = socketRef.current;

        // Se il socket non è pronto o nessun post è aperto, usciamo subito
        if (!socket || !activePostId) return;

        // Entriamo nella stanza del post per ricevere i nuovi commenti
        socket.emit('join_post', activePostId);
        console.log(`[Socket.IO] Entrato nella stanza post: ${activePostId}`);

        // ! Ascoltiamo l'evento 'receive_comment' emesso dal server quando
        // ! qualcun altro aggiunge un commento allo stesso post.
        socket.on('receive_comment', onCommentReceived);

        // ! PULIZIA: quando il PostDetail viene smontato (utente chiude il post),
        // ! usciamo dalla stanza e rimuoviamo il listener.
        return () => {
            socket.emit('leave_post', activePostId);
            socket.off('receive_comment', onCommentReceived);
            console.log(`[Socket.IO] Uscito dalla stanza post: ${activePostId}`);
        };
    }, [activePostId, onCommentReceived]);

    /**
     * Emette un messaggio di CHAT tramite socket al server.
     * Va chiamata DOPO che il messaggio è già stato salvato nel DB via REST API.
     *
     * @param {string} chatId   - L'ID della chat destinataria.
     * @param {object} message  - L'oggetto messaggio completo restituito dal backend.
     */
    function emitSendMessage(chatId, message) {
        if (socketRef.current) {
            socketRef.current.emit('send_message', { chatId, message });
        }
    }

    /**
     * Emette un nuovo COMMENTO tramite socket al server.
     * Va chiamata DOPO che il commento è già stato salvato nel DB via REST API,
     * così passiamo l'oggetto completo (con _id, authorId popolato, ecc.).
     *
     * @param {string} postId   - L'ID del post a cui appartiene il commento.
     * @param {object} comment  - L'oggetto commento completo restituito dal backend.
     */
    function emitSendComment(postId, comment) {
        if (socketRef.current) {
            socketRef.current.emit('send_comment', { postId, comment });
        }
    }

    // Esponiamo entrambe le funzioni di invio
    return { emitSendMessage, emitSendComment };
}