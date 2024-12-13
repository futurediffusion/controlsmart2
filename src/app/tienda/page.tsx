'use client'; // Marca el archivo como cliente

import { useRouter } from 'next/navigation'; // Importamos el router para enrutamiento dinámico
import Header from '../components/Header'; // Ruta correcta para Header
import Footer from '../components/Footer'; // Ruta correcta para Footer
import Store from '../components/store'; // Ruta correcta para Store
import Sidebar from '../components/Sidebar'; // Ruta correcta para Sidebar

const TiendaCategoryPage: React.FC = () => {
    const router = useRouter(); // Obtenemos el enrutador

    // Obtenemos la categoría desde el router, si existe
    const categoria = router.query?.categoria as string | undefined;

    // Formateamos la categoría para que el filtro sea válido
    const filterKey = 'category'; // Filtro basado en la propiedad 'category'
    const filterValue = categoria ? categoria.replace('-', ' ') : null;

    return (
        <main>
            <Header />
            <div className="flex gap-4 p-4">
                <Sidebar className="w-64" /> {/* Sidebar */}
                <Store filterKey={filterKey} filterValue={filterValue} className="flex-grow" /> {/* Store con filtro */}
            </div>
            <Footer />
        </main>
    );
};

export default TiendaCategoryPage;
