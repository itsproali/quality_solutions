import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../src/components/Reused/Footer/Footer";
import Header from "../../src/components/Reused/Header/Header";
import Head from "next/head";
import { SEO } from "../../src/components/Reused/Seo/Seo";

const SingleBlog = ({ data }) => {

  if (!data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <CircularProgress />
        <Typography variant="body1" mt={2}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <SEO
        title={data?.title?.rendered}
        description={data?.excerpt?.rendered}
        image={data?.better_featured_image?.media_details?.sizes?.medium?.source_url}
        url={ `https://www.1qualitysolutions.com/${data?.id}`}
      />
      <Container
        fixed
        sx={{
          py: 15,
          a: {
            color: "#4287f5",
          },
          p: {
            fontFamily: "'Poppins', sans-serif!important",
          },
        }}
      >
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          {data?.title?.rendered}
        </Typography>
        <Box dangerouslySetInnerHTML={{ __html: data?.content?.rendered }} />
      </Container>
    </Box>
  );
};

export default SingleBlog;

export const getStaticProps = async (ctx) => {
  const params = ctx.params.id;
  const response = await fetch(
    `https://ijlsbd.com/qs-blog/wp-json/wp/v2/posts/${params}`
  );
  const data = await response.json();
  return {
    props: {
      data,
    },
    revalidate: 60,
  };
};

export async function getStaticPaths() {
  const response = await fetch(
    "https://ijlsbd.com/qs-blog/wp-json/wp/v2/posts"
  );
  const data = await response.json();
  const paths = data?.map((item) => ({
    params: { id: `${item.id}` },
  }));

  return { paths, fallback: "blocking" };
}
