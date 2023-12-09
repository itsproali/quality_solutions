import Head from "next/head";
import OrderSuccess from "../src/components/Reused/Order/OrderSuccess";

const OrderSuccessPage = () => {
  return (
    <>
      <Head>
        <title>Order Success</title>
      </Head>

      <OrderSuccess />
    </>
  );
};

export default OrderSuccessPage;
