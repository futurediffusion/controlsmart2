'use client'; // Marca el archivo como cliente

import { useSearchParams } from 'next/navigation'; // Importamos useSearchParams para obtener parámetros de búsqueda
import Header from '../../components/Header'; // Ruta correcta para Header
import Footer from '../../components/Footer'; // Ruta correcta para Footer
import Sidebar from '../../components/Sidebar'; // Ruta correcta para Sidebar
import Storefundas from '@/app/components/storefundas';

export default function TiendaCategoryPage() {
    const searchParams = useSearchParams(); // Hook para obtener parámetros de búsqueda

    // Obtenemos el parámetro "categoria" de la URL
    const categoria = searchParams.get('categoria');

    // Configuramos el filtro para Storefundas
    const filterKey = 'category'; // Filtro por la propiedad 'category' de los productos
    const filterValue = categoria ? categoria.replace('-', ' ') : null; // Reemplazamos guiones por espacios

    return (
        <main>
            <Header />
            <div className="flex gap-4 p-4">
                <Sidebar className="w-64" /> {/* Sidebar */}
                <Storefundas filterKey={filterKey} filterValue={filterValue} className="flex-grow" /> {/* Store con filtro */}
            </div>
            <Footer />
        </main>
    );
}
