import { useState } from "react";
import { Cpu, Search, ShoppingCart, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useCart } from "../context/useCart";

const Menu = ({ searchQuery, setSearchQuery }) => {
    const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const [mostrarPerfil, setMostrarPerfil] = useState(false);
    const { cartCount } = useCart();

    return (
        <header className="border-b border-neutral-100/50 bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-[100]">
            <nav className="mx-auto flex max-w-4xl items-center justify-between px-8 py-6 text-sm text-neutral-200">
                <Link
                    to="/"
                    className="text-2xl tracking-wider text-neutral-400 flex items-center gap-2"
                >
                    <Cpu className="size-8" />
                    TechZone
                </Link>

                <div className="flex gap-6 relative">
                    <Search
                        className={`size-6 cursor-pointer transition-colors ${mostrarBusqueda ? 'text-[#fafafa]' : 'text-neutral-300 hover:text-[#fafafa]'}`}
                        onClick={() => {
                            setMostrarBusqueda(!mostrarBusqueda);
                            setMostrarCarrito(false);
                            setMostrarPerfil(false);
                            if (mostrarBusqueda) setSearchQuery('');
                        }}
                    />
                    <button
                        type="button"
                        aria-label={`Carrito con ${cartCount} productos`}
                        className="relative"
                        onClick={() => {
                            setMostrarCarrito(!mostrarCarrito);
                            setMostrarBusqueda(false);
                            setMostrarPerfil(false);
                        }}
                    >
                        <ShoppingCart className={`size-6 cursor-pointer transition-colors ${mostrarCarrito ? 'text-[#fafafa]' : 'text-neutral-300 hover:text-[#fafafa]'}`} />
                        {cartCount > 0 && <span className="absolute -right-3 -top-3 flex size-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-black">{cartCount}</span>}
                    </button>
                    <User
                        className={`size-6 cursor-pointer transition-colors ${mostrarPerfil ? 'text-[#fafafa]' : 'text-neutral-300 hover:text-[#fafafa]'}`}
                        onClick={() => {
                            setMostrarPerfil(!mostrarPerfil);
                            setMostrarBusqueda(false);
                            setMostrarCarrito(false);
                        }}
                    />

                    {mostrarPerfil && (
                        <div className="absolute right-0 top-10 w-48 bg-neutral-900 border border-neutral-800 rounded-md p-4 shadow-xl z-50 text-neutral-200">
                            <h4 className="font-semibold text-xs text-neutral-400 mb-2 uppercase tracking-wider">Mi Cuenta</h4>
                            <hr className="border-neutral-800 mb-2" />
                            <button className="w-full text-left text-sm py-1 hover:text-white transition-colors">Iniciar Sesión</button>
                            <button className="w-full text-left text-sm py-1 hover:text-white transition-colors">Registrarse</button>
                        </div>
                    )}

                    {mostrarCarrito && (
                        <Cart/>
                    )}
                </div>
            </nav>

            {mostrarBusqueda && (
                <div className="bg-neutral-900 border-t border-neutral-800/60 px-8 py-4">
                    <div className="mx-auto max-w-4xl flex items-center gap-3">
                        <Search className="size-5 text-neutral-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="¿Qué estás buscando? Escribe aquí..."
                            className="w-full bg-transparent text-neutral-200 placeholder-neutral-500 outline-none text-sm"
                            autoFocus
                        />
                        <button
                            onClick={() => {
                                setMostrarBusqueda(false);
                                setSearchQuery('');
                            }}
                            className="text-neutral-500 hover:text-neutral-200 transition-colors"
                        >
                            <X className="size-5" />
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Menu;
