import { InputHTMLAttributes } from 'react';

/**
 * item found in @property items from @type {invoice}
 */
export interface item {
  /** name of item */
  name: string;
  /** the details of an item */
  details: string;
  /** the amount of items */
  quantity: number;
  /** the price of an item */
  price: string;
  /** boolean on whether an item is discounted */
  discounted: boolean;
}

/**
 * invoice structure/typing
 */
export interface invoice {
  /** memo of an invoice */
  memo: string;
  /** collection of `item`s in an invoice */
  items: item[];
  /** the subtotal of an invoice */
  total: string;
}

/**
 * used or potentially used params from call to FattMerchantApi `/items`
 */
export interface catalog {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  next_page_url: null | string;
  prev_page_url: null | string;
  data: catalogData[];
}

/**
 * used prams in `data` found on `catalog`
 */
export interface catalogData {
  id: string;
  /** item name??? */
  item: string;
  /** details of item */
  details: string;
  /** boolean indicating of item has been discounted */
  is_discount: boolean | null;
  /** subtotal of item price */
  price: number | string;
}

/**
 * params used in custom formik components found in `formikComponents`
 */
export type customFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  placeholder?: string;
  precision?: number;
  index?: number;
};

export type customers = {
  total: string;
  current_page: string;
  last_page: string;
  next_page_url: null | string;
  prev_page_url: null | string;
  data: customerData[];
};

export type customerData = {
  id: string;
  firstname: string;
  lastname: string;
  gravatar: string;
  phone: string;
  company: string;
  email: string;
  cc_emails: string[] | null;
};
