import { SavedAddress } from "@/types/SavedAddress";
import { Check, Plus } from "lucide-react";
    

type SavedAddressesProps = {
    addresses: SavedAddress[];
    selectedAddressId: number | null;
    recipientName: string;
    onSelect: (addressId: number) => void;
    onAddNew: () => void;
};

export const SavedAddresses = ({
    addresses,
    selectedAddressId,
    recipientName,
    onSelect,
    onAddNew,
}: SavedAddressesProps) => {
    return (
        <div className="space-y-3">
            <p className="text-md font-medium text-neutral-300">Selecciona una dirección guardada</p>
            <div className="grid gap-3">
                {addresses.map((address) => (
                    <button
                        type="button"
                        key={address.address_id}
                        onClick={() => onSelect(address.address_id)}
                        className={`flex w-full items-start justify-between gap-4 rounded-lg border p-4 text-left transition-colors cursor-pointer ${selectedAddressId === address.address_id ? "border-neutral-200 bg-neutral-800" : "border-neutral-700 bg-neutral-950 hover:border-neutral-500"}`}
                    >
                        <span className="text-sm text-neutral-200">
                            <strong className="font-medium text-white">Recibe: {recipientName}</strong><br />
                            {address.calle}, {address.colonia}<br />
                            {address.ciudad}, {address.estado}, C.P. {address.cp}
                            {address.referencia && <><br />Referencia: {address.referencia}</>}
                        </span>
                        {selectedAddressId === address.address_id && <Check className="mt-0.5 size-5 shrink-0 text-white" />}
                    </button>
                ))}
            </div>
            <button
                type="button"
                onClick={onAddNew}
                className="flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-white cursor-pointer"
            >
                <Plus className="size-4" />
                Agregar una nueva dirección
            </button>
        </div>
    );
};

export const SkeletonAddresses = () => {
    return (
        <div className="space-y-3 animate-pulse">
            {/* Título skeleton */}
            <p className="text-sm font-medium text-neutral-300">
                <span className="inline-block w-48 h-4 bg-neutral-800 rounded"></span>
            </p>
            
            {/* Grid de direcciones skeleton */}
            <div className="grid gap-3">
                {/* Dirección 1 skeleton */}
                <div className="flex w-full items-start justify-between gap-4 rounded-lg border border-neutral-700 bg-neutral-950 p-4">
                    <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                            <span className="inline-block w-32 h-4 bg-neutral-800 rounded"></span>
                            <span className="inline-block w-20 h-4 bg-neutral-800 rounded"></span>
                        </div>
                        <div className="w-48 h-3 bg-neutral-800 rounded"></div>
                        <div className="w-64 h-3 bg-neutral-800 rounded"></div>
                        <div className="w-40 h-3 bg-neutral-800 rounded"></div>
                        <div className="w-52 h-3 bg-neutral-800 rounded"></div>
                    </div>
                    <div className="size-5 bg-neutral-800 rounded-full shrink-0"></div>
                </div>

                {/* Dirección 2 skeleton */}
                <div className="flex w-full items-start justify-between gap-4 rounded-lg border border-neutral-700 bg-neutral-950 p-4">
                    <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                            <span className="inline-block w-28 h-4 bg-neutral-800 rounded"></span>
                            <span className="inline-block w-24 h-4 bg-neutral-800 rounded"></span>
                        </div>
                        <div className="w-56 h-3 bg-neutral-800 rounded"></div>
                        <div className="w-72 h-3 bg-neutral-800 rounded"></div>
                        <div className="w-44 h-3 bg-neutral-800 rounded"></div>
                        <div className="w-60 h-3 bg-neutral-800 rounded"></div>
                    </div>
                    <div className="size-5 bg-neutral-800 rounded-full shrink-0"></div>
                </div>

                {/* Dirección 3 skeleton */}
                <div className="flex w-full items-start justify-between gap-4 rounded-lg border border-neutral-700 bg-neutral-950 p-4">
                    <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                            <span className="inline-block w-36 h-4 bg-neutral-800 rounded"></span>
                            <span className="inline-block w-16 h-4 bg-neutral-800 rounded"></span>
                        </div>
                        <div className="w-52 h-3 bg-neutral-800 rounded"></div>
                        <div className="w-60 h-3 bg-neutral-800 rounded"></div>
                        <div className="w-38 h-3 bg-neutral-800 rounded"></div>
                        <div className="w-48 h-3 bg-neutral-800 rounded"></div>
                    </div>
                    <div className="size-5 bg-neutral-800 rounded-full shrink-0"></div>
                </div>
            </div>

            {/* Botón "Agregar nueva dirección" skeleton */}
            <div className="flex items-center gap-2">
                <div className="size-4 bg-neutral-800 rounded"></div>
                <span className="inline-block w-48 h-4 bg-neutral-800 rounded"></span>
            </div>
        </div>
    );
}