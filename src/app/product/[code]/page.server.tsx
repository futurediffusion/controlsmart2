// Definir el tipo Product
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

// Lógica de servidor para obtener los productos desde un archivo JSON externo
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

// Generar rutas estáticas
export async function generateStaticParams() {
    const products = await getProducts();
    return products.map(product => ({
        code: product.code,
    }));
}

// Generación de metadatos
export async function generateMetadata({ params }: { params: { code: string } }) {
    const { code } = params;
    const products = await getProducts();
    const product = products.find(p => p.code === code);

    return {
        title: product ? product.name : 'Producto no encontrado',
    };
}
