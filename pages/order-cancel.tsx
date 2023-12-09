import Head from "next/head";
import OrderCancel from "../src/components/Reused/Order/OrderCancel";

const OrderCancelPage = () => {
  return (
    <>
      <Head>
        <title>Order Cancel</title>
      </Head>

      <OrderCancel />
    </>
  );
};

export default OrderCancelPage;
