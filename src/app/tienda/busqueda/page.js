'use client';  // Marca el archivo como cliente

import { useRouter, useSearchParams } from 'next/navigation'; // Importamos useSearchParams
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import Storebusqueda from '@/app/components/storebusqueda';

export default function TiendaCategoryPage() {
    const router = useRouter(); // Mantén este hook si lo necesitas para navegación
    const searchParams = useSearchParams(); // Añade este hook para obtener parámetros de búsqueda

    // Obtén la categoría desde los parámetros de búsqueda
    const categoria = searchParams.get('categoria');

    // Verificamos que 'categoria' esté disponible
    const filterKey = 'category'; // Filtro por la propiedad 'category' de los productos
    const filterValue = categoria ? categoria.replace('-', ' ') : null; // Reemplazamos guiones por espacios

    return (
        <main>
            <Header />
            <div className="flex gap-4 p-4">
                <Sidebar className="w-64" />
                <Storebusqueda filterKey={filterKey} filterValue={filterValue} className="flex-grow" />
            </div>
            <Footer />
        </main>
    );
}