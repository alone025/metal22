export default function getProductPrice({
  price,
  discount,
}: {
  price: number;
  discount: number;
}) {
  if (price <= 1) return 'По запросу';

  let adjustedPrice;

  if (discount > 100) {
    adjustedPrice = price * (discount / 100);
  } else {
    adjustedPrice = price - price * (discount / 100);
  }

  return Math.round(adjustedPrice).toLocaleString('DE-de');
}
