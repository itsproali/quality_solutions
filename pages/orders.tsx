import Head from "next/head";
import Orders from "../src/Main/Orders/Orders";
import { privateRoute } from "../src/utils/utils";
import DashboardLayout from "../src/components/Layout/DashboardLayout";

export default function OrdersPage() {
  return (
    <>
      <Head>
        <title>My Orders</title>
      </Head>
      <Orders />
    </>
  );
}

OrdersPage.getInitialProps = async (context: any) => privateRoute(context);
OrdersPage.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
