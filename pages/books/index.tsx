import Books from "../../src/Main/Books/Books";
import { SEO } from "../../src/components/Reused/Seo/Seo";

const BooksPage = () => {
  return (
    <>
      <SEO title="Books | One Quality Solutions" />

      <Books />
    </>
  );
};

export default BooksPage;
