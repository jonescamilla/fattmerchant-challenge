import { Skeleton, Tooltip, Select } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React from 'react';
import { catalogData, invoice } from '../../types';
import { priceFormatter } from './InvoiceUtils';

/**
 * Chakra-ui `Select` component that appends selected option to end of `items` array w/ predefined styling
 * Handles state not loaded through param `loading`
 *
 * @see https://chakra-ui.com/docs/overlay/tooltip
 * {@link https://chakra-ui.com/docs/overlay/tooltip}
 * @see chakra-ui {@link https://chakra-ui.com/docs/overlay/tooltip `Select` Docs}
 * @see chakra-ui {@link https://chakra-ui.com/docs/form/select `Tooltip` Docs}
 * @see chakra-ui {@link https://chakra-ui.com/docs/feedback/skeleton `Skeleton` Docs}
 * @see Formik {@link https://formik.org/docs/api/useFormikContext `useFormikContext()` Docs}
 */
//
export const ItemSelect = ({
  loading,
  catalogItems,
}: {
  loading: boolean;
  catalogItems: catalogData[] | undefined;
}) => {
  const {
    values: { items },
    setFieldValue,
  } = useFormikContext<invoice>();
  /** appends selected item based on param index to `items` array */
  const addCatalogItem = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // if we have not loaded items don't add item
    if (!catalogItems) return;
    const index = parseInt(event.target.value);
    const {
      item,
      details,
      price,
      is_discount,
    }: catalogData | undefined = catalogItems?.[index];
    // append items with new item w/ values from selection
    setFieldValue('items', [
      ...items,
      {
        name: item,
        details: details === null ? '' : details,
        price: priceFormatter(price),
        discounted: is_discount,
        quantity: 0,
      },
    ]);
  };

  return (
    <Skeleton isLoaded={!loading} w="200px">
      <Tooltip hasArrow label="Select an item to add">
        <Select
          defaultValue=""
          onChange={(event) => {
            addCatalogItem(event);
          }}
          alignContent="center"
        >
          <option value="" hidden disabled>
            Add item...
          </option>
          {catalogItems?.map((item, index) => (
            <option key={`option.${index}`} value={index}>
              {item.item}
            </option>
          ))}
        </Select>
      </Tooltip>
    </Skeleton>
  );
};
