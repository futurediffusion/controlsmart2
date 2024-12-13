import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-2 px-6 flex justify-between items-center">
            {/* Dirección */}
            <div className="flex items-center">
                <i className="fa-solid fa-location-dot text-white mr-2"></i>
                <p className="text-sm">
                    Avenida San Luis 1976, Centro comercial Santa Rosa, Tda. 18, San Borja
                </p>
            </div>

            {/* Contacto */}
            <div className="flex items-center">
                <i className="fa-brands fa-whatsapp text-white mr-2"></i>
                <p className="text-sm">
                    ¿Alguna consulta? Contáctanos <strong>+51 917498977</strong>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
