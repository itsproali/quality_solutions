import Head from "next/head";
import MyCourses from "../../src/Main/MyCourses/MyCourses";
import { privateRoute } from "../../src/utils/utils";
import DashboardLayout from "../../src/components/Layout/DashboardLayout";

const MyCoursesPage = () => {
  return (
    <>
      <Head>
        <title>My Courses</title>
      </Head>

      <MyCourses />
    </>
  );
};

export default MyCoursesPage;

MyCoursesPage.getInitialProps = async (context: any) => privateRoute(context);
MyCoursesPage.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
