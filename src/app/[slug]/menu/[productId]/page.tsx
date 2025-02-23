import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductDetails from "./components/product-details";
import ProductHeader from "./components/products-header";

interface IProductPageProps {
    params: Promise<{ slug: string; productId: string }>
}

const ProductPage = async ({ params }: IProductPageProps) => {
    const { slug, productId } = await params;
    const products = await db.product.findUnique({ where: { id: productId }, include: { restaurant: { select: { name: true, avatarImageUrl: true, slug: true } } } });

    if (!products || products.restaurant.slug.toLowerCase() !== slug.toLowerCase()) return notFound()

    return (
        <div className="flex flex-col h-full">
            <ProductHeader products={products} />
            <ProductDetails products={products} />
        </div>
    );
}

export default ProductPage;