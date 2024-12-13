'use client';  // Marca el archivo como cliente

import { useRouter } from 'next/navigation'; // Importamos el router para enrutamiento dinámico
import Header from '../../components/Header';  // Ruta correcta para Header
import Footer from '../../components/Footer';  // Ruta correcta para Footer
import Store from '../../components/storesmart';  // Ruta correcta para Store
import Sidebar from '../../components/Sidebar';  // Ruta correcta para Sidebar
import Storesmart from '@/app/components/storesmart';

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
                <Storesmart filterKey={filterKey} filterValue={filterValue} className="flex-grow" /> {/* Store con filtro */}
            </div>
            <Footer />
        </main>
    );
}
