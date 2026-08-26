import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Catalogo from './pages/Catalogo';
import Producto from './pages/Producto';
import Menu from './_components/Menu';
import ScrollToTop from './_components/scrollToTop';
import Footer from './_components/Footer';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import { Toaster } from 'sonner';

function Layout() {
  return (
    <>
      <Toaster position="bottom-center"/>
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
            <Route path= '/profile' element={<Profile/>} />
            <Route path='/catalogo' element={<Catalogo />} />
            <Route path='/:productId' element={<Producto />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
