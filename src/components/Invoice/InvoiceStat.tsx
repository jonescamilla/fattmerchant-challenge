import {
  StatLabel,
  StatNumber,
  StatHelpText,
  Stat as ChakraStat,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React from 'react';
import { invoice } from '../../types';
import { calculateTotal } from './InvoiceUtils';

/**
 * Custom `Stat` component from chakra-ui that displays the form `total` w/ predefined styling and handles setting invoice total
 *
 * @see chakra-ui {@link https://chakra-ui.com/docs/data-display/stat `Stat` Docs}
 * @see Formik {@link https://formik.org/docs/api/useFormikContext `useFormikContext()` Docs}
 */
export const Stat = () => {
  const {
    values: { total, items },
    setFieldValue,
  } = useFormikContext<invoice>();

  React.useEffect(() => {
    setFieldValue('total', calculateTotal(items));
  }, [total, items, setFieldValue]);

  return (
    <ChakraStat width="125px" textAlign="right">
      <StatLabel>Invoice Total</StatLabel>
      <StatNumber fontSize="4xl">${total}</StatNumber>
      <StatHelpText>{`${items.length} total items`}</StatHelpText>
    </ChakraStat>
  );
};
