import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { ArrayHelpers, FieldArray, Form, Formik } from 'formik';
// FattMerchantApi
import FattMerchantApi from '../../api';
// types
import { catalog, customerData, customers, invoice, item } from '../../types';
// more generic custom formik components
import { CheckboxField } from '../customFormik/CheckBoxField';
import { InputField } from '../customFormik/InputField';
import { TextAreaField } from '../customFormik/TextAreaField';
import { NumberField } from '../customFormik/NumberField';
// components specific to this Invoice
import { ClearForm } from './InvoiceClearForm';
import { ItemSelect } from './InvoiceItemSelect';
import { Stat } from './InvoiceStat';
// yup schema passed into formik for form validation
import { invoiceValidationSchema } from './InvoiceValidation';
// util
import { formToast } from './InvoiceUtils';
import { CustomerSelection } from './InvoiceCustomerSelection';

/**
 * Form of an invoice utilizing: `Formik` for form management and `Yup` for validation of form w/ predefined styling
 */
const InvoiceForm = () => {
  // loading boolean/toggle for skeletons on items that require catalogState
  const [loading, setLoading] = useState<boolean>(false);
  // catalog state set by useEffect
  const [catalog, setCatalog] = useState<catalog | null>(null);
  // customers array set by useEffect
  const [customers, setCustomers] = useState<customers | null>(null);
  const [invoiceCustomer, setInvoiceCustomer] = useState<
    customerData | undefined
  >();

  // collect catalog items from FattMerchant API
  useEffect(() => {
    setLoading(true);
    FattMerchantApi.retrieveAllCatalogItems().then((value) => {
      setCatalog(value);
    });
    FattMerchantApi.findAllCustomers().then((value) => {
      setCustomers(value);
    });
    setLoading(false);
  }, [setCatalog]);

  /** initial state of item in `initialValues.items` */
  const itemState: item = {
    name: '',
    details: '',
    quantity: 0,
    price: '0.00',
    discounted: false,
  };

  /**
   * Initial values for an invoice used/passed into in `Formik`
   *
   * @see Formik {@link https://formik.org/docs/api/formik#initialvalues-values `InitialValues` Docs}
   */
  const initialValues: invoice = {
    memo: '',
    items: [itemState],
    total: '0.00',
  };

  /** alert used to give feedback to user on form success or form error on submit*/
  const toast = useToast();

  return (
    <Box pt={8} pb={30} mx="auto" height="90vh" maxW="900px">
      <Heading mt="4" mb="4">
        Invoice
      </Heading>

      <Formik
        initialValues={initialValues}
        // formik `onSubmit` automatically sets submitting boolean if anon-function is async
        onSubmit={async ({ memo, total, items }) => {
          await FattMerchantApi.createAnInvoice({
            // temporarily hard coded
            memo: memo,
            tax: '0.10',
            subtotal: `${total}`,
            lineItems: items,
            customer_id: invoiceCustomer?.id,
          })
            .then(() => toast(formToast('success')))
            .catch(() => toast(formToast('error')));
        }}
        validationSchema={invoiceValidationSchema}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <CustomerSelection
              loading={loading}
              customerList={customers?.data}
              setInvoiceCustomer={setInvoiceCustomer}
            />
            <TextAreaField
              name="memo"
              label="Memo"
              placeholder="your memo..."
            />

            <FieldArray name="items">
              {({ remove, push }: ArrayHelpers) => (
                <>
                  <Flex mt="2" mb="2">
                    <ItemSelect
                      loading={loading}
                      catalogItems={catalog?.data}
                    />
                    <Tooltip hasArrow label="Add empty item">
                      <Button
                        ml="2"
                        type="button"
                        onClick={() => push(itemState)}
                      >
                        Add Empty
                      </Button>
                    </Tooltip>
                  </Flex>

                  <Box overflowY="auto" maxH="50vh">
                    {values.items.length > 0 &&
                      values.items.map((_item, index) => (
                        <Flex
                          alignItems="flex-start"
                          key={`items.${index}`}
                          pt={index === 0 ? '20px' : 0}
                        >
                          <InputField
                            label={index === 0 ? 'Name' : ''}
                            name={`items.${index}.name`}
                            placeholder="Item name..."
                          />

                          <InputField
                            label={index === 0 ? 'Details' : ''}
                            name={`items.${index}.details`}
                            placeholder="details..."
                          />

                          <NumberField
                            label={index === 0 ? 'Qty' : ''}
                            name={`items.${index}.quantity`}
                          />

                          <NumberField
                            label={index === 0 ? 'Price' : ''}
                            name={`items.${index}.price`}
                            precision={2}
                          />

                          <CheckboxField
                            label={index === 0 ? 'Disc.' : ''}
                            name={`items.${index}.discounted`}
                          />

                          <Button
                            m="2"
                            type="button"
                            name={`items.${index}-remove-button`}
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            x
                          </Button>
                        </Flex>
                      ))}
                  </Box>
                </>
              )}
            </FieldArray>
            <Divider mt="4" />

            <Flex mt="2" justifyContent="flex-end">
              <Flex width="125px" flexDir="column">
                <Stat />
                <Button isLoading={isSubmitting} type="submit">
                  Submit
                </Button>
              </Flex>
            </Flex>

            <ClearForm />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default InvoiceForm;
