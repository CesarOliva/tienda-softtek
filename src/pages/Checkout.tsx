import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, ChevronDown, Package, Truck } from "lucide-react";
import { States } from "../types/States";
import Input from "@/_components/Checkout/Input";
import { Product } from "@/types/Product";
import { useCart } from "@/context/useCart";
import ReactConfetti from "react-confetti";

const products: Product[] = [
    {
        product_id: 1,
        nombre: "Audífonos Inalámbricos Pro",
        precio: 1299,
        descripcion: "Audífonos inalámbricos de alta calidad",
        stock: 10,
        category_id: 1,
        imagen: "https://placehold.co/100x100/eeeeee/222222?text=🎧",
    },
    {
        product_id: 2,
        nombre: "Teclado Mecánico RGB",
        precio: 1599,
        descripcion: "Teclado mecánico con retroiluminación RGB",
        stock: 5,
        category_id: 2,
        imagen: "https://placehold.co/100x100/eeeeee/222222?text=⌨️",
    },
];

const Checkout = () => {
    const { items } = useCart();
    const [showConfetti, setShowConfetti] = useState(false);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        street: "",
        reference: "",
        colony: "",
        postalCode: "",
        city: "",
        state: "",
    });

    const total = items.reduce(
        (total, item) => total + item.precio * item.quantity,
        0
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
        }).format(price);
    };

    const handleBuy = (e: React.FormEvent) => {
        e.preventDefault();

        setShowConfetti(true);

        setTimeout(() => {
            setShowConfetti(false);
        }, 5000);
    };

    return (
        <main className="mx-auto flex md:min-h-screen max-w-6xl flex-col gap-8 px-8 md:justify-center mt-12 md:mb-24">
            {showConfetti && (
                <ReactConfetti
                    width={window.innerWidth-20}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={500}
                />
            )}
            <div className="mx-auto w-full">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Checkout</h1>
                    <span className="text-md mt-2 text-neutral-300">Realiza tu compra</span>
                </header>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
                    <form>
                        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5 sm:p-7">
                            <div className="mb-7 flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900">
                                    <Truck size={25} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold">Información de envío</h2>
                                    <p className="mt-1 text-sm text-neutral-400">Ingresa los datos donde quieres recibir tu pedido.</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="w-full">
                                    <Input label="Nombre completo" name="name" value={form.name} onChange={handleChange} placeholder="Nombre de quien recibe" required/>
                                </div>

                                <Input label="Calle y número" name="street" value={form.street} onChange={handleChange} placeholder="Calle y número" required />

                                <div>
                                    <label htmlFor="reference" className="mb-2 block text-sm font-medium text-neutral-300">
                                        Referencia <span className="ml-1 text-neutral-500">(opcional)</span>
                                    </label>

                                    <textarea
                                        id="reference"
                                        name="reference"
                                        value={form.reference}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Ej. Frente a la farmacia, casa color azul, etc."
                                        className="w-full resize-none rounded-lg border border-neutral-700  bg-neutral-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:outline-none"
                                    />
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <Input label="Colonia" name="colony" value={form.colony} onChange={handleChange} placeholder="Colonia" required/>
                                    <Input label="Código postal" name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="00000" maxLength={5} inputMode="numeric" required/>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <Input label="Ciudad" name="city" value={form.city} onChange={handleChange} placeholder="Ciudad" required/>

                                    <div>
                                        <label htmlFor="state" className="mb-2 block text-sm font-medium text-neutral-300" >Estado</label>

                                        <div className="relative">
                                            <select id="state" name="state" value={form.state} onChange={handleChange} required className="w-full appearance-none rounded-lg border border-neutral-700  bg-neutral-900 px-4 py-3 text-sm text-white outline-none transition focus:outline-none">
                                                <option value="" disabled>Estado</option>
                                                {States.map((state) => (
                                                    <option key={state} value={state}>{state}</option>
                                                ))}
                                            </select>

                                            <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </form>

                    <aside>
                        <div className="rounded-2xl border border-neutral-800  bg-neutral-900 p-5 sm:p-6">
                            <div className="mb-6 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900">
                                    <Package size={24} />
                                </div>

                                <div>
                                    <h2 className="font-semibold">Resumen de tu pedido</h2>
                                    <p className="mt-1 text-sm text-neutral-400">{items.length} productos</p>
                                </div>
                            </div>

                        {/* Products */}
                        <div className="space-y-5">
                            {items.map((item) => (
                                <Link
                                    to={`/producto-${item.product_id}`}
                                    key={item.product_id}
                                    className="flex gap-4 border-b border-neutral-800 pb-5"
                                >
                                    <img src={item.imagen || ""} alt={item.nombre} className="h-20 w-20 rounded-lg object-cover" />

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="text-sm font-semibold leading-5">{item.nombre}</h3>
                                                <p className="mt-2 text-xs text-neutral-500">Cantidad: {item.quantity}</p>
                                            </div>

                                            <span className="shrink-0 text-sm font-semibold">{formatPrice(item.precio)}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                            <div className="flex items-center justify-between pt-5">
                                <span className="text-lg font-semibold">Total</span>
                                <span className="text-2xl font-bold">{formatPrice(total)}</span>
                            </div>

                            <button
                                onClick={handleBuy}
                                className="w-full mt-4 flex items-center cursor-pointer text-lg gap-2 bg-neutral-200 hover:bg-neutral-300 py-2 px-6 rounded-lg text-black justify-center"
                            >
                                Pagar
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default Checkout;