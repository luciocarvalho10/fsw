import { db } from "@/lib/prisma";

import { isValidCpf, removeCpfPunctuation } from "../menu/helpers/cpf";
import CpfForm from "./components/cpf-form";
import OrderList from "./components/order-list";
interface IOrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const OrdersPage = async ({ searchParams }: IOrdersPageProps) => {
  const { cpf } = await searchParams;
  if (!cpf || !isValidCpf(cpf)) return <CpfForm />;

  const orders = await db.order.findMany({
    where: {
      customerCpf: removeCpfPunctuation(cpf),
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true
        }
      },
      orderProducts: {
        include: { product: true }
      }
    },
  });

  return (
    <div>
      <OrderList orders={orders} />
    </div>
  );
};

export default OrdersPage;
