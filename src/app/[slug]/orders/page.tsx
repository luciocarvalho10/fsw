import { isValidCpf } from "../menu/helpers/cpf"
import CpfForm from "./components/cpf-form"

interface IOrdersPageProps {
  searchParams: Promise<{ cpf: string }>
}

const OrdersPage = async ({ searchParams }: IOrdersPageProps) => {
  const { cpf } = await searchParams
  if (!cpf || !isValidCpf(cpf)) return <CpfForm />

  return (
    <div>
      <h1>Orders Page</h1>
    </div>
  )
}

export default OrdersPage