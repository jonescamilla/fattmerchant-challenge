import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

/**
 * used to augment the application's `<html>` and `<body>` tags
 */
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <title>Invoice Form</title>
        <meta
          name="Description"
          content="Simple invoice form utilizing: Formik, Next.js, Yup, Typescript, React, chakra-ui, and axios to demonstrate FattMerchant's API"
        ></meta>
        <Head />
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
