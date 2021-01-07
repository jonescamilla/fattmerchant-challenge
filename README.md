# Invoice - FattMerchant Challenge

Front End application that allows a user to create a new Invoice either with already created items or new items.

## Technologies

- Typescript - [4.1](https://github.com/microsoft/TypeScript)
- React - [17.0](https://github.com/facebook/react)
- Next - [10.0](https://github.com/vercel/next.js)
- Chakra-ui - [1.0](https://github.com/chakra-ui/chakra-ui)
- Formik - [2.2](https://github.com/formium/formik)
- Yup - [0.32](https://github.com/jquense/yup)
- axios - [0.21](https://github.com/axios/axios)
- dotenv - [8.2](https://github.com/motdotla/dotenv)
- Yarn - [1.22](https://github.com/yarnpkg/yarn)
- GitHub

## Links to Documentation!

- Link to docs of heavily used technologies
  - Next [Docs](https://nextjs.org/docs)
  - Chakra-ui [Docs](https://chakra-ui.com/)
  - Formik [Docs](https://formik.org/docs/overview)

## How to run

**Prerequisites:**

1. you'll first need a `.env` file containing a structure as follows for the project to run properly

   ```.env
   FM_TOKEN = "..."
   FM_API = "..."
   ```

**Getting started:**

2. unzip `fattmerchant-challenge.zip` or clone [this](https://github.com/jonescamilla/fattmerchant) repo to the directory of your choosing
3. open your terminal to the root folder of this project and run:

   ```shell
   yarn
   ```

   or npm's equivalent: `npm i`

4. Run the following if you're interested in running production

   **Production**

   ```shell
   yarn prod
   # followed by
   yarn start
   ```

5. or the following if you're interested in running in development

   **Development**

   ```shell
   yarn dev
   ```

## Requirement

- [x] Have a page with an invoice creation form, fields should include:
  - [x] Memo
  - [x] Line Items: details, quantity, price
  - [x] Total
- [x] make a GET network call to the `item` resource
- [x] add any line the user chooses to the meta field of the invoice
- [x] Calculate the total by adding the prices and quantities together for all line items chosen
- [x] make a POST network call to the `invoice` resource
- [x] display some notice that the invoice was created and allow the user to start fresh with a new invoice

#### Bonus

- [x] Make _Some_ UI changes when the invoice is created
- [ ] Allow the user to choose a customer:
  - [ ] do a GET to `customer` resource
- [ ] Line item pagination
- [ ] Line item autofill
- [x] Take into account line items which are discounted

## Contributing

- issues and pull requests are **more than welcome!**

## Contact

**Jonathan Escamilla**

- jonathanescamilla1@gmail.com
- 323 618 3638
- [LinkedIn](https://www.linkedin.com/in/jon-escamilla/)
- [GitHub](https://github.com/jonescamilla)
