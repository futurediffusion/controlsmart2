'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'; // Asegúrate de importar Link para poder usarlo
import Image from 'next/image'; // Importamos next/image para optimizar las imágenes

interface Product {
    code: string;
    name: string;
    brand: string;
    price: string;
    image_url: string;
    category: string;
    additional_info?: string;
    specifications?: string;
}

const Storebusqueda: React.FC = () => {
    const [products, setProducts] = useState < Product[] > ([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    useEffect(() => {
        setLoading(true);

        // Fetch productos.json dinámicamente
        fetch('/products.json')
            .then((response) => response.json())
            .then((data) => {
                console.log('Productos cargados:', data);

                // Filtrar productos según el término de búsqueda
                const filteredProducts = data.filter((product: Product) => {
                    const searchTerm = query ? query.toLowerCase() : '';
                    return (
                        product.name.toLowerCase().includes(searchTerm) ||
                        product.brand.toLowerCase().includes(searchTerm) ||
                        product.category.toLowerCase().includes(searchTerm) ||
                        (product.additional_info && product.additional_info.toLowerCase().includes(searchTerm)) ||
                        (product.specifications && product.specifications.toLowerCase().includes(searchTerm))
                    );
                });

                setProducts(filteredProducts);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, [query]);

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
                    Resultados de búsqueda para: &quot;{query}&quot;
                </h2>
                <hr className="border-t-2 border-gray-700 mb-4" />
            </div>

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
                                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                                    layout="responsive"
                                    width={300} // Asegúrate de proporcionar un tamaño adecuado
                                    height={300}
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
                            {/* Aquí es donde se coloca el Link para entrar al producto */}
                            <Link
                                href={`/product/${product.code}`}
                                className="absolute inset-0"
                                aria-label={`Ver detalles de ${product.name}`}
                            />
                        </div>
                    ))
                ) : (
                    <p>No se encontraron productos para &quot;{query}&quot;.</p>
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

export default Storebusqueda;
