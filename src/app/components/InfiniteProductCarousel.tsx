'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';  // Importar Image de Next.js

interface Product {
    code: string;
    image_url: string;
    name: string;
    brand: string;
    price: string;
}

const InfiniteProductCarousel: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/products.json')
            .then((response) => response.json())
            .then((data) => {
                const shuffledProducts = data
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 30); // Limitamos a 30 productos
                setProducts(shuffledProducts);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const infiniteProducts = [...products, ...products, ...products];

    return (
        <section className="product-line w-full flex flex-col items-center bg-gray-800 overflow-hidden">
            <div className="px-8 py-3 w-full max-w-[1200px]">
                <h2 className="text-left text-lg font-bold tracking-wide uppercase mb-1 text-white">
                    Productos Solo Para Ti
                </h2>
                <hr className="border-t-2 border-white-500 mb-2" />
            </div>

            <div className="w-full overflow-hidden">
                <motion.div
                    className="flex"
                    initial={{ x: 0 }}
                    animate={{
                        x: "-200%", // Movimiento infinito suave
                    }}
                    transition={{
                        duration: 45, // Duración del movimiento
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                >
                    {infiniteProducts.map((product, index) => (
                        <div
                            key={`${product.code}-${index}`}
                            className="w-40 h-[210px] p-4 rounded-lg group bg-white flex-shrink-0 mx-1 relative pb-4"
                        >
                            {/* Imagen del producto - Usando next/image */}
                            <div className="product-image relative flex w-full h-20 items-center justify-center">
                                <Image
                                    src={product.image_url} // Fuente de la imagen
                                    alt={product.name} // Descripción de la imagen
                                    width={160} // Ancho fijo para la imagen
                                    height={160} // Alto fijo para la imagen
                                    className="object-contain object-center transition-transform duration-700 group-hover:scale-110"
                                    priority={false} // No usar 'priority' para imágenes fuera de vista inicial
                                    loading="lazy" // Cargar imagen solo cuando esté visible
                                />
                                <button className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1 opacity-0 group-hover:opacity-100 group-hover:scale-110 hover:scale-125 transition-all duration-300 ease-in-out">
                                    <i className="fa-solid fa-cart-plus text-white text-xs"></i>
                                </button>
                            </div>

                            {/* Información del producto */}
                            <div className="product-info mt-2">
                                <h3 className="brand text-sm font-bold text-gray-800">
                                    {product.brand}
                                </h3>
                                <p className="product-name text-sm text-gray-700 line-clamp-2">
                                    {product.name}
                                </p>
                                <div className="price-container self-center inline-block mt-1 transition-transform duration-700 group-hover:scale-110 border border-red-500 rounded-md px-2">
                                    <p className="price text-lg font-bold text-red-500">
                                        {product.price}
                                    </p>
                                </div>
                            </div>

                            {/* Ruta dinámica para cada producto */}
                            <Link
                                href={`/product/${product.code}`}
                                className="absolute inset-0"
                                aria-label={`Ver detalles de ${product.name}`}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default InfiniteProductCarousel;
