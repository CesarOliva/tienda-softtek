import { Cpu, Globe, Phone } from 'lucide-react';
import './styles/Footer.css';  

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-links">
          <ul>
            <h4>Contacto</h4>
            <li className='flex items-center gap-2'>
              <Globe className='size-4'/>
              <a href="https://softtek.com" target="_blank" rel="noopener noreferrer">
                softtek.com
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <Phone className='size-4'/>
              <a href="tel:8180082276" target="_blank" rel="noopener noreferrer">
                8180082276
              </a>
            </li>
          </ul>
        </div>

        <div className="logo">
          <div className="flex gap-2 items-center">
            <Cpu className='size-6'/>
            <h3 className='text-2xl'>TechZone</h3>
          </div>
        </div>

        <div className="footer-links right">
          <ul>
            <h4>Ubicación</h4>
            <li style={{ color: '#aaaaaa', marginBottom: '15px', lineHeight: '1.4' }}>
              Avenida Constitución 3098, Piso 6<br />
              Colonia Santa María, C.P. 64650<br />
              Monterrey, N.L.
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tienda TechZone. Todos los derechos reservados.</p>
        <div className="payment-methods items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Visa_Inc._logo_(2021%E2%80%93present).svg/3840px-Visa_Inc._logo_(2021%E2%80%93present).svg.png"
            alt="Visa"
            className="h-5 w-16 object-contain"
          />
          <img
            src="https://www.svgrepo.com/show/362015/mastercard-3.svg"
            alt="Mastercard"
            className="h-10 w-28 object-contain"
          />
          <img
            src="https://vectorseek.com/wp-content/uploads/2023/08/Paypal-Symbol-Logo-Vector.svg-.png"
            alt="PayPal"
            className="h-5 w-16 object-contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
