import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductHeader from "./components/products-header";

interface IProductPageProps {
    params: Promise<{ slug: string; productId: string }>
}

const ProductPage = async ({ params }: IProductPageProps) => {
    const { slug, productId } = await params;
    const products = await db.product.findUnique({ where: { id: productId } });

    if (!products) return notFound()

    return (
      <>
        <ProductHeader products={products} />
      </>
    );
}

export default ProductPage;