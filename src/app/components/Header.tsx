'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DropdownMenu from './DropdownMenu';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/tienda/busqueda?query=${searchTerm}`);
        }
    };

    return (
        <header className="bg-gray-800 text-white flex items-center px-4 py-0.5 sticky top-0 z-50">
            {/* Logo */}
            <div className="mr-6">
                <Link href="/">
                    <img
                        src="/controlsmart.avif"
                        alt="ControlSmart Logo"
                        className="h-7 cursor-pointer"
                    />
                </Link>
            </div>

            {/* Menú */}
            <nav className="mr-auto">
                <DropdownMenu />
            </nav>

            {/* Menú de hamburguesa con animación */}
            <motion.button
                className="block md:hidden ml-4"
                whileHover={{
                    scale: 1.1,
                    rotate: 15,
                    transition: { duration: 0.3, ease: "easeInOut" }
                }}
                whileTap={{
                    scale: 0.9,
                    rotate: 45,
                    transition: { duration: 0.3, ease: "easeInOut" }
                }}
                aria-label="Menú"
            >
                <motion.div
                    className="space-y-1"
                    initial={{ rotate: 0 }}
                    animate={{
                        rotate: 45,
                        y: 8,
                        transition: { duration: 0.3, ease: "easeInOut" }
                    }}
                >
                    {/* Tres líneas de la hamburguesa */}
                    <motion.div className="h-1 w-6 bg-white" />
                    <motion.div className="h-1 w-6 bg-white" initial={{ opacity: 1 }} animate={{ opacity: 0 }} />
                    <motion.div className="h-1 w-6 bg-white" />
                </motion.div>
            </motion.button>

            {/* Barra de búsqueda */}
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-white rounded-lg overflow-hidden flex-grow max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Buscar Productos"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow px-3 py-0.5 text-gray-800 focus:outline-none text-sm"
                />
                <button type="submit" className="bg-blue-600 p-2 flex items-center justify-center" aria-label="Buscar">
                    <i className="fa-solid fa-magnifying-glass text-white"></i>
                </button>
            </form>

            {/* Acciones del usuario */}
            <div className="flex items-center">
                <Link href="/login" className="text-white mx-5 text-sm">Iniciar sesión</Link>
                <a href="#" className="text-white mx-0.1" aria-label="Carrito">
                    <i className="fa-solid fa-cart-shopping text-lg"></i>
                </a>
            </div>
        </header>
    );
};

export default Header;
