import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);

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
        return <p>Cargando...</p>;
    }

    return (
        <main className="min-h-screen bg-neutral-950 text-white p-10">
            <h1>Perfil</h1>
            <p>Nombre: {user.user_metadata.display_name}</p>
            <p>Correo: {user.email}</p>
        </main>
    );
};

export default Profile;