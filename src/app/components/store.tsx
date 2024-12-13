'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Tipos para los productos
interface Product {
    code: string;
    image_url: string;
    name: string;
    brand: string;
    price: string;
}

// Añadido className en StoreProps
interface StoreProps {
    filterKey?: string;
    filterValue?: string;
    className?: string; // Añadido para pasar clases CSS al componente
}

const Store: React.FC<StoreProps> = ({ filterKey, filterValue, className }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 16;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/products.json');
                const data: Product[] = await response.json();

                // Filtramos los productos si hay filterKey y filterValue
                const filteredProducts = filterKey && filterValue
                    ? data.filter((product) => product[filterKey as keyof Product] === filterValue)
                    : data;

                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [filterKey, filterValue]);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Obtener los productos para la página actual
    const currentProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0); // Volver al inicio de la página
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0); // Volver al inicio de la página
        }
    };

    return (
        <section className={`store w-full flex flex-col items-center ${className}`}>
            <div className="px-8 py-4 w-full max-w-[1200px]">
                <h2 className="text-left text-xl font-bold tracking-wide uppercase mb-2">
                    Productos
                </h2>
                <hr className="border-t-2 border-gray-700 mb-4" />
            </div>

            <div className="grid grid-cols-4 gap-6 w-full max-w-[1200px] px-4">
                {currentProducts.map((product) => (
                    <div
                        key={product.code}
                        className="w-full h-[330px] p-4 rounded-lg shadow-lg group bg-white relative"
                    >
                        <div className="product-image relative w-full h-48 overflow-hidden group-hover:scale-105 transition-transform duration-700">
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                width={500}
                                height={500}
                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="product-info mt-4">
                            <h3 className="brand text-sm font-bold text-gray-800">
                                {product.brand}
                            </h3>
                            <p className="product-name text-sm text-gray-700 line-clamp-2">
                                {product.name}
                            </p>
                            <p className="price text-lg font-bold text-red-500">
                                {product.price}
                            </p>
                        </div>
                        <Link
                            href={`/product/${product.code}`}
                            className="absolute inset-0"
                            aria-label={`Ver detalles de ${product.name}`}
                        />
                    </div>
                ))}
            </div>

            <div className="pagination flex items-center justify-end gap-2 mt-6">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="p-1.5 text-sm bg-blue-600 rounded-xl hover:bg-blue-500 disabled:bg-gray-200"
                >
                    <i className="fa-solid fa-arrow-left text-white" />
                </button>
                <span className="text-sm font-medium">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="p-1.5 text-sm bg-blue-600 rounded-xl hover:bg-blue-500 disabled:bg-gray-200"
                >
                    <i className="fa-solid fa-arrow-right text-white" />
                </button>
            </div>
        </section>
    );
};

export default Store;
