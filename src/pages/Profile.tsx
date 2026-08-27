import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { User } from "@supabase/supabase-js";
import {
    Mail,
    MapPin,
    ChevronDown,
    Plus,
    Laptop as LaptopIcon,
} from "lucide-react";

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [selectedAddress, setSelectedAddress] = useState(0);

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();

            if (error) {
                console.error(error);
                return;
            }

            setUser(data.user);
        };

        getUser();
    }, []);

    if (!user) {
        return (
            <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
                <p className="text-neutral-400">Cargando...</p>
            </main>
        );
    }

    const displayName = user.user_metadata?.display_name || "Usuario";
    const email = user.email || "Sin correo";

    const addresses = [
        {
            name: displayName,
            address: "Avenida Constitución 3098",
            details: "Piso 6, Colonia Santa María",
            city: "Monterrey, N.L. C.P. 64650",
        },
        {
            name: displayName,
            address: "Calle Miguel Hidalgo 120",
            details: "Colonia Centro",
            city: "Monterrey, N.L. C.P. 64000",
        },
    ];

    const currentAddress = addresses[selectedAddress];

    return (
        <main className="min-h-screen bg-white text-neutral-900">

            <section className="bg-neutral-800 border-b border-neutral-700">
                <div className="max-w-6xl mx-auto px-6 py-10">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                       
                        <div className="flex items-center gap-6">

                            {/* Avatar */}
                            <div className="w-24 h-24 rounded-full bg-neutral-900 text-white flex items-center justify-center text-3xl font-semibold shadow-md shrink-0">
                                {displayName.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <p className="text-sm text-neutral-300 mb-1">
                                    Mi perfil
                                </p>

                                <h1 className="text-3xl font-bold text-white">
                                    {displayName}
                                </h1>

                                <div className="flex items-center gap-2 mt-2">
                                    <Mail className="w-4 h-4 text-neutral-400" />

                                    <p className="text-sm text-neutral-400">
                                        {email}
                                    </p>
                                </div>
                            </div>

                        </div>


                        
                        <div>

                            <div className="flex items-center justify-between mb-4">

                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-neutral-300" />

                                    <div>
                                        <h2 className="text-lg font-semibold text-white">
                                            Mis direcciones
                                        </h2>

                                        <p className="text-xs text-neutral-400">
                                            Dirección de envío
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center gap-1 text-sm text-neutral-300 hover:text-white transition"
                                >
                                    <Plus className="w-4 h-4" />
                                    Agregar
                                </button>

                            </div>


                            
                            <div className="relative mb-4 rounded-xl overflow-hidden">
                                <select
                                    value={selectedAddress}
                                    onChange={(e) =>
                                        setSelectedAddress(Number(e.target.value))
                                    }
                                    className="w-full appearance-none bg-neutral-700 border border-neutral-600 px-4 py-2.5 pr-10 text-sm text-white focus:outline-none focus:border-neutral-400 cursor-pointer"
                                >
                                    {addresses.map((address, index) => (
                                        <option key={index} value={index}>
                                            Dirección {index + 1}
                                            {index === 0 ? " (Principal)" : ""}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />

                            </div>


                            
                            <div className="text-sm text-neutral-300">

                                <p className="font-medium text-white">
                                    {currentAddress.name}
                                </p>

                                <p className="mt-1">
                                    {currentAddress.address}
                                </p>

                                <p className="text-neutral-400">
                                    {currentAddress.details}
                                </p>

                                <p className="text-neutral-400">
                                    {currentAddress.city}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
            </section>


            <section className="max-w-6xl mx-auto px-6 py-10">

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-neutral-900">
                        Historial de compras
                    </h2>

                    <p className="text-sm text-neutral-500 mt-1">
                        Compras que has realizado en nuestra tienda.
                    </p>
                </div>


                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">

                    <div className="flex items-center gap-4 p-5 border-b border-neutral-200">

                        <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                            <LaptopIcon className="w-5 h-5 text-neutral-600" />
                        </div>

                        <div>
                            <p className="text-xs text-neutral-500">
                                Laptop Gamer Pro 2024
                            </p>

                            <p className="font-medium text-neutral-900">
                                Precio: $1,499.99
                            </p>
                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
};

export default Profile;