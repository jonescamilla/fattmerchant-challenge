import axios from 'axios';
import { item } from './types';

/**
 * `class` containing all mentions to the FattMerchant Api
 */
class FattMerchantApi {
  private static OmniAPIUrl = 'https://omni.fattmerchant.com/#/bill/';
  /** token passed as Bearer in FattMerchant headers */
  private static FM_TOKEN = process.env.FM_TOKEN;
  /** url to FattMerchant API */
  private static FM_API = process.env.FM_API;
  /** header object with Bearer token */
  static headers = {
    Authorization: `Bearer ${FattMerchantApi.FM_TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  /**
   * returns promise of axios `get` to `/item` from Fattmerchant API
   * @see Fattmerchant {@link https://fattmerchant.docs.apiary.io/#reference/0/catalog/retrieve-all-catalog-items Retrieve All Catalog Items Docs}
   */

  public static async retrieveAllCatalogItems() {
    return axios({
      method: 'get',
      url: `${this.FM_API}/item`,
      headers: this.headers,
    })
      .then((result) => {
        console.log(result.status, result.statusText);
        return result.data;
      })
      .catch((error) => {
        console.error(`ERROR in getItems: ${error.message}`);
      });
  }

  /**
   * returns promise of axios `post` to /invoice
   * @see Fattmerchant {@link https://fattmerchant.docs.apiary.io/#reference/0/invoices/create-an-invoice Create an Invoice Docs}
   */
  public static async createAnInvoice({
    memo,
    tax,
    subtotal,
    lineItems,
  }: {
    tax: string;
    subtotal: string;
    lineItems: item[];
    memo: string;
  }) {
    return axios({
      method: 'post',
      url: `${this.FM_API}/invoice`,
      headers: this.headers,
      data: {
        meta: {
          memo: memo,
          tax: tax,
          subtotal: subtotal,
          lineItems: lineItems,
        },
        // required by api
        total: subtotal,
        // required by api
        url: this.OmniAPIUrl,
      },
    })
      .then((result) => {
        console.log(result.status, result.statusText);
        return result;
      })
      .catch((error) => {
        console.error(`Error in createAnInvoice: ${error.message}`);
      });
  }
  /**
   * returns promise of axios 'get' to /customer
   *
   * @see Fattmerchant {@link https://fattmerchant.docs.apiary.io/#reference/0/customers/find-all-customers Find All Customers}
   */
  public static async findAllCustomers() {
    return axios({
      method: 'get',
      url: `${this.FM_API}/customer`,
      headers: this.headers,
    })
      .then((result) => {
        console.log(result.status, result.statusText);
        return result.data;
      })
      .catch((error) => {
        console.log(`ERROR in findAllCustomers: ${error.message}`);
      });
  }
}

export default FattMerchantApi;
