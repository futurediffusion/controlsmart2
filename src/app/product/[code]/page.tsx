import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import InfiniteProductCarousel from '../../components/InfiniteProductCarousel';
import QuantitySelector from '../../components/QuantitySelector';
import Image from 'next/image';

type Product = {
    code: string;
    name: string;
    price: string;
    brand: string;
    category: string;
    image_url: string;
    additional_info: string;
    specifications: string;
};

// Función para obtener los productos desde el archivo JSON
async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/products.json`);
        if (!res.ok) throw new Error('Error fetching products');
        return await res.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Función para obtener un producto específico por su código
async function getProductByCode(code: string): Promise<Product | null> {
    const products = await getProducts();
    return products.find(product => product.code === code) || null;
}

// Componente de página para un producto específico
const ProductPage = async ({ params }: { params: { code: string } }) => {
    const { code } = params; // Eliminar `await` aquí

    const product = await getProductByCode(code);
    if (!product) {
        notFound(); // Si no se encuentra el producto, se retorna un 404
    }

    return (
        <main className="flex flex-col min-h-screen">
            <Header />
            <div className="flex container mx-auto px-4 py-8 flex-grow">
                <Sidebar currentProductCode={product.code} brand={product.brand} />

                <div className="w-3/4 pl-8">
                    <div className="flex space-x-8">
                        <div className="w-1/2 flex items-center justify-center">
                            <div className="relative max-w-full max-h-[500px]">
                                <Image
                                    src={product.image_url}
                                    alt={product.name}
                                    layout="intrinsic"
                                    width={500}
                                    height={500}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div className="w-1/2 flex flex-col">
                            <div className="mb-4">
                                <h1 className="text-xl font-semibold mb-2">{product.name}</h1>
                                <p className="text-4xl font-bold text-red-600">{product.price}</p>
                            </div>
                            <div className="mb-4">
                                <p className="font-bold">Marca: <span className="font-normal">{product.brand}</span></p>
                                <p className="font-bold">Categoría: <span className="font-normal">{product.category}</span></p>
                            </div>
                            <div className="flex items-center space-x-4 mt-4">
                                <QuantitySelector />
                                <button
                                    className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md flex items-center justify-center space-x-1 flex-grow"
                                >
                                    <i className="fa-solid fa-cart-plus mr-2"></i>
                                    <span>Añadir al Carrito</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex space-x-4 mt-8">
                        <div className="w-1/2 p-2 bg-gray-50 rounded-lg">
                            <h2 className="font-semibold mb-2 text-sm">Información Adicional</h2>
                            <p className="text-sm text-gray-700 whitespace-pre-line">
                                {product.additional_info}
                            </p>
                        </div>
                        <div className="w-1/2 p-2 bg-gray-50 rounded-lg">
                            <h2 className="font-semibold mb-2 text-sm">Especificaciones</h2>
                            <p className="text-sm text-gray-700 whitespace-pre-line">
                                {product.specifications}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <InfiniteProductCarousel />
            <Footer />
        </main>
    );
};

export default ProductPage;
