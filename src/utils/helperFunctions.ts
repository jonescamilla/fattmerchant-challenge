import { item } from '../types';

/**
 * Will return new evaluation of `total` based on the `price` and `quantity` of all items
 * @param {item[]} items array of items taken from `invoice`
 */
export const calculateTotal = (items: item[]) =>
  items.reduce((total, { price, quantity }) => {
    const itemTotal = parseFloat(price) * quantity;
    total = `${(parseFloat(total) + itemTotal).toFixed(2)}`;
    return total;
  }, '0.00');
