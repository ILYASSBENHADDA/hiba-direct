export default function PriceFormat(price) {
     const pFormat = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
     }).format(price)
     
     return (
          pFormat
     )
}