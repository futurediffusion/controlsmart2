'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image'; // Importamos Image de next/image

// Definir el tipo de producto
interface Product {
    code: string;
    name: string;
    brand: string;
    price: string;
    image_url: string;
    rating: string;
}

const Bestseller: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);  // Estado para productos
    const [currentIndex, setCurrentIndex] = useState<number>(0);  // Índice actual
    const [prevIndex, setPrevIndex] = useState<number>(0);  // Índice previo

    // Cargar productos desde el archivo JSON
    useEffect(() => {
        fetch('/products.json')
            .then((response) => response.json())
            .then((data: Product[]) => {
                const filteredProducts = data.filter(product => product.rating === "5");
                setProducts(filteredProducts);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    // Función para ir a la siguiente diapositiva
    const nextSlide = () => {
        setPrevIndex(currentIndex);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(products.length / 4)); // Páginas de 4 productos
    };

    // Función para ir a la diapositiva anterior
    const prevSlide = () => {
        setPrevIndex(currentIndex);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(products.length / 4)) % Math.ceil(products.length / 4));
    };

    // Seleccionar los productos actuales (4 por página)
    const currentProducts = products.slice(currentIndex * 4, currentIndex * 4 + 4);

    return (
        <section className="product-line w-full flex flex-col items-center">
            <div className="px-8 py-2 w-full max-w-[1200px]">
                <h2 className="text-left text-xl font-bold tracking-wide uppercase mb-1">
                    Lo Más Vendido
                </h2>
                <hr className="border-t-2 border-gray-700 mb-2" />
            </div>

            <div className="flex items-center justify-center relative w-full max-w-[1200px] px-4 py-3 overflow-x-hidden">
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-md bg-white bg-opacity-60 hover:bg-opacity-80 hover:scale-110 focus:outline-none transition duration-50 z-10"
                >
                    <i className="fa-solid fa-chevron-left text-blue-500 text-lg"></i>
                </button>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: prevIndex < currentIndex ? 100 : -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: prevIndex < currentIndex ? -100 : 100 }}
                        transition={{ type: "tween" }}
                        className="flex justify-center space-x-4 w-full"
                    >
                        {currentProducts.map((product) => (
                            <div
                                key={product.code}
                                className="w-48 h-[330px] p-4 rounded-lg shadow-lg group bg-white relative"
                            >
                                <div className="product-image relative w-full h-48 overflow-hidden group-hover:scale-105 transition-transform duration-700">
                                    {/* Usamos next/image en lugar de <img> */}
                                    <Image
                                        src={product.image_url}
                                        alt={product.name}
                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                                        width={192}  // Ajusta el tamaño según tus necesidades
                                        height={192} // Ajusta el tamaño según tus necesidades
                                        priority={true} // Prioriza la carga de las imágenes visibles
                                        quality={75} // Ajusta la calidad de la imagen para mejorar la carga
                                    />
                                    <button className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1 opacity-0 group-hover:opacity-100 group-hover:scale-110 hover:scale-125 transition-all duration-300 ease-in-out">
                                        <i className="fa-solid fa-cart-plus text-white text-sm"></i>
                                    </button>
                                </div>

                                <div className="product-info mt-4">
                                    <h3 className="brand text-sm font-bold text-gray-800">
                                        {product.brand}
                                    </h3>
                                    <p className="product-name text-sm text-gray-700 line-clamp-2">
                                        {product.name}
                                    </p>
                                    <div className="price-container self-center inline-block mt-0.5 transition-transform duration-700 group-hover:scale-110 border border-red-500 rounded-md px-2">
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
                </AnimatePresence>

                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-md bg-white bg-opacity-60 hover:bg-opacity-80 hover:scale-110 focus:outline-none transition duration-50 z-10"
                >
                    <i className="fa-solid fa-chevron-right text-blue-500 text-lg"></i>
                </button>
            </div>
        </section>
    );
};

export default Bestseller;