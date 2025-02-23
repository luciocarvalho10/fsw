import { ConsumptionMethod } from "@prisma/client";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

interface IRestaurantPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) =>
  Object.values(ConsumptionMethod).includes(
    consumptionMethod.toUpperCase() as ConsumptionMethod,
  );

const RestaurantPage = async ({
  params,
  searchParams,
}: IRestaurantPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategories: {
        include: { products: true },
      },
    },
  });

  if (!isConsumptionMethodValid(consumptionMethod) || !restaurant)
    return notFound();

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPage;
