import { Link } from "react-router-dom";

const Menu = ({ title = "Catálogo" }) => {
    return (
        <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-10">
            <nav className="mx-auto flex max-w-4xl items-center justify-between px-8 py-4 text-sm text-neutral-200">
                <Link
                    to="/"
                    className="text-3xl uppercase tracking-[0.3em] text-neutral-400"
                >
                    Tienda
                </Link>

            </nav>
        </header>
    );
};

export default Menu;