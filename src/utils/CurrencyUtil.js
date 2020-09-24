export function  GetBrazillianCurrency(Price) 
{
    return 'R$' + Price.toFixed(2).replace(',', '.').replace('.', ',')
}