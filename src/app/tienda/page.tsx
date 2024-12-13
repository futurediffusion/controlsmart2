'use client'; // Marca el archivo como cliente

import { useRouter } from 'next/navigation'; // Importamos el router para enrutamiento dinámico
import Header from '../components/Header';  // Ruta correcta para Header
import Footer from '../components/Footer';  // Ruta correcta para Footer
import Store from '../components/store';  // Ruta correcta para Store
import Sidebar from '../components/Sidebar';  // Ruta correcta para Sidebar

interface TiendaCategoryPageProps { }

const TiendaCategoryPage: React.FC<TiendaCategoryPageProps> = () => {
    const router = useRouter(); // Obtenemos el enrutador

    // Verificamos si 'router.query' existe antes de acceder a 'categoria'
    const categoria = router.query?.categoria as string | undefined; // 'categoria' es un string opcional

    // Verificamos si 'categoria' está disponible y la formateamos
    const filterKey = 'category'; // Filtro por la propiedad 'category' de los productos
    const filterValue = categoria ? categoria.replace('-', ' ') : null; // Reemplazamos guiones por espacios

    return (
        <main>
            <Header />
            <div className="flex gap-4 p-4">
                <Sidebar className="w-64" />  {/* Sidebar */}
                <Store filterKey={filterKey} filterValue={filterValue} className="flex-grow" /> {/* Store con filtro */}
            </div>
            <Footer />
        </main>
    );
};

export default TiendaCategoryPage;
