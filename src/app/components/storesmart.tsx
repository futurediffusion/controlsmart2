'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import next/image

const Storesmart = ({ filterKey, filterValue }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;
    const [loading, setLoading] = useState(true); // Estado de carga

    // Fetch data only when filterKey or filterValue changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Inicia la carga de productos
                const response = await fetch('/products.json');
                const data = await response.json();
                console.log('Productos cargados:', data);

                // Filtrar productos por categoría 'Accesorios TV'
                const filteredProducts = data.filter((product) => product.category === 'Accesorios TV');

                // Aplicar filtros adicionales si están definidos
                const finalProducts = filterKey && filterValue
                    ? filteredProducts.filter((product) => product[filterKey] === filterValue)
                    : filteredProducts;

                setProducts(finalProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false); // Productos cargados o error, actualizar estado
            }
        };

        fetchData();
    }, [filterKey, filterValue]);

    // Calculamos la cantidad de páginas
    const totalPages = useMemo(() => Math.ceil(products.length / itemsPerPage), [products]);

    const currentProducts = useMemo(
        () => products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        [products, currentPage]
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
                    Productos - Accesorios TV
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
                                    width={300} // Adjust the width and height as needed
                                    height={300}
                                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                                    priority // You can also add priority for above-the-fold images
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

export default Storesmart;
