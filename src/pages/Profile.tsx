import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/useAuth";
import { ChevronDown, LogOut, Mail, MapPin, Plus, ShoppingBag } from "lucide-react";
import { Address, HistoryRow, Product, Purchase, PurchasedProduct } from "@/types/Profile";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, signOut } = useAuth(); 
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState(0);
    const [history, setHistory] = useState<HistoryRow[]>([]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return; // nos aseguramos q no llegamos aqui sin sesion

        const loadProfileData = async () => {
            setIsDataLoading(true);
            setError(null);

            const userId = user.id;

            const [addressResult, purchaseResult] = await Promise.all([
                supabase
                    .from("addresses")
                    .select("address_id, calle, colonia, cp, ciudad, estado, referencia")
                    .eq("user_id", userId),
                supabase
                    .from("purchases")
                    .select("purchase_id, fecha")
                    .eq("user_id", userId)
                    .order("fecha", { ascending: false }),
            ]);

            if (addressResult.error || purchaseResult.error) {
                setError("No se pudo consultar la información del perfil.");
                setIsDataLoading(false);
                return;
            }

            setAddresses((addressResult.data ?? []) as Address[]);

            const purchases = (purchaseResult.data ?? []) as Purchase[];
            if (purchases.length === 0) {
                setHistory([]);
                setIsDataLoading(false);
                return;
            }

            const purchaseIds = purchases.map((purchase) => purchase.purchase_id);
            const { data: purchasedProductsData, error: purchasedProductsError } =
                await supabase
                    .from("purchased_products")
                    .select("purchase_id, product_id, cantidad")
                    .in("purchase_id", purchaseIds);

            if (purchasedProductsError) {
                setError("No se pudo consultar los productos comprados.");
                setIsDataLoading(false);
                return;
            }

            const purchasedProducts = (purchasedProductsData ?? []) as PurchasedProduct[];
            if (purchasedProducts.length === 0) {
                setHistory([]);
                setIsDataLoading(false);
                return;
            }

            const productIds = [...new Set(purchasedProducts.map((item) => item.product_id))];
            const { data: productsData, error: productsError } = await supabase
                .from("products")
                .select("product_id, nombre, precio")
                .in("product_id", productIds);

            if (productsError) {
                setError("No se pudo consultar la información de los productos.");
                setIsDataLoading(false);
                return;
            }

            const purchasesById = new Map(
                purchases.map((purchase) => [purchase.purchase_id, purchase.fecha]),
            );
            const productsById = new Map(
                ((productsData ?? []) as Product[]).map((product) => [product.product_id, product]),
            );

            setHistory(
                purchasedProducts.flatMap((item) => {
                    const product = productsById.get(item.product_id);
                    const fecha = purchasesById.get(item.purchase_id);

                    return product && fecha
                        ? [{ ...item, fecha, nombre: product.nombre, precio: product.precio }]
                        : [];
                }),
            );
            setIsDataLoading(false);
        };

        loadProfileData();
    }, [user]);

    if (!user) return null; 

    const displayName = user.user_metadata?.display_name || "Usuario";
    const email = user.email || "Sin correo";
    const currentAddress = addresses[selectedAddress];
    const formatPrice = (price: number) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(price);
    const formatDate = (date: string) => new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" }).format(new Date(date));

    const handleSignOut = async () => {
        setIsSigningOut(true);

        const { error: signOutError } = await signOut();

        setIsSigningOut(false);

        if (signOutError) {
            setError("No se pudo cerrar la sesión.");
            return;
        }

        navigate("/");
    };

    return (
        <main className="min-h-screen bg-neutral-950 text-white">
            <section className="bg-neutral-800 border-b border-neutral-700">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-neutral-900 text-white flex items-center justify-center text-3xl font-semibold shadow-md shrink-0">
                                {displayName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm text-neutral-300 mb-1">Mi perfil</p>
                                <h1 className="text-3xl font-bold text-white">{displayName}</h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <Mail className="w-4 h-4 text-neutral-400" />
                                    <p className="text-sm text-neutral-400">{email}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    disabled={isSigningOut}
                                    className="cursor-pointer mt-6 inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-200 transition hover:border-neutral-500 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <LogOut className="w-4 h-4" />
                                    {isSigningOut ? "Cerrando sesión..." : "Cerrar sesión"}
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-neutral-300" />
                                    <div>
                                        <h2 className="text-lg font-semibold text-white">Mi dirección</h2>
                                        <p className="text-xs text-neutral-400">Dirección de envío</p>
                                    </div>
                                </div>
                                <button type="button" className="hidden flex items-center gap-1 text-sm text-neutral-300 hover:text-white transition">
                                    <Plus className="w-4 h-4" />
                                    Agregar
                                </button>
                            </div>

                            {addresses.length > 1 && (
                                <div className="relative mb-4 rounded-xl overflow-hidden">
                                    <select
                                        value={selectedAddress}
                                        onChange={(event) => setSelectedAddress(Number(event.target.value))}
                                        className="w-full appearance-none bg-neutral-700 border border-neutral-600 px-4 py-2.5 pr-10 text-sm text-white focus:outline-none focus:border-neutral-400 cursor-pointer"
                                    >
                                        {addresses.map((address, index) => (
                                            <option key={address.address_id} value={index}>
                                                Dirección {index + 1}
                                                {index === 0 ? " (Principal)" : ""}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                                </div>
                            )}

                            {isDataLoading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <div key={index} className="h-4 rounded bg-neutral-700 animate-pulse" />
                                    ))}
                                </div>
                            ) : currentAddress ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-neutral-300">
                                    <p><span className="text-neutral-500">Calle:</span> {currentAddress.calle || "Sin información"}</p>
                                    <p><span className="text-neutral-500">Colonia:</span> {currentAddress.colonia || "Sin información"}</p>
                                    <p><span className="text-neutral-500">Código postal:</span> {currentAddress.cp || "Sin información"}</p>
                                    <p><span className="text-neutral-500">Ciudad:</span> {currentAddress.ciudad || "Sin información"}</p>
                                    <p><span className="text-neutral-500">Estado:</span> {currentAddress.estado || "Sin información"}</p>
                                    <p><span className="text-neutral-500">Referencia:</span> {currentAddress.referencia || "Sin información"}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-neutral-400">No hay una dirección registrada.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-10">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white">Historial de compras</h2>
                    <p className="text-sm text-neutral-400 mt-1">Compras que has realizado en nuestra tienda.</p>
                </div>

                {error ? (
                    <div className="rounded-xl border border-red-900/60 bg-red-950/30 p-5 text-sm text-red-300">{error}</div>
                ) : isDataLoading ? (
                    <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-neutral-800 bg-neutral-900/80 text-xs uppercase tracking-wide text-neutral-500">
                                <tr>
                                    <th className="px-5 py-4">ID de compra</th>
                                    <th className="px-5 py-4">Producto</th>
                                    <th className="px-5 py-4">Cantidad</th>
                                    <th className="px-5 py-4">Precio</th>
                                    <th className="px-5 py-4">Fecha de compra</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-4"><div className="h-4 w-20 rounded bg-neutral-800 animate-pulse" /></td>
                                        <td className="px-5 py-4"><div className="h-4 w-40 rounded bg-neutral-800 animate-pulse" /></td>
                                        <td className="px-5 py-4"><div className="h-4 w-10 rounded bg-neutral-800 animate-pulse" /></td>
                                        <td className="px-5 py-4"><div className="h-4 w-24 rounded bg-neutral-800 animate-pulse" /></td>
                                        <td className="px-5 py-4"><div className="h-4 w-28 rounded bg-neutral-800 animate-pulse" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : history.length === 0 ? (
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-8 text-center">
                        <ShoppingBag className="w-8 h-8 mx-auto mb-3 text-neutral-500" />
                        <p className="text-neutral-400">Aún no tienes compras registradas.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-neutral-800 bg-neutral-900/80 text-xs uppercase tracking-wide text-neutral-500">
                                <tr>
                                    <th className="px-5 py-4">ID de compra</th>
                                    <th className="px-5 py-4">Producto</th>
                                    <th className="px-5 py-4">Cantidad</th>
                                    <th className="px-5 py-4">Precio</th>
                                    <th className="px-5 py-4">Fecha de compra</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800 text-neutral-300">
                                {history.map((item) => (
                                    <tr key={`${item.purchase_id}-${item.product_id}`}>
                                        <td className="px-5 py-4 text-white">#{item.purchase_id}</td>
                                        <td className="px-5 py-4">{item.nombre}</td>
                                        <td className="px-5 py-4">{item.cantidad}</td>
                                        <td className="px-5 py-4">{formatPrice(item.precio)}</td>
                                        <td className="px-5 py-4">{formatDate(item.fecha)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Profile;