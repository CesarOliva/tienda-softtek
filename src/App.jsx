import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Catalogo from './pages/Catalogo'
import Producto from './pages/Producto'
import Menu from './_components/Menu';
import Main from './pages/Main';

function Layout() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<Main />} />
          <Route path='/catalogo' element={<Catalogo />} />
          <Route path='/:productId' element={<Producto/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
