import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Package, Truck } from "lucide-react";
import { States } from "../types/States";
import Input from "@/_components/Checkout/Input";
import { useCart } from "@/context/useCart";
import ReactConfetti from "react-confetti";
import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/types/Product";
import { addProductImage } from "@/lib/productImages";
import { toast } from "sonner";

const Checkout = () => {
    const navigate = useNavigate();
    const { items, refreshStock } = useCart();
    const [showConfetti, setShowConfetti] = useState(false);
    const [isCheckingStock, setIsCheckingStock] = useState(true);

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const productstate = location.state;
    const directProductId = productstate?.product?.product_id ?? productstate?.id;
    const isDirectPurchase = typeof directProductId === "number";

    useEffect(() => {
        async function getProduct() {
            if (!isDirectPurchase) {
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("products")
                .select()
                .eq("product_id", directProductId)
                .maybeSingle();

            if (error) {
                console.error("Error fetching product:", error);
            }

            if (!data) {
                setProduct(null);
                setIsLoading(false);
                return;
            }

            const { data: images, error: imagesError } = await supabase
                .from("images")
                .select("ruta")
                .eq("product_id", directProductId)
                .limit(1);

            if (imagesError) {
                console.error("Error fetching product images:", imagesError);
            }

            setProduct(addProductImage({ ...data, images: images ?? [] }));
            setIsLoading(false);
        }

        getProduct();
    }, [directProductId, isDirectPurchase]);

    const [form, setForm] = useState({
        name: "",
        street: "",
        reference: "",
        colony: "",
        postalCode: "",
        city: "",
        state: "",
    });

    const validateForm = () => {
        return Object.values(form).every(
            (value) => value.trim() !== ""
        );
    };

    const cartTotal = items.reduce(
        (total, item) => total + item.precio * item.quantity,
        0
    );
    const total = isDirectPurchase && product ? product.precio : cartTotal;
    const hasUnavailableItems = items.some((item) => item.stock <= 0 || item.quantity > item.stock);

    useEffect(() => {
        refreshStock().finally(() => setIsCheckingStock(false));
    }, []);

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

    const handleBuy = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsCheckingStock(true);
        const stockIsAvailable = await refreshStock();
        setIsCheckingStock(false);

        if (!stockIsAvailable || hasUnavailableItems) {
            toast.error("Algunos productos no están disponibles.");
            return;
        }

        if (!validateForm()) {
            toast.error("Completa todos los campos del formulario.");
            return;
        }

        setShowConfetti(true);
        toast.success("Compra realizada con éxito.");
        setTimeout(() => {
            setShowConfetti(false);
            navigate("/profile");
        }, 5000);

    };

    return (
        <main className="mx-auto flex md:min-h-screen max-w-5xl flex-col gap-8 px-8 md:justify-center mt-12 mb-8 md:mb-24">
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

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">
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
                            {isDirectPurchase && product ? (
                                <Link
                                    to={`/producto-${product.product_id}`}
                                    key={product.product_id}
                                    className="flex gap-4 border-b border-neutral-800 pb-5"
                                >
                                    <img src={product.imagen || ""} alt={product.nombre} className="h-20 w-20 rounded-lg object-cover" />

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="text-sm font-semibold leading-5">{product.nombre}</h3>
                                                <p className="mt-2 text-xs text-neutral-500">Cantidad: 1</p>
                                            </div>

                                            <span className="shrink-0 text-sm font-semibold">{formatPrice(product.precio)}</span>
                                        </div>
                                    </div>
                                </Link>
                            ) : isDirectPurchase ? (
                                <p className="text-sm text-neutral-400">
                                    {isLoading ? "Cargando producto..." : "El producto ya no está disponible."}
                                </p>
                            ) : (
                                <>
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
                                </>
                            )}
                        </div>

                            <div className="flex items-center justify-between pt-5">
                                <span className="text-lg font-semibold">Total</span>
                                <span className="text-2xl font-bold">{formatPrice(total)}</span>
                            </div>

                            <button
                                onClick={handleBuy}
                                disabled={isCheckingStock || hasUnavailableItems }
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-200 px-6 py-2 text-lg text-black hover:bg-neutral-300 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
                            >
                                {isCheckingStock ? "Verificando stock" : hasUnavailableItems ? "Producto agotado" : "Pagar"}
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
