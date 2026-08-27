import { useEffect, useRef, useState } from "react";
import { Cpu, Search as SearchIcon, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import ProductSearch from "./Search";
import Cart from "./Cart";
import { useCart } from "../context/useCart";

const Menu = () => {
    const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const navRef = useRef<HTMLElement | null>(null);
    const { cartCount } = useCart();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setMostrarCarrito(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setMostrarBusqueda(false);
                setMostrarCarrito(false);
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    return (
        <header className="sticky top-0 z-100 border-b border-neutral-100/50 bg-neutral-950/80 backdrop-blur-sm">
            <nav
                ref={navRef}
                className="mx-auto flex flex-col md:flex-row md:space-y-0 max-w-5xl items-center justify-between px-8 py-6 text-sm text-neutral-200"
            >
                <div className="w-full md:w-auto flex items-center justify-around mb-4 md:mb-0 ">
                    <Link to="/" className="flex items-center gap-2 text-2xl tracking-wider text-neutral-400">
                        <Cpu className="size-8" />
                        TechZone
                    </Link>

                    <div className="flex md:hidden relative gap-6">
                        <button
                            type="button"
                            className={`relative transition-colors ${mostrarCarrito ? "text-[#fafafa]" : "text-neutral-300 hover:text-[#fafafa]"} cursor-pointer`}
                            onClick={() => {
                                setMostrarCarrito(!mostrarCarrito);
                                setMostrarBusqueda(false);
                            }}
                            aria-label="Abrir carrito"
                        >
                            <ShoppingCart className={`size-6 cursor-pointer transition-colors ${mostrarCarrito ? 'text-[#fafafa]' : 'text-neutral-300 hover:text-[#fafafa]'}`} />
                            {cartCount > 0 && <span className="absolute -right-3 -top-3 flex size-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-black">{cartCount}</span>}
                        </button>
                        
                        <Link
                            to={"/login"}
                            type="button"
                            className={`flex items-center gap-2 cursor-pointer transition-colors text-neutral-300 hover:text-[#fafafa]'}`}
                            onClick={() => {
                                setMostrarBusqueda(false);
                                setMostrarCarrito(false);
                            }}
                            aria-label="Abrir perfil"
                        >
                            <User className="size-6" />
                        </Link>

                        {mostrarCarrito && (
                            <Cart/>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className={`flex items-center gap-2 transition-colors bg-neutral-900 py-2 px-4 w-96 justify-between rounded-md ${mostrarBusqueda ? "text-[#fafafa]" : "text-neutral-300 hover:text-[#fafafa]"} cursor-pointer`}
                        onClick={() => {
                            setMostrarBusqueda(!mostrarBusqueda);
                            setMostrarCarrito(false);
                        }}
                        aria-label="Buscar productos"
                    >
                        <span className="text-sm">Buscar productos</span>
                        <SearchIcon className="size-6" />
                    </button>
                </div>

                <div className="hidden md:flex relative gap-6">
                    <button
                        type="button"
                        className={`relative transition-colors ${mostrarCarrito ? "text-[#fafafa]" : "text-neutral-300 hover:text-[#fafafa]"} cursor-pointer`}
                        onClick={() => {
                            setMostrarCarrito(!mostrarCarrito);
                            setMostrarBusqueda(false);
                        }}
                        aria-label="Abrir carrito"
                    >
                        <ShoppingCart className={`size-6 cursor-pointer transition-colors ${mostrarCarrito ? 'text-[#fafafa]' : 'text-neutral-300 hover:text-[#fafafa]'}`} />
                        {cartCount > 0 && <span className="absolute -right-3 -top-3 flex size-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-black">{cartCount}</span>}
                    </button>
                    
                    <Link
                        to={"/login"}
                        type="button"
                        className={`flex items-center gap-2 cursor-pointer transition-colors text-neutral-300 hover:text-[#fafafa]'}`}
                        onClick={() => {
                            setMostrarBusqueda(false);
                            setMostrarCarrito(false);
                        }}
                        aria-label="Abrir perfil"
                    >
                        <User className="size-6" />
                        <span>Iniciar sesión</span>
                    </Link>

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
