import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PackageSearch } from "lucide-react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { supabase } from "@/lib/supabaseClient";
import { addProductImage } from "@/lib/productImages";
import type { Product } from "../../types/Product";

type SearchProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const Search = ({ open, onOpenChange }: SearchProps) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isCurrent = true;

        async function getProducts() {
            const { data, error } = await supabase
                .from("products")
                .select("*, images (ruta)")
                .order("nombre");

            if (!isCurrent) return;

            if (error) {
                console.error("Error fetching products for search:", error);
                setProducts([]);
            } else {
                setProducts((data ?? []).map(addProductImage));
            }

            setIsLoading(false);
        }

        getProducts();

        return () => {
            isCurrent = false;
        };
    }, []);

    useEffect(() => {
        const handleShortcut = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                onOpenChange(!open);
            }
        };

        document.addEventListener("keydown", handleShortcut);
        return () => document.removeEventListener("keydown", handleShortcut);
    }, [onOpenChange, open]);

    const handleSelect = (productId: number) => {
        onOpenChange(false);
        navigate(`/producto-${productId}`);
    };

    return (
        <CommandDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Buscar productos"
            description="Busca un producto por nombre o descripción."
            className=""
        >
            <CommandInput placeholder="Buscar producto..." className="" />
            <CommandList className="">
                <CommandEmpty className="">
                    {isLoading ? "Cargando productos..." : "No se encontraron productos."}
                </CommandEmpty>
                <CommandGroup className="" heading="Productos">
                    {products.map((product) => (
                        <CommandItem
                            key={product.product_id}
                            value={`${product.nombre} ${product.descripcion ?? ""}`}
                            onSelect={() => handleSelect(product.product_id)}
                            className="py-2 cursor-pointer"
                        >
                            {product.imagen ? (
                                <img
                                    src={product.imagen}
                                    alt=""
                                    className="size-12 rounded-md object-cover"
                                />
                            ) : (
                                <span className="flex size-12 items-center justify-center rounded-md bg-muted">
                                    <PackageSearch className="size-5 text-muted-foreground" />
                                </span>
                            )}
                            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                <span className="truncate font-medium">{product.nombre}</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    ${product.precio.toLocaleString("es-MX")}
                                </span>
                            </span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};

export default Search;
