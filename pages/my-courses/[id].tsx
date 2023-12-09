import { NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import MyCourse from "../../src/Main/MyCourses/MyCourse";
import { useSingleCourseInfo } from "../../src/hooks/useCourses";
import { privateRoute } from "../../src/utils/utils";

const MyCoursePage = () => {
  const { query } = useRouter();
  const courseId = query?.id as string;
  const { data: courseInfo } = useSingleCourseInfo(courseId);
  return (
    <>
      <Head>
        <title>{courseInfo?.title || "My Course"}</title>
      </Head>

      <MyCourse courseId={courseId} />
    </>
  );
};

export default MyCoursePage;

MyCoursePage.getInitialProps = async (context: NextPageContext) =>
  privateRoute(context);
