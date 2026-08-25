<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Catalogo from './pages/Catalogo'
import Producto from './pages/Producto'
=======
import { useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Catalogo from './pages/Catalogo';
import Producto from './pages/Producto';
import Menu from './_components/Menu';
import Footer from './_components/Footer';
import Main from './pages/Main';
import Register from "./pages/Register";
import Login from "./pages/Login";



function Layout({ searchQuery, setSearchQuery }) {
  return (
    <>
      <Menu searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Outlet context={{ searchQuery }} />
      <Footer />
    </>
  );
}
>>>>>>> cf7f669 (Crear usuario/login)

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path='/' element={<Catalogo />} />
        <Route path='/:productId' element={<Producto/>} />
=======
        <Route element={<Layout searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}>
          <Route path='/' element={<Main />} />
          <Route path='/catalogo' element={<Catalogo />} />
          <Route path='/:productId' element={<Producto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
>>>>>>> cf7f669 (Crear usuario/login)
      </Routes>
    </BrowserRouter>
  )
}

export default App
