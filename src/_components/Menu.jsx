import { Link } from "react-router-dom";

const Menu = ({ title = "Catálogo" }) => {
    return (
        <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-10">
            <nav className="mx-auto flex max-w-4xl items-center justify-between px-8 py-4 text-sm text-neutral-200">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-3 py-2 font-medium text-neutral-100 transition hover:bg-neutral-800"
                >
                    ← Volver al catálogo
                </Link>

                <span className="uppercase tracking-[0.3em] text-neutral-400">{title}</span>
            </nav>
        </header>
    );
};

export default Menu;