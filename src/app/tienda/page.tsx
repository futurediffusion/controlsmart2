'use client'; // Marca el archivo como cliente

import { useRouter, useSearchParams } from 'next/navigation'; // Importa useSearchParams
import Header from '../components/Header';
import Footer from '../components/Footer';
import Store from '../components/store';
import Sidebar from '../components/Sidebar';

const TiendaCategoryPage: React.FC = () => {
    const router = useRouter(); // Mantén este hook si lo necesitas para navegación
    const searchParams = useSearchParams(); // Añade este hook para obtener parámetros de búsqueda

    // Obtén la categoría desde los parámetros de búsqueda
    const categoria = searchParams.get('categoria') as string | null;

    // Formateamos la categoría para que el filtro sea válido
    const filterKey = 'category'; // Filtro basado en la propiedad 'category'
    const filterValue = categoria ? categoria.replace('-', ' ') : null;

    return (
        <main>
            <Header />
            <div className="flex gap-4 p-4">
                <Sidebar className="w-64" />
                <Store filterKey={filterKey} filterValue={filterValue} className="flex-grow" />
            </div>
            <Footer />
        </main>
    );
};

export default TiendaCategoryPage;