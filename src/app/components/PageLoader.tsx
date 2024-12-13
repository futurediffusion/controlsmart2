import React from 'react';

const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="relative flex flex-col items-center justify-center">
                <div className="relative w-64 h-64 flex items-center justify-center">
                    {/* Círculo principal con animación pulsante */}
                    <div className="absolute w-48 h-48 bg-blue-500 rounded-full animate-ping opacity-75"></div>

                    {/* Círculo intermedio con animación de rotación */}
                    <div className="absolute w-40 h-40 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                    {/* Círculo interno con sombra */}
                    <div className="absolute w-32 h-32 bg-white rounded-full shadow-2xl"></div>

                    {/* Elementos de animación adicionales */}
                    <div className="absolute w-24 h-24 bg-blue-400 rounded-full animate-pulse"></div>
                </div>

                {/* Texto de carga con animación */}
                <div className="mt-8 text-center">
                    <h2 className="text-2xl font-bold text-blue-600 animate-bounce">
                        Cargando
                    </h2>
                    <div className="flex space-x-1 justify-center mt-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-100"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-300"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageLoader;