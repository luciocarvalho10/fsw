"use server";

import { Order } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";

import { ICartProduct } from "../contexts/cart";
import { removeCpfPunctuation } from "../helpers/cpf";

interface ICreateOrderInput
  extends Pick<Order, "consumptionMethod" | "customerCpf" | "customerName"> {
  products: Pick<ICartProduct, "id" | "quantity">[];
  slug: string;
}

export const createOrder = async (input: ICreateOrderInput) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });
  if (!restaurant) throw new Error("Restaurant not found");
  const productWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });
  const productsWithPricesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productWithPrices.find((p) => p.id === product.id)!.price,
  }));
  await db.order.create({
    data: {
      consumptionMethod: input.consumptionMethod,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      customerName: input.customerName,
      status: "PENDING",
      restaurantId: restaurant.id,
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      total: productsWithPricesAndQuantities.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0,
      ),
    },
  });
  revalidatePath(`/${input.slug}/orders`);
  redirect(
    `/${input.slug}/orders?cpf=${removeCpfPunctuation(input.customerCpf)}`,
  );
};
