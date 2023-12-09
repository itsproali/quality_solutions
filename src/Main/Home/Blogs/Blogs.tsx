import { Container, Grid, Stack } from "@mui/material";
import { useRouter } from "next/router";
import BlogCard from "../../../components/Reused/Blog/BlogCard";
import BlogCardWithImage from "../../../components/Reused/Blog/BlogCardWithImage";
import SectionHeading from "../../../components/Reused/Section/SectionHeading";
import { useHomeBlogs } from "../../../hooks/useHomeBlogs";

const Blogs = () => {
  const router = useRouter();
  const { data: blogs } = useHomeBlogs();

  return (
    <Container
      fixed
      sx={{
        py: 12,
        borderLeft: {
          xs: 0,
          lg: `1px solid #E8E8E8`,
        },
      }}
      id="blog"
    >
      <SectionHeading
        title="Blogs & Articles"
        rightSide={true}
        color="primary"
        buttonLink="/blogs"
        buttonVariant="text"
        buttonText="Read all blogs"
      />

      <Grid container spacing={3} sx={{ mt: 4 }}>
        {blogs?.slice(0, 2)?.map((blog: any) => (
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
            <BlogCardWithImage blog={blog} key={blog?.id} />
          </Grid>
        ))}

        <Grid item sm={12} md={6} lg={4}>
          <Stack direction="column" spacing={2}>
            {blogs?.slice(2, 5)?.map((blog: any) => (
              <BlogCard blog={blog} key={blog?.id} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Blogs;
