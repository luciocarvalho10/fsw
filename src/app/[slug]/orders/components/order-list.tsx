"use client";

import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

interface IOrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: { select: { name: true; avatarImageUrl: true } };
        orderProducts: { include: { product: true } };
      };
    }>
  >;
}

const getStatusLabel = (status: string) =>
  status === OrderStatus.FINISHED
    ? "Finalizado"
    : status === OrderStatus.IN_PREPARATION
      ? "Em Preparação"
      : status === OrderStatus.PENDING
        ? "Pendente"
        : "";

const statusClass = (status: string) =>
  status === OrderStatus.FINISHED
    ? "bg-green-500 text-white"
    : "bg-gray-200 text-gray-500";

const OrderList = ({ orders }: IOrderListProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="space-y-6 p-6">
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <div className="items-cnter flex gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>

      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 p-5">
            <div
              className={`w-fit rounded-full px-2 py-1 text-xs font-semibold ${statusClass(order.status)}`}
            >
              {getStatusLabel(order.status)}
            </div>
            <div className="items-centr flex gap-2">
              <div className="relative h-5 w-5">
                <Image
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                  fill
                  className="rounded-sm"
                />
              </div>
              <p className="text-sm font-semibold">{order.restaurant.name}</p>
            </div>
            <Separator />
            <div className="space-y-2">
              {order.orderProducts.map((orderProduct) => (
                <div className="items-centr flex gap-2" key={orderProduct.id}>
                  <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                    {orderProduct.quantity}
                  </div>
                  <p className="text-sm font-semibold">
                    {orderProduct.product.name}
                  </p>
                </div>
              ))}
            </div>
            <Separator />
            <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
