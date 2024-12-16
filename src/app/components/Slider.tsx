'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Slider: React.FC = () => {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isClient, setIsClient] = useState<boolean>(false);

    const slides: string[] = [
        '/images/imagen1.avif',
        '/images/imagen2.avif',
        '/images/imagen3.avif',
    ];

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length, isClient]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const handleBannerClick = () => {
        router.push('/tienda');
    };

    if (!isClient) return null;

    return (
        <section className="banner relative w-full h-full overflow-hidden bg-[#444]">
            <div className="slider relative flex flex-col items-center justify-center h-full sm:h-[72vh]">
                <div className="slides absolute w-full h-full flex items-center justify-center">
                    <AnimatePresence>
                        {slides.map((src, index) => (
                            index === currentIndex && (
                                <motion.a
                                    key={index}
                                    onClick={handleBannerClick}
                                    className="absolute w-full h-full cursor-pointer"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 1 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1.05
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 1
                                        }}
                                        transition={{
                                            opacity: { duration: 1 },
                                            scale: { duration: 5, ease: "easeOut" }
                                        }}
                                    >
                                        <Image
                                            src={src}
                                            alt={`Imagen ${index + 1}`}
                                            layout="responsive"
                                            width={1200}
                                            height={675}
                                            objectFit="cover"
                                            objectPosition="center"
                                            priority={index === 0}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                </motion.a>
                            )
                        ))}
                    </AnimatePresence>
                </div>

                <div className="controls flex justify-between items-center w-full px-4 sm:px-8 absolute top-1/2 transform -translate-y-1/2">
                    <button
                        onClick={prevSlide}
                        className="p-2 rounded-md bg-white bg-opacity-60 hover:bg-opacity-80 hover:scale-110 focus:outline-none transition duration-300"
                    >
                        <i className="fa-solid fa-chevron-left text-blue-500 text-lg"></i>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="p-2 rounded-md bg-white bg-opacity-60 hover:bg-opacity-80 hover:scale-110 focus:outline-none transition duration-300"
                    >
                        <i className="fa-solid fa-chevron-right text-blue-500 text-lg"></i>
                    </button>
                </div>

                <div className="dots flex gap-2 justify-center mt-4">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`dot w-2.5 h-2.5 rounded-full cursor-pointer transition-colors duration-300 hover:scale-110 ${index === currentIndex ? 'bg-blue-500' : 'bg-white bg-opacity-70'}`}
                            onClick={() => setCurrentIndex(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Slider;