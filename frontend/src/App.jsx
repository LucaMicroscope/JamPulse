import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import CreatePost from "./pages/CreatePost";
import PageLayout from "./components/PageLayout";

// Componente principale dell'applicazione.
// Qui vengono definite le route principali e il layout condiviso che racchiude le pagine interne.
export default function App() {
  return (
    <>
      <Routes>
        {/* Pagina di accesso, visibile senza il layout laterale. */}
        <Route path="/login" element={<Login />} />

        {/* Tutte le pagine interne condividono il layout comune: la Sidebar. */}
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  )
}