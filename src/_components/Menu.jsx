import { Cpu, MapPin, Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

const Menu = ({ title = "Catálogo" }) => {
    return (
        <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-[100]">
            <nav className="mx-auto flex max-w-4xl items-center justify-between px-8 py-6 text-sm text-neutral-200">
                <Link
                    to="/"
                    className="text-2xl tracking-wider text-neutral-400 flex items-center gap-2"
                >
                    <Cpu className="size-8"/>
                    TechZone                    
                </Link>

                <div className="flex gap-6">
                    <Search className="size-6 text-neutral-300 hover:text-[#fafafa] cursor-pointer "/>
                    <ShoppingCart className="size-6 text-neutral-300 hover:text-[#fafafa] cursor-pointer"/>
                    <User className="size-6 text-neutral-300 hover:text-[#fafafa] cursor-pointer "/>
                </div>
            </nav>
        </header>
    );
};

export default Menu;