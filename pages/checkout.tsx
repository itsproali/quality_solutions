import React from "react";
import Checkout from "../src/Main/Checkout/Checkout";

import { privateRoute } from "../src/utils/utils";
import Head from "next/head";

const CheckoutPage = () => {
  return (
    <>
      <Head>
        <title>Checkout | One Quality Solutions</title>
      </Head>

      <Checkout />
    </>
  );
};

export default CheckoutPage;

CheckoutPage.getInitialProps = async (context: any) => privateRoute(context);
