export default function formatCurrency(value, currency) {
  let formattedValue;
  switch(currency) {
    case 'SGD':
      formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'SGD', minimumFractionDigits: 0, maximumFractionDigits: 0}).format(value)
      break;
    case 'CNY':
      formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CNY', minimumFractionDigits: 0, maximumFractionDigits: 0}).format(value)
      break;
    case 'KRW':
      formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KRW', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value)
      break;
    default:
      formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value)
  }
  return formattedValue;
}
 
