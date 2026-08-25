import { useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Catalogo from './pages/Catalogo';
import Producto from './pages/Producto';
import Menu from './_components/Menu';
import ScrollToTop from './_components/scrollToTop';
import Footer from './_components/Footer';
import Main from './pages/Main';

function Layout({ searchQuery, setSearchQuery }) {
  return (
    <>
      <Menu searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ScrollToTop />
      <Outlet context={{ searchQuery }} />
      <Footer />
    </>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}>
          <Route path='/' element={<Main />} />
          <Route path='/catalogo' element={<Catalogo />} />
          <Route path='/:productId' element={<Producto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
