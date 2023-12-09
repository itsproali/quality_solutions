import React from "react";
import { privateRoute } from "../src/utils/utils";
import Carts from "../src/Main/Carts/Carts";
import Head from "next/head";

const CartsPage = () => {
  return (
    <>
      <Head>
        <title>Cart | One Quality Solutions</title>
      </Head>

      <Carts />
    </>
  );
};

export default CartsPage;

CartsPage.getInitialProps = async (context: any) => privateRoute(context);
