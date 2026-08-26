import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

const Checkout = () => {    
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [validated, setValidated] = useState<boolean>(false);

    const [customerData, setCustomerData] = useState({
        nombre: '',
        email: '',
        mensaje: '',
    });

    const [shippingData, setShippingData] = useState({
        calle: '',
        referencia: '',
        colonia: '',
        cp: 0,
        ciudad: '',
        estado: '',
    })
    
    const handleContactChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setCustomerData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setShippingData((prev) => ({
            ...prev,
            [name]: value
        }));
  };

    const handleFirstSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCurrentStep(2);
    };

    const handleSecondSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidated(false);
        
        if(customerData.nombre.trim() === ''){
            toast.error('Nombre requerido')
            return;
        }
        if(customerData.email.trim() === ''){
            toast.error('Email requerido')
            return;
        }
        if(shippingData.calle.trim() === ''){
            toast.error('Calle requerida')
            return;
        }
        if(shippingData.referencia.trim() === ''){
            toast.error('Referencia requerida')
            return;
        }
        if(shippingData.colonia.trim() === ''){
            toast.error('Colonia requerida')
            return;
        }
        if(shippingData.cp === 0){
            toast.error('Código postal requerido')
            return;
        }
        if(shippingData.ciudad.trim() === ''){
            toast.error('Ciudad requerida')
            return;
        }
        if(shippingData.estado.trim() === ''){
            toast.error('Estado requerido')
            return;
        }

        setCurrentStep(3);
        setValidated(true);
    };

    const goToPreviousStep = (numero: number)=>{
        setCurrentStep(numero-1)
    }

    return (
        <main className="mx-auto flex max-w-5xl flex-col px-8 my-16">
            <div className="grid md:grid-cols-2 gap-8">
                <section>
                    {currentStep === 1 ? (
                        <>
                            <h2 className='text-4xl font-semibold mb-4'>Información de Contacto</h2>

                            <form onSubmit={handleFirstSubmit} className='flex flex-col gap-y-2'>
                                <div className='flex flex-row items-center gap-x-2'>
                                    <label htmlFor="nombre" className='text-lg '>Nombre:</label>
                                    <input
                                        className='w-full p-2 border border-neutral-700 rounded-md focus:outline-none'
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={customerData.nombre}
                                        onChange={handleContactChange}
                                        
                                        placeholder="Nombre"
                                    />
                                </div>

                                <div className='flex flex-row items-center gap-x-2'>
                                    <label htmlFor="email" className='text-lg '>Correo:</label>
                                    <input
                                        className='w-full p-2 border border-neutral-700 rounded-md focus:outline-none'
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={customerData.email}
                                        onChange={handleContactChange}
                                        
                                        placeholder="Email"
                                    />
                                </div>

                                <div className='flex flex-col gap-x-2'>
                                    <div className="w-full items-start flex">
                                        <label htmlFor="mensaje" className='text-lg '>Mensaje:</label>
                                    </div>
                                    <textarea
                                        className='p-2 min-h-16 max-h-32 border border-neutral-700 rounded-md focus:outline-none'
                                        id="mensaje"
                                        name="mensaje"
                                        value={customerData.mensaje}
                                        onChange={handleContactChange}
                                        placeholder="Escribe tu mensaje..."
                                    />
                                </div>

                                <div className='flex justify-end mt-2'>
                                    <button 
                                        className={`bg-neutral-200 hover:bg-neutral-300 font-medium text-black px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer`}
                                        type="submit"
                                    >
                                    Siguiente
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : currentStep === 2 ? (
                        <>
                            <h2 className='text-4xl font-semibold mb-4'>Información de Dirección</h2>
                            <form onSubmit={handleSecondSubmit} className='flex flex-col gap-y-2'>
                                <div className='flex flex-row items-center gap-x-2'>
                                    <label htmlFor="calle" className='text-lg '>Calle:</label>
                                    <input
                                        className='w-full p-2 border border-neutral-700 rounded-md focus:outline-none'
                                        type="text"
                                        id="calle"
                                        name="calle"
                                        value={shippingData.calle}
                                        onChange={handleAddressChange}
                                        placeholder="Calle y número"
                                    />
                                </div>

                                <div className='flex flex-col gap-x-2'>
                                    <div className="w-full items-start flex">
                                        <label htmlFor="referencia" className='text-lg '>Referencia:</label>
                                    </div>
                                    <textarea
                                        className='p-2 min-h-16 max-h-32 border border-neutral-700 rounded-md focus:outline-none'
                                        id="referencia"
                                        name="referencia"
                                        value={shippingData.referencia}
                                        onChange={handleAddressChange}
                                        placeholder="Referencia"
                                    />
                                </div>

                                <div className='flex flex-row items-center gap-x-2'>
                                    <label htmlFor="colonia" className='text-lg '>Colonia:</label>
                                    <input
                                        className='w-full p-2 border border-neutral-700 rounded-md focus:outline-none'
                                        type="text"
                                        id="colonia"
                                        name="colonia"
                                        value={shippingData.colonia}
                                        onChange={handleAddressChange}
                                        
                                        placeholder="Colonia"
                                    />
                                </div>

                                <div className='flex flex-row items-center gap-x-2'>
                                    <label htmlFor="cp" className='text-lg '>CP:</label>
                                    <input
                                        className='w-full p-2 border border-neutral-700 rounded-md focus:outline-none'
                                        type="number"
                                        id="cp"
                                        name="cp"
                                        value={shippingData.cp}
                                        onChange={handleAddressChange}
                                        
                                        placeholder="Código Postal"
                                    />
                                </div>

                                <div className='flex flex-row items-center gap-x-2'>
                                    <label htmlFor="ciudad" className='text-lg '>Ciudad:</label>
                                    <input
                                        className='w-full p-2 border border-neutral-700 rounded-md focus:outline-none'
                                        type="text"
                                        id="ciudad"
                                        name="ciudad"
                                        value={shippingData.ciudad}
                                        onChange={handleAddressChange}
                                        
                                        placeholder="Ciudad"
                                    />
                                </div>

                                <div className='flex flex-row items-center gap-x-2'>
                                    <label htmlFor="estado" className='text-lg '>Estado:</label>
                                    <input
                                        className='w-full p-2 border border-neutral-700 rounded-md focus:outline-none'
                                        type="text"
                                        id="estado"
                                        name="estado"
                                        value={shippingData.estado}
                                        onChange={handleAddressChange}
                                        
                                        placeholder="Estado"
                                    />
                                </div>

                                <div className='flex justify-end mt-2'>
                                    <button type="button"
                                        className={`bg-neutral-800 hover:bg-neutral-700 font-medium text-white px-4 py-2 rounded-lg transition-colors duration-300 mr-2 cursor-pointer`}
                                        onClick={() => goToPreviousStep(2)}
                                    >
                                        Anterior
                                    </button>
                                    <button 
                                        className={`bg-neutral-200 hover:bg-neutral-300 font-medium text-black px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer`}
                                        type="submit"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <></>
                    )}
                </section>

                <section>
                    <h2 className='text-4xl font-semibold mb-4'>Resumen del pedido</h2>
                </section>
            </div>
        </main>
    );
}
 
export default Checkout;