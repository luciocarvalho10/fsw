import { ConsumptionMethod } from "@prisma/client";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import RestaurantHeader from "./components/header";

interface RestaurantPageProps {
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
}: RestaurantPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  const restaurant = await getRestaurantBySlug(slug);

  if (!isConsumptionMethodValid(consumptionMethod) || !restaurant)
    return notFound();

  return (
    <div className="">
      <RestaurantHeader restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPage;
