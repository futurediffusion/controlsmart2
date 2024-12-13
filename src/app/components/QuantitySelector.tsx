'use client';
import React, { useState } from 'react';

// Definición de tipos para las props
interface QuantitySelectorProps {
    maxQuantity?: number; // Prop opcional para la cantidad máxima
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ maxQuantity = 10 }) => {
    const [quantity, setQuantity] = useState<number>(1); // Estado con tipo explícito de número

    // Función para disminuir la cantidad
    const decreaseQuantity = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1)); // Asegura que la cantidad no sea menor que 1
    };

    // Función para aumentar la cantidad
    const increaseQuantity = () => {
        setQuantity(prevQuantity => Math.min(maxQuantity, prevQuantity + 1)); // Asegura que no supere la cantidad máxima
    };

    return (
        <div className="flex items-center space-x-2">
            <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                    onClick={decreaseQuantity}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <i className="fa-solid fa-minus text-gray-600"></i>
                </button>
                <span className="px-4 py-2 text-center min-w-[50px]">{quantity}</span>
                <button
                    onClick={increaseQuantity}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <i className="fa-solid fa-plus text-gray-600"></i>
                </button>
            </div>
        </div>
    );
};

export default QuantitySelector;
