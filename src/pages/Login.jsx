import { useState } from "react";
import { Link } from "react-router-dom";
import { Cpu, Mail, Lock, ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        }

        setLoading(false);
    };

    return (
        <main className="min-h-[calc(100vh-97px)] bg-neutral-950 flex items-center justify-center px-6 py-16">
            <div className="w-full max-w-md">

                {/* Logo / encabezado */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-5">
                        <div className="flex items-center justify-center size-14 rounded-xl bg-neutral-900 border border-neutral-800 shadow-lg">
                            <Cpu className="size-7 text-neutral-300" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-semibold text-neutral-100 tracking-tight">
                        Bienvenido de nuevo
                    </h1>

                    <p className="text-sm text-neutral-500 mt-2">
                        Inicia sesión en tu cuenta de TechZone
                    </p>
                </div>

                {/* Card */}
                <div className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-7 shadow-2xl backdrop-blur-sm">

                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                Correo electrónico
                            </label>

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                    required
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium text-neutral-300">
                                    Contraseña
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
                                />
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-950/40 border border-red-900/50 rounded-lg px-4 py-3">
                                <p className="text-sm text-red-400">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-neutral-100 hover:bg-white text-neutral-950 font-medium text-sm py-3 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "Iniciando sesión..." : "Iniciar sesión"}

                            {!loading && (
                                <ArrowRight className="size-4" />
                            )}
                        </button>

                    </form>

                    {/* Register */}
                    <div className="mt-7 pt-6 border-t border-neutral-800 text-center">
                        <p className="text-sm text-neutral-500">
                            ¿Todavía no tienes una cuenta?
                        </p>

                        <Link
                            to="/register"
                            className="inline-block mt-2 text-sm text-neutral-200 hover:text-white transition-colors"
                        >
                            Crear una cuenta
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-neutral-600 mt-6">
                    © 2026 TechZone. Todos los derechos reservados.
                </p>
            </div>
        </main>
    );
};

export default Login;