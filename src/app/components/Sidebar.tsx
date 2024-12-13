'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
    code: string;
    image_url: string;
    name: string;
    brand: string;
    price: string;
}

interface SidebarProps {
    currentProductCode: string | number;
}

const Sidebar: React.FC<SidebarProps> = ({ currentProductCode }) => {
    const [products, setProducts] = useState < Product[] > ([]);
    const [relatedProducts, setRelatedProducts] = useState < Product[] > ([]);

    useEffect(() => {
        fetch('/products.json')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);

                // Convertir currentProductCode a string para comparación
                const productCode = String(currentProductCode);

                // Encontrar el producto actual
                const currentProduct = data.find(p => String(p.code) === productCode);

                if (currentProduct) {
                    // Filtrar productos de la misma marca
                    const sameBrandProducts = data
                        .filter(product =>
                            String(product.brand).trim().toLowerCase() === String(currentProduct.brand).trim().toLowerCase() &&
                            String(product.code) !== productCode
                        )
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 4);

                    console.log('Producto Actual:', currentProduct);
                    console.log('Productos de la Misma Marca:', sameBrandProducts);

                    setRelatedProducts(sameBrandProducts);
                } else {
                    // Si no hay producto actual, mostrar productos aleatorios
                    const shuffledProducts = data.sort(() => Math.random() - 0.5).slice(0, 4);
                    setRelatedProducts(shuffledProducts);
                }
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, [currentProductCode]);

    return (
        <section className="product-line w-[400px] flex flex-col items-center p-0.1">
            <div className="px-2 py-1 w-full max-w-[500px]">
                <h2 className="text-left text-md font-bold tracking-wide uppercase mb-1">
                    También Para Ti
                </h2>
                <hr className="border-t-2 border-gray-700 mb-2" />
            </div>

            <div className="flex items-center justify-center relative w-full max-w-[800px] px-4 py-2 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "tween" }}
                        className="flex flex-col space-y-3 w-full"
                    >
                        {relatedProducts.length > 0 ? (
                            relatedProducts.map((product) => (
                                <div
                                    key={product.code}
                                    className="w-full h-[100px] p-3 rounded-lg shadow-lg group bg-white relative flex flex-row items-center space-x-3"
                                >
                                    <div className="product-image w-1/3 h-full overflow-hidden group-hover:scale-105 transition-transform duration-700">
                                        <Image
                                            src={product.image_url}
                                            alt={product.name}
                                            width={100} // Ancho optimizado para la imagen
                                            height={100} // Alto optimizado para la imagen
                                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                                            priority // Hace que la imagen se cargue de inmediato
                                        />
                                    </div>

                                    <div className="product-info w-2/3 mt-3">
                                        <h3 className="brand text-xs font-bold text-gray-800">
                                            {product.brand}
                                        </h3>
                                        <p className="product-name text-xs text-gray-700 line-clamp-2">
                                            {product.name}
                                        </p>
                                        <div className="price-container self-center inline-block mt-0.5 transition-transform duration-700 group-hover:scale-110 border border-red-500 rounded-md px-1">
                                            <p className="price text-sm font-bold text-red-500">
                                                {product.price}
                                            </p>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/product/${product.code}`}
                                        className="absolute inset-0"
                                        aria-label={`Ver detalles de ${product.name}`}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="text-center w-full text-gray-500">
                                No hay productos similares disponibles
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Sidebar;
