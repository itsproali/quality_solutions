import { capitalize } from "@mui/material";
import ProductDetails from "../../src/Main/ProductDetails/ProductDetails";
import { SEO } from "../../src/components/Reused/Seo/Seo";
import { BASE_URL } from "../../src/services/AxiosCommon";

const ProductPage = ({ data }) => {
  return (
    <>
      <SEO title={capitalize(data?.type || "")} image={data?.image} />
      <ProductDetails data={data} />
    </>
  );
};

export default ProductPage;

export async function getStaticProps(context) {
  const res = await fetch(`${BASE_URL}/api/v1/product/${context.params.id}`);
  const product = await res.json();

  return {
    props: {
      data: product.result,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${BASE_URL}/api/v1/product`);
  const products = await res.json();

  const paths = products.result.data.map((product) => ({
    params: { id: product._id },
  }));
  return { paths, fallback: "blocking" };
}

// export const getServerSideProps = async (ctx) => {
//   const { id } = ctx.params;
//   // console.log("id", id);
//   const res = await fetch(`${BASE_URL}/api/v1/product/${id}`);
//   const data = await res.json();
//   return {
//     props: {
//       data,
//     },
//   };
// };
