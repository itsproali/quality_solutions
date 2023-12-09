import { Box, Container, Grid, NoSsr, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomCard from "../../src/components/Reused/Card";
import { getBlogs } from "../../src/Data/getBlogs";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs()
      .then((res) => setBlogs(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box>
      <Container fixed sx={{ mt: 20, minHeight: "67vh" }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Our Blogs
        </Typography>
        <Grid container spacing={2} sx={{ my: 10 }}>
          {blogs?.map((blog) => (
            <Grid
              key={blog.id}
              item
              sm={12}
              md={6}
              lg={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CustomCard
                id={blog.id}
                title={blog.title.rendered}
                image={
                  blog?.better_featured_image?.media_details.sizes.medium
                    .source_url
                }
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogPage;
