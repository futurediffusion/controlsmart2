'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
    code: string;
    name: string;
    brand: string;
    price: string;
    image_url: string;
}

interface StorefundasProps {
    filterKey?: string;
    filterValue?: string;
}

const Storefundas: React.FC<StorefundasProps> = ({ filterKey, filterValue }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 16;
    const [loading, setLoading] = useState<boolean>(true); // Estado de carga

    useEffect(() => {
        setLoading(true); // Inicia la carga de productos

        // Fetch productos.json dinámicamente
        fetch('/products.json')
            .then((response) => response.json())
            .then((data) => {
                console.log('Productos cargados:', data);

                // Filtrar productos por marca 'CASE'
                const filteredProducts = data.filter((product: Product) => product.brand === 'CASE');

                // Aplicar filtros adicionales si están definidos
                const finalProducts = filterKey && filterValue
                    ? filteredProducts.filter((product) => product[filterKey as keyof Product] === filterValue)
                    : filteredProducts;

                setProducts(finalProducts);
                setLoading(false); // Productos cargados, actualizar estado
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false); // En caso de error, también dejamos de mostrar "Cargando..."
            });
    }, [filterKey, filterValue]); // Re-cargar cuando cambia el filtro

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const currentProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    };

    // Mostrar loading si los productos aún se están cargando
    if (loading) {
        return (
            <section className="store w-full flex flex-col items-center">
                <div className="px-8 py-4 w-full max-w-[1200px]">
                    <h2 className="text-left text-xl font-bold tracking-wide uppercase mb-2">
                        Cargando productos...
                    </h2>
                    <hr className="border-t-2 border-gray-700 mb-4" />
                </div>
            </section>
        );
    }

    return (
        <section className="store w-full flex flex-col items-center">
            <div className="px-8 py-4 w-full max-w-[1200px]">
                <h2 className="text-left text-xl font-bold tracking-wide uppercase mb-2">
                    Productos - Marca CASE
                </h2>
                <hr className="border-t-2 border-gray-700 mb-4" />
            </div>

            {/* Mostrar productos */}
            <div className="grid grid-cols-4 gap-6 w-full max-w-[1200px] px-4">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
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
                    ))
                ) : (
                    <p>No se encontraron productos.</p>
                )}
            </div>

            {/* Paginación */}
            <div className="pagination flex items-center justify-end gap-2 mt-6">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="p-1.5 text-sm bg-blue-600 rounded-xl hover:bg-blue-500 disabled:bg-gray-200"
                >
                    <i className="fa-solid fa-arrow-left text-white"></i>
                </button>
                <span className="text-sm font-medium">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="p-1.5 text-sm bg-blue-600 rounded-xl hover:bg-blue-500 disabled:bg-gray-200"
                >
                    <i className="fa-solid fa-arrow-right text-white"></i>
                </button>
            </div>
        </section>
    );
};

export default Storefundas;
