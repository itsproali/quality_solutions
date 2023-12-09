import Events from "../../src/Main/Events/Events";
import { SEO } from "../../src/components/Reused/Seo/Seo";

export default function Event() {
  return (
    <>
      <SEO
        title="Events | One Quality Solutions"
        description="One Quality Solutions is a leading provider of IT services. We are committed to helping our clients achieve their goals through innovation, collaboration, and deep expertise."
      />

      <Events />
    </>
  );
}
