export const formatCurrency = (value: number) => Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
}).format(value)