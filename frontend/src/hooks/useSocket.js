// Hook custom che gestisce tutta la logica di connessione a Socket.IO.
// Centralizzare qui la logica è buona pratica: Chat.jsx rimane pulito
// e se in futuro aggiungiamo altre pagine con real-time, riusiamo questo hook.

import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

// ! IMPORTANTE: questo URL deve corrispondere all'indirizzo del tuo server backend.
// ! Socket.IO si connette direttamente al server HTTP (NON alle rotte /api/...).
const SOCKET_SERVER_URL = 'http://localhost:4000'; // <- ATTENTO ALLA PORTA!!!
/**
 * Hook custom per gestire la connessione Socket.IO.
 *
 * @param {string|null} activeChatId - L'ID della chat attualmente aperta (o null se nessuna).
 * @param {function} onMessageReceived - Callback chiamata quando arriva un nuovo messaggio real-time.
 *                                       Riceve come argomento l'oggetto messaggio.
 * @returns {{ emitSendMessage: function }} - Funzione per emettere un messaggio via socket.
 */
export function useSocket(activeChatId, onMessageReceived) {
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

        // ! PULIZIA (cleanup): quando il componente Chat viene smontato (es. navigazione verso un'altra pagina),
        // ! disconnettiamo il socket per non lasciare connessioni aperte inutilmente.
        return () => {
            socketRef.current.disconnect();
            console.log('[Socket.IO] Disconnesso dal server');
        };
    }, []); // Solo al mount/unmount

    // ! Effetto 2: gestisce l'entrata/uscita dalle "stanze" quando cambia la chat attiva.
    // ! Viene rieseguito ogni volta che activeChatId cambia (es. l'utente clicca su un'altra chat).
    useEffect(() => {
        const socket = socketRef.current;

        // Se il socket non è ancora pronto o non c'è una chat aperta, non fare nulla
        if (!socket || !activeChatId) return;

        // Entriamo nella stanza della chat appena selezionata.
        // Il server userà questo ID per sapere a chi mandare i messaggi.
        socket.emit('join_chat', activeChatId);
        console.log(`[Socket.IO] Entrato nella stanza: ${activeChatId}`);

        // ! Registriamo il listener per i messaggi in arrivo.
        // ! Ogni volta che qualcun altro nella stessa chat invia un messaggio,
        // ! il server emette 'receive_message' e noi chiamiamo la callback.
        socket.on('receive_message', onMessageReceived);

        // ! PULIZIA: prima di cambiare stanza (o allo smontaggio),
        // ! usciamo dalla stanza corrente e rimuoviamo il listener.
        // ! Senza questo, ogni cambio di chat aggiungerebbe un listener in più (memory leak!).
        return () => {
            socket.emit('leave_chat', activeChatId);
            socket.off('receive_message', onMessageReceived);
            console.log(`[Socket.IO] Uscito dalla stanza: ${activeChatId}`);
        };
    }, [activeChatId, onMessageReceived]); // Riesegui quando cambia la chat o la callback

    /**
     * Emette un messaggio tramite socket al server.
     * Va chiamata DOPO che il messaggio è già stato salvato nel DB via REST API,
     * così possiamo passare l'oggetto completo (con _id, senderID popolato, ecc.).
     *
     * @param {string} chatId - L'ID della chat destinataria.
     * @param {object} message - L'oggetto messaggio completo restituito dal backend.
     */
    function emitSendMessage(chatId, message) {
        if (socketRef.current) {
            socketRef.current.emit('send_message', { chatId, message });
        }
    }

    // Esponiamo solo la funzione di invio: è l'unica cosa di cui Chat.jsx ha bisogno
    return { emitSendMessage };
}