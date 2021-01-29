import { Flex, FormLabel, Select, Skeleton, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { customerData } from '../../types';

/**
 * Chakra-ui `Select` component that saves a customers' object for later use in form w/ predefined stying
 * Handles state not loaded through param `loading`
 *
 * @see https://chakra-ui.com/docs/overlay/tooltip
 * {@link https://chakra-ui.com/docs/overlay/tooltip}
 * @see chakra-ui {@link https://chakra-ui.com/docs/overlay/tooltip `Select` Docs}
 * @see chakra-ui {@link https://chakra-ui.com/docs/form/select `Tooltip` Docs}
 * @see chakra-ui {@link https://chakra-ui.com/docs/feedback/skeleton `Skeleton` Docs}
 */

export const CustomerSelection = ({
  loading,
  customerList,
  setInvoiceCustomer,
}: {
  loading: boolean;
  customerList: customerData[] | undefined;
  setInvoiceCustomer: React.Dispatch<
    React.SetStateAction<customerData | undefined>
  >;
}) => {
  return (
    <Skeleton isLoaded={!loading} justifySelf="flex-end">
      <Tooltip hasArrow label="Select the customer">
        <Flex alignItems="center">
          <FormLabel>Customer</FormLabel>
          <Select
            w="200px"
            defaultValue=""
            onChange={(event) => {
              const index = parseInt(event.target.value);
              setInvoiceCustomer(customerList?.[index]);
            }}
            alignContent="center"
          >
            <option value="" hidden disabled>
              Select Customer...
            </option>
            {customerList?.map(({ id, firstname, lastname }, index) => (
              <option
                key={id}
                value={index}
              >{`${lastname}, ${firstname}`}</option>
            ))}
          </Select>
        </Flex>
      </Tooltip>
    </Skeleton>
  );
};
