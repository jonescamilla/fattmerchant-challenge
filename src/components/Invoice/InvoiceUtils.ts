import { UseToastOptions } from '@chakra-ui/react';
import { item } from '../../types';

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

/**
 * Returns object of type `UseToastOptions` based on parameter `status`
 * @param {'status' | 'error'} status - used in conditional on what to
 * @returns {UseToastOptions}
 */
export const formToast = (status: 'success' | 'error'): UseToastOptions => {
  const ToastOptions: Record<'success' | 'error', UseToastOptions> = {
    success: {
      title: 'Invoice Submitted!',
      description: "You're invoice was successfully submitted and received!",
      status: 'success',
    },
    error: {
      title: 'Something happened ;-;',
      description:
        "We're not quite sure what happened but we're certain a member is already looking for a solution!",
      status: 'error',
    },
  };
  const passedOptions =
    status === 'success' ? ToastOptions.success : ToastOptions.error;

  return {
    position: 'bottom-left',
    duration: 9000,
    isClosable: true,
    ...passedOptions,
  };
};

/**
 * Formats a price provided to best fit form
 * [used in select dropdown]
 */
export const priceFormatter = (price: string | number | null) => {
  if (typeof price === 'string') price = parseFloat(price);
  if (typeof price === 'number') price = price.toFixed(2);
  if (price === null) price = '0.00';
  return `${price}`;
};
