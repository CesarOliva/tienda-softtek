import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Catalogo from './pages/Catalogo'
import Producto from './pages/Producto'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Catalogo />} />
        <Route path='/:productId' element={<Producto/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
