'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);

    const navigateTo = (path: string): void => {
        router.push(path);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent): void => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center text-white space-x-4"
            >
                <motion.span
                    className="relative block w-6 h-4"
                    animate={{ rotate: isOpen ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                >
                    <span className="block w-full h-1 bg-white absolute top-0"></span>
                    <span className="block w-full h-1 bg-white absolute top-1/2 transform -translate-y-1/2"></span>
                    <span className="block w-full h-1 bg-white absolute bottom-0"></span>
                </motion.span>
                <motion.span
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    Menú
                </motion.span>
            </button>

            <div
                className={`absolute top-full mt-2 bg-gray-800 text-white rounded-lg shadow-lg p-4 origin-top transition-all duration-500 ${isOpen
                    ? 'scale-y-100 opacity-100'
                    : 'scale-y-0 opacity-0 pointer-events-none'
                    } sm:left-0 left-[-70px]`} // Ajusta el recuadro completo para móviles
                style={{
                    width: '200px',
                    fontSize: '0.875rem',
                }}
            >
                <ul>
                    <li
                        onClick={() => navigateTo('/tienda')}
                        className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                    >
                        Tienda
                    </li>
                    <li
                        onClick={() => navigateTo('/tienda/controles-smart-tv')}
                        className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                    >
                        Controles para TV
                    </li>
                    <li
                        onClick={() => navigateTo('/tienda/fundas')}
                        className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                    >
                        Fundas de control remoto
                    </li>
                    <li
                        onClick={() => navigateTo('/tienda/accesorios-celulares')}
                        className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                    >
                        Accesorios Celulares
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DropdownMenu;
