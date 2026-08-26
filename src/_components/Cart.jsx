import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/useCart";
import { Link } from "react-router-dom";

const Cart = () => {
    const { items, addItem, removeItem, clearCart, cartTotal } = useCart();

    return ( 
        <div className="absolute right-0 top-10 z-50 w-80 rounded-md border border-neutral-800 bg-neutral-900 p-4 text-neutral-200 shadow-xl">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">Tu carrito</h4>
            <hr className="mb-2 border-neutral-800" />
            {items.length === 0 ? (
                <p className="py-4 text-center text-xs text-neutral-500">El carrito está vacío</p>
            ) : (
                <>
                    <div className="max-h-72 space-y-3 overflow-y-auto">
                        {items.map((item) => (
                            <Link to={`/producto-${item.product_id}`} key={item.product_id} className="flex gap-3 text-sm">
                                <img src={item.imagen} alt={item.nombre} className="size-14 rounded object-cover" />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-medium">{item.nombre}</p>
                                    <p className="text-xs text-neutral-400">${Number(item.precio).toLocaleString("es-MX", { minimumFractionDigits: 2 })} c/u</p>
                                    <div className="mt-1 flex items-center gap-2">
                                        <button type="button" aria-label={`Quitar una unidad de ${item.nombre}`} onClick={() => removeItem(item.product_id)} className="rounded bg-neutral-800 p-1 hover:bg-neutral-700 cursor-pointer"><Minus className="size-3" /></button>
                                        <span className="min-w-4 text-center text-xs">{item.quantity}</span>
                                        <button type="button" aria-label={`Agregar una unidad de ${item.nombre}`} disabled={item.quantity >= item.stock} onClick={() => addItem(item)} className="rounded bg-neutral-800 p-1 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"><Plus className="size-3" /></button>
                                        <button type="button" aria-label={`Eliminar ${item.nombre}`} onClick={() => removeItem(item.product_id)} className="ml-auto text-neutral-500 hover:text-white cursor-pointer"><Trash2 className="size-3" /></button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-4 mb-2 flex justify-between border-t border-neutral-800 pt-3 text-sm font-semibold">
                        <span>Total</span>
                        <span>${cartTotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                    </div>

                    <div className="flex flex-col md:flex-row w-full items-center gap-2">
                        <button
                            type="button"
                            onClick={clearCart}
                            className="w-full md:w-1/2 disabled:cursor-not-allowed cursor-pointer text-sm gap-2 bg-neutral-800 hover:bg-neutral-700 py-2 px-6 rounded-lg"
                        >
                            Vaciar carrito
                        </button>

                        <button
                            type="button"
                            onClick={() => {}}
                            className="flex items-center w-full md:w-1/2 cursor-pointer text-sm gap-2 bg-neutral-200 hover:bg-neutral-300 py-2 px-6 rounded-lg text-black justify-center"
                        >
                            Pagar
                        </button>
                    </div>
                </>
            )}
        </div>
     );
}
 
export default Cart;