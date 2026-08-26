import { useEffect, useRef, useState } from "react";
import { Cpu, Search as SearchIcon, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import ProductSearch from "./Search";
import Cart from "./Cart";
import { useCart } from "../context/useCart";

const Menu = () => {
    const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const [mostrarPerfil, setMostrarPerfil] = useState(false);
    const navRef = useRef(null);
    const { cartCount } = useCart();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setMostrarCarrito(false);
                setMostrarPerfil(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setMostrarBusqueda(false);
                setMostrarCarrito(false);
                setMostrarPerfil(false);
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    return (
        <header className="sticky top-0 z-[100] border-b border-neutral-100/50 bg-neutral-950/80 backdrop-blur-sm">
            <nav
                ref={navRef}
                className="mx-auto flex max-w-4xl items-center justify-between px-8 py-6 text-sm text-neutral-200"
            >
                <Link to="/" className="flex items-center gap-2 text-2xl tracking-wider text-neutral-400">
                    <Cpu className="size-8" />
                    TechZone
                </Link>

                <div className="relative flex gap-6">
                    <button
                        type="button"
                        className={`transition-colors ${mostrarBusqueda ? "text-[#fafafa]" : "text-neutral-300 hover:text-[#fafafa]"} cursor-pointer`}
                        onClick={() => {
                            setMostrarBusqueda(!mostrarBusqueda);
                            setMostrarCarrito(false);
                            setMostrarPerfil(false);
                        }}
                        aria-label="Buscar productos"
                    >
                        <SearchIcon className="size-6" />
                    </button>
                    <button
                        type="button"
                        className={`relative transition-colors ${mostrarCarrito ? "text-[#fafafa]" : "text-neutral-300 hover:text-[#fafafa]"} cursor-pointer`}
                        onClick={() => {
                            setMostrarCarrito(!mostrarCarrito);
                            setMostrarBusqueda(false);
                            setMostrarPerfil(false);
                        }}
                        aria-label="Abrir carrito"
                    >
                        <ShoppingCart className={`size-6 cursor-pointer transition-colors ${mostrarCarrito ? 'text-[#fafafa]' : 'text-neutral-300 hover:text-[#fafafa]'}`} />
                        {cartCount > 0 && <span className="absolute -right-3 -top-3 flex size-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-black">{cartCount}</span>}
                    </button>
                    
                    <button
                        type="button"
                        className={`size-6 cursor-pointer transition-colors ${mostrarPerfil ? 'text-[#fafafa]' : 'text-neutral-300 hover:text-[#fafafa]'}`}
                        onClick={() => {
                            setMostrarPerfil(!mostrarPerfil);
                            setMostrarBusqueda(false);
                            setMostrarCarrito(false);
                        }}
                        aria-label="Abrir perfil"
                    >
                        <User className="size-6" />
                    </button>

                    {mostrarPerfil && (
                        <div className="absolute right-0 top-10 z-50 w-48 rounded-md border border-neutral-800 bg-neutral-900 p-4 text-neutral-200 shadow-xl">
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">Mi cuenta</h4>
                            <hr className="mb-2 border-neutral-800" />
                            <div className="flex w-full flex-col">
                                <Link to="/login" className="w-full py-1 text-left text-sm transition-colors hover:text-white">Iniciar sesión</Link>
                                <Link to="/register" className="w-full py-1 text-left text-sm transition-colors hover:text-white">Registrarse</Link>
                            </div>
                        </div>
                    )}

                    {mostrarCarrito && (
                        <Cart/>
                    )}
                </div>
            </nav>

            <ProductSearch open={mostrarBusqueda} onOpenChange={setMostrarBusqueda} />
        </header>
    );
};

export default Menu;
