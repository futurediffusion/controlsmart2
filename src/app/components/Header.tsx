'use client';  // Marcamos este componente como cliente

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DropdownMenu from './DropdownMenu';
import Image from 'next/image'; // Importamos el componente Image de Next.js

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false); // Estado para el menú
    const router = useRouter();

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/tienda/busqueda?query=${searchTerm}`);
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-gray-800 text-white flex items-center px-4 py-0.5 sticky top-0 z-50 flex-wrap md:flex-nowrap justify-between">
            {/* Logo */}
            <div className="mr-6 flex-shrink-0 mt-2 md:mt-0">
                <Link href="/">
                    <Image
                        src="/controlsmart.avif"
                        alt="ControlSmart Logo"
                        className="h-7 cursor-pointer"
                        width={50}
                        height={28}
                        priority
                    />
                </Link>
            </div>

            {/* Menú Dropdown */}
            <nav className="flex lg:mr-auto md:mr-auto">
                <DropdownMenu />
            </nav>

            {/* Barra de búsqueda y Acciones del usuario */}
            <div className="flex items-center mt-2 md:mt-0 flex-wrap w-full md:w-auto justify-between md:justify-start">
                {/* Barra de búsqueda */}
                <form onSubmit={handleSearchSubmit} className="flex items-center bg-white rounded-lg overflow-hidden w-full sm:w-auto sm:max-w-xs mt-2 md:mt-0">
                    <input
                        type="text"
                        placeholder="Buscar Productos"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow px-3 py-1 text-gray-800 focus:outline-none text-sm"
                    />
                    <button type="submit" className="bg-blue-600 p-2 flex items-center justify-center rounded-r-lg" aria-label="Buscar">
                        <i className="fa-solid fa-magnifying-glass text-white"></i>
                    </button>
                </form>

                {/* Enlace de login */}
                <div className="flex items-center mt-2 md:mt-0 sm:ml-4">
                    <Link href="/login" className="text-white mx-5 text-sm">Iniciar sesión</Link>
                </div>

                {/* Carrito */}
                <div className="flex items-center mt-2 md:mt-0 ml-2 sm:ml-4">
                    <a href="#" className="text-white mx-0.1" aria-label="Carrito">
                        <i className="fa-solid fa-cart-shopping text-lg"></i>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
