import { ICourse } from "../../src/Interfaces/Course.interface";
import CourseDetails from "../../src/Main/Courses/CourseDetails";
import { SEO } from "../../src/components/Reused/Seo/Seo";
import { BASE_URL } from "../../src/services/AxiosCommon";

export default function CourseDetailsPage({ data }) {
  return (
    <>
      <SEO
        title={`${data?.title} | One Quality Solutions` || "Course Details"}
        image={data?.thumbnail || ""}
      />

      <CourseDetails course={data} />
    </>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(
    `${BASE_URL}/api/v1/course/details/${context.params.id}`
  );
  const course = await res.json();

  return {
    props: {
      data: course.result,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${BASE_URL}/api/v1/course`);
  const courses = await res.json();
  const paths = courses.result.courses.map((course: ICourse) => ({
    params: { id: course._id },
  }));
  return { paths, fallback: "blocking" };
}
