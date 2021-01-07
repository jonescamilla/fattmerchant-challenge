import * as yup from 'yup';
/**
 * `Yup` schema passed in `Formik` for form validation
 * @see Yup {@link https://github.com/jquense/yup Docs}
 */
export const invoiceValidationSchema = yup.object({
  // `memo`: is a string, is required to submit and must not exceed 500 characters
  memo: yup
    .string()
    .min(5, 'Too short!')
    .max(500, 'no more than 500 characters')
    .required('Please add Invoice Memo'),
  items: yup.array().of(
    yup.object().shape({
      // `details`: is a string, is required to submit and must not exceed 100 characters
      name: yup
        .string()
        .min(3, 'Too short!')
        .max(25, 'No more than 25 characters')
        .required('Name is required'),
      details: yup
        .string()
        .min(5, 'Too short!')
        .max(100, 'No more than 100 characters')
        .required('Item Details are required'),
      // `quantity`: is a number and has a minium of one
      quantity: yup.number().min(1, 'at least one item'),
      // `price`: is a number
      price: yup.number(),
      discounted: yup.boolean(),
    })
  ),
  // `total`: is a numbers
  total: yup.number(),
});
