/**
 * item found in @property items from @type {invoice}
 * @property {string} details
 * @property {number} quantity
 * @property {string} price
 * @property {boolean} discounted
 */
export interface item {
  details: string;
  quantity: number;
  price: string;
  discounted: boolean;
}
/**
 * @property {string} memo
 * @property {item[]} items
 * @property {string} total
 */
export interface invoice {
  memo: string;
  items: item[];
  total: string;
}
