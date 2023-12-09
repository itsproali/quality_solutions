import { NoSsr } from "@mui/material";
import Head from "next/head";
import About from "../src/Main/Home/About/About";
import Banner from "../src/Main/Home/Banner/Banner";
import Blogs from "../src/Main/Home/Blogs/Blogs";
import Contact from "../src/Main/Home/Contact/Contact";
import FeaturedCourses from "../src/Main/Home/FeaturedCourses/FeaturedCourses";
import FeaturedEvents from "../src/Main/Home/FeaturedEvents/FeaturedEvents";
import PopularProduct from "../src/Main/Home/PopularProducts/PopularProducts";
import PopularService from "../src/Main/Home/PopularService/PopularService";
import WhatWeProvide from "../src/Main/Home/WhatWeProvide/WhatWeProvide";

export default function Home({ blogs }) {
  return (
    <>
      <Head>
        <title>Quality Solutions</title>
      </Head>{" "}
      <Banner />
      <WhatWeProvide />
      <FeaturedEvents />
      <PopularService />
      <PopularProduct />
      <FeaturedCourses />
      <About />
      <Blogs />
      {/* <h1>this is blog section</h1> */}
      <NoSsr>
        <Contact />
      </NoSsr>
    </>
  );
}

// export async function getStaticProps() {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(["products"], () =>
//     ProductServices.getProducts().then((res) => res)
//   );
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

// export async function getStaticProps() {
//   const response = await fetch(
//     "https://ijlsbd.com/qs-blog/wp-json/wp/v2/posts"
//   );
//   const data = await response.json();
//   return {
//     props: {
//       blogs: data,
//     },
//   };
// }
