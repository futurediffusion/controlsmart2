'use client';  // Marca el archivo como cliente

import { useRouter } from 'next/navigation'; // Importamos el router para enrutamiento dinámico
import Header from '../../components/Header';  // Ruta correcta para Header
import Footer from '../../components/Footer';  // Ruta correcta para Footer
import Sidebar from '../../components/Sidebar';  // Ruta correcta para Sidebar
import Storebusqueda from '@/app/components/storebusqueda';

export default function TiendaCategoryPage() {
    const router = useRouter(); // Obtenemos el enrutador

    // Comprobamos si 'categoria' está disponible en router.query antes de acceder a él
    const { categoria } = router.query || {};  // Destructuramos solo si router.query no es undefined

    // Verificamos que 'categoria' esté disponible
    const filterKey = 'category'; // Filtro por la propiedad 'category' de los productos
    const filterValue = categoria ? categoria.replace('-', ' ') : null; // Reemplazamos guiones por espacios

    return (
        <main>
            <Header />
            <div className="flex gap-4 p-4">
                <Sidebar className="w-64" />  {/* Sidebar */}
                <Storebusqueda filterKey={filterKey} filterValue={filterValue} className="flex-grow" /> {/* Store con filtro */}
            </div>
            <Footer />
        </main>
    );
}
