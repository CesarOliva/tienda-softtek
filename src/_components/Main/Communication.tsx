import { CalendarClock, Truck, ShoppingBasket } from "lucide-react";

const Communication = () => {
    return (
        <section className="my-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <div>
                <h2 className="text-3xl font-bold mb-5">
                    Tecnología fácil, rápida y segura
                </h2>

                <p className="text-neutral-400 leading-7">
                    Techzone te ofrece una gran variedad de productos tecnológicos,
                    precios competitivos y seguridad al momento de realizar tus compras.
                    Encuentra hardware, computadoras, laptops, monitores, componentes
                    y mucho más sin salir de casa.
                </p>
            </div>

            <div className="space-y-7">

                <div className="flex items-start gap-4">
                    <CalendarClock className="size-8 text-white shrink-0" />

                    <div>
                        <h3 className="font-semibold text-lg">
                            16 años de experiencia
                        </h3>

                        <p className="text-neutral-400 mt-1">
                            Realiza tus compras con confianza y seguridad.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Truck className="size-8 text-white shrink-0" />

                    <div>
                        <h3 className="font-semibold text-lg">
                            Envíos rápidos
                        </h3>

                        <p className="text-neutral-400 mt-1">
                            Recibe tus productos de forma rápida y segura.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <ShoppingBasket className="size-8 text-white shrink-0" />

                    <div>
                        <h3 className="font-semibold text-lg">
                            Más de 55,000 productos
                        </h3>

                        <p className="text-neutral-400 mt-1">
                            Productos como hardware, computadoras, laptops, impresoras, monitores componentes y más, sin tener que salir de tu hogar.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Communication;