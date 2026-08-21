import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import CreatePost from "./pages/CreatePost";
import PageLayout from "./components/PageLayout";

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  // Se l'utente non è loggato, lo cacciamo e lo mandiamo al login
  if (!user)
    return <Navigate to='/login' replace /> //replace serve per modificare la cronologia e mostrare anche li solo la pagina Login invece di Home -> Login
  // Se è loggato, gli mostriamo normalmente la pagina richiesta
  return children

}

// Componente principale dell'applicazione.
// Qui vengono definite le route principali e il layout condiviso che racchiude le pagine interne.
export default function App() {
  return (
    <>
      <Routes>
        {/* Pagina di accesso, visibile senza il layout laterale. */}
        <Route path="/login" element={<Login />} />

        {/* Tutte le pagine interne condividono il layout comune: la Sidebar. */}
        <Route element={<ProtectedRoute><PageLayout /></ProtectedRoute>}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* /profile/:id = profilo di un altro utente (stesso componente, ID diverso) */}
          <Route path="/profile/:id" element={<Profile />} />
          
          <Route path="/chat" element={<Chat />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  )
}