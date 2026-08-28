import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Cpu } from "lucide-react";

export default function register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState("");
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setError('')
        setMessage('')

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.')
            return
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.')
            return
        }

        const emailLimpio = email.trim().toLowerCase()

        console.log('EMAIL ORIGINAL:', JSON.stringify(email))
        console.log('EMAIL LIMPIO:', JSON.stringify(emailLimpio))

        const { data, error } = await supabase.auth.signUp({
            email: emailLimpio,
            password,
            options: {
                data: {
                    nombre,
                    apellido,
                    display_name: `${nombre} ${apellido}`,
                }
            }
        })

        console.log('DATA:', data)
        console.log('ERROR:', error)

        if (error) {
            setError(error.message)
            return
        }

            navigate('/'); 

    }

    return (
        <main className="bg-neutral-950 text-neutral-200 px-6 py-16">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-5">
                        <div className="flex items-center justify-center size-14 rounded-xl bg-neutral-900 border border-neutral-800 shadow-lg">
                            <Cpu className="size-7 text-neutral-300" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-semibold text-neutral-100 tracking-tight">
                        Crear Cuenta
                    </h1>

                    <p className="text-sm text-neutral-500 mt-2">
                        Crea tu cuenta para continuar en TechZone.
                    </p>
                </div>

                <form
                    onSubmit={handleRegister}
                    className="border border-neutral-800 bg-neutral-900 rounded-lg p-6"
                >

                    <div className="flex gap-4 mb-5">
                        <div className="w-1/2">
                            <label className="block text-sm text-neutral-300 mb-2"> Nombre</label>

                            <input
                                type="text"
                                placeholder="Juan"
                                onChange={(e) => setNombre(e.target.value)}
                                required
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-500"
                            />
                        </div>

                        <div className="w-1/2">
                            <label className="block text-sm text-neutral-300 mb-2">
                                Apellido
                            </label>

                            <input
                                type="text"
                                placeholder="Perez"
                                onChange={(e) => setApellido(e.target.value)}
                                required
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-500"
                            />
                        </div>
                    </div>


                    <div className="mb-5">
                        <label className="block text-sm text-neutral-300 mb-2">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="correo@ejemplo.com"
                            required
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-500"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm text-neutral-300 mb-2">
                            Contraseña
                        </label>
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm text-neutral-300 mb-2">
                            Confirmar contraseña
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-500"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-400 mb-4">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="text-sm text-green-400 mb-4">
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-neutral-100 text-neutral-950 rounded-md py-2 text-sm font-medium hover:bg-white transition-colors cursor-pointer"
                    >
                        Registrarse
                    </button>

                    <div className="border-t border-neutral-800 mt-6 pt-5 text-center">
                        <p className="text-sm text-neutral-500">
                            ¿Ya tienes una cuenta?
                        </p>

                        <Link
                            to="/login"
                            className="inline-block mt-2 text-sm text-neutral-300 hover:text-white transition-colors"
                        >
                            Iniciar sesión
                        </Link>
                    </div>
                </form>

            </div>
        </main>
    );
};

