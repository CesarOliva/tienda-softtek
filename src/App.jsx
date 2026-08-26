import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Catalogo from './pages/Catalogo';
import Producto from './pages/Producto';
import Menu from './_components/Menu';
import ScrollToTop from './_components/scrollToTop';
import Footer from './_components/Footer';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import { CartProvider } from './context/CartContext';

function Layout() {
  return (
    <>
      <Menu />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/catalogo' element={<Catalogo />} />
            <Route path='/:productId' element={<Producto />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
