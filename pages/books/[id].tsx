import Head from "next/head";
import { IBook } from "../../src/Interfaces/Book.interface";
import { BASE_URL } from "../../src/services/AxiosCommon";
import BookDetails from "../../src/Main/Books/BookDetails";

const BookDetailsPage = ({ data }) => {
  return (
    <>
      <Head>
        <title>Book Details</title>
      </Head>

      <BookDetails data={data} />
    </>
  );
};

export default BookDetailsPage;

export async function getStaticProps(context) {
  const res = await fetch(`${BASE_URL}/api/v1/book/${context.params.id}`);
  const book = await res.json();

  return {
    props: {
      data: book.result,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${BASE_URL}/api/v1/book`);
  const book = await res.json();

  const paths = book.result.data.map((book: IBook) => ({
    params: { id: book._id },
  }));
  return { paths, fallback: "blocking" };
}
