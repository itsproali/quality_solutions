import Courses from "../../src/Main/Courses/Courses";
import { SEO } from "../../src/components/Reused/Seo/Seo";

export default function CoursesPage() {
  return (
    <>
      <SEO
        title="Courses | One Quality Solutions"
        description="One Quality Solutions is a leading provider of IT services. We are committed to helping our clients achieve their goals through innovation, collaboration, and deep expertise."
      />

      <Courses />
    </>
  );
}
