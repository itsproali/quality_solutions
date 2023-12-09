import Head from "next/head";
import OrderError from "../src/components/Reused/Order/OrderError";

const OrderErrorPage = () => {
  return (
    <>
      <Head>
        <title>Order Error</title>
      </Head>

      <OrderError />
    </>
  );
};

export default OrderErrorPage;
