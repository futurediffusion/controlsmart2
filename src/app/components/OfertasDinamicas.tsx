'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Product {
    code: string;
    name: string;
    brand: string;
    price: string;
    imagePath?: string;
}

const OfertasDinamicas = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
    const [imageNames, setImageNames] = useState<string[]>([]);
    const [title, setTitle] = useState<string>('Productos en Oferta');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, imageNamesResponse] = await Promise.all([
                    fetch('/products.json'),
                    fetch('/nombres_imagenes.json')
                ]);

                const productsData = await productsResponse.json();
                const imageNamesData = await imageNamesResponse.json();

                setProducts(productsData);
                setImageNames(imageNamesData.code);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (products.length > 0 && imageNames.length > 0) {
            const matchedProducts = products.filter(
                (product) =>
                    imageNames.includes(`${product.code}.jpg`) ||
                    imageNames.includes(`${product.code}.png`)
            );

            const shuffledProducts = matchedProducts
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);

            const selectedProducts = shuffledProducts.slice(0, 3);

            const productsWithImages = selectedProducts.map((product) => {
                const matchingImageName = imageNames.find(
                    (name) => name.startsWith(product.code + '.')
                );

                const imagePath = matchingImageName
                    ? `/fotos_recortadas/${matchingImageName}`
                    : '/placeholder.jpg';

                return {
                    ...product,
                    imagePath,
                };
            });

            setDisplayProducts(productsWithImages);

            const brands = selectedProducts.map((product) => product.brand);
            const brandTitles: { [key: string]: string } = {
                'CASE': 'Los mejores Cases',
                'LG': 'Productos LG de Alta Calidad',
                'GENÉRICO': 'Genericos a Precios Increíbles',
                'SAMSUNG': 'Innovación y Tecnología de Samsung',
                'APPLE': 'Lo Mejor de Apple',
                'XIAOMI': 'Xiaomi: Tecnología y Estilo',
                'PHILIPS': 'Electrodomésticos y más de Philips'
            };

            setTitle(
                brands.find(brand => brandTitles[brand])
                    ? brandTitles[brands.find(brand => brandTitles[brand])!]
                    : 'Productos en Oferta'
            );
        }
    }, [products, imageNames]);

    if (isLoading) {
        return (
            <section className="product-line w-full flex flex-col items-center pb-8">
                <div className="animate-pulse text-2xl text-white">Cargando productos...</div>
            </section>
        );
    }

    return (
        <section className="product-line w-full flex flex-col items-center pb-8">
            <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>

            <div className="grid grid-cols-3 gap-4 w-full max-w-[800px] px-1 py-1 mx-2">
                {displayProducts.map((product) => (
                    <Link
                        key={product.code}
                        href={`/product/${product.code}`}
                        className="block"
                    >
                        <motion.div
                            className="w-full h-[200px] px-1 rounded-lg shadow-lg bg-red-500 text-white flex items-center justify-between"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 },
                            }}
                        >
                            <motion.div
                                className="w-[400px] h-full flex items-center justify-center relative"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                    ease: 'easeInOut',
                                }}
                            >
                                <Image
                                    src={product.imagePath || '/placeholder.jpg'}
                                    alt={`Producto ${product.name}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-contain"
                                    priority
                                    onError={(e) => {
                                        const imgElement = e.target as HTMLImageElement;
                                        imgElement.src = '/placeholder.jpg';
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                className="price-container flex flex-col self-center mt-1 mr-2"
                                whileHover={{
                                    scale: 1.2,
                                    transition: { duration: 0.3 },
                                }}
                            >
                                <p className="price text-6xl font-bold text-white">{product.price}</p>
                                <p className="brand text-lg font-semibold text-white mt-2">{product.brand}</p>
                            </motion.div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default OfertasDinamicas;