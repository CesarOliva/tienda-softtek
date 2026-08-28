import { Check, Plus } from "lucide-react";
import { SavedAddress } from "@/types/SavedAddresses";

type SavedAddressesProps = {
    addresses: SavedAddress[];
    selectedAddressId: number | null;
    recipientName: string;
    onSelect: (addressId: number) => void;
    onAddNew: () => void;
};

const SavedAddresses = ({
    addresses,
    selectedAddressId,
    recipientName,
    onSelect,
    onAddNew,
}: SavedAddressesProps) => {
    return (
        <div className="space-y-3">
            <p className="text-sm font-medium text-neutral-300">Selecciona una dirección guardada</p>
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

export default SavedAddresses;
