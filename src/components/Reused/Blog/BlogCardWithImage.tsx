import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import htmlToPlainText from "../../../utils/htmlToPlainText";

const BlogCardWithImage = ({ blog }) => {
  return (
    <Box>
      <Box
        component="img"
        src={
          blog?.better_featured_image?.media_details?.sizes?.medium?.source_url
        }
        alt={blog.title.rendered}
        sx={{
          borderRadius: 2,
          aspectRatio: "300/280",
          objectFit: "cover",
          width: "100%",
        }}
      />

      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "text.secondary",
            mt: 1.5,
          }}
        >
          {blog?.title?.rendered?.length > 50
            ? blog?.title?.rendered?.slice(0, 50) + "..."
            : blog?.title?.rendered}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            my: 3,
            color: "text.secondary",
            whiteSpace: "pre-line",
            fontWeight: 500,
          }}
        >
          {htmlToPlainText(blog?.excerpt?.rendered?.slice(0, 100) || "")}
          {"..."}
          <Box
            sx={{
              color: "primary.main",
              display: "inline",
              cursor: "pointer",
              fontWeight: 600,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <Link href={`/blogs/${blog?.id}`}>Read More</Link>
          </Box>
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ textTransform: "none", fontSize: 16 }}
      >
        <Link href={"/blogs/" + blog?.id}>Read Blog</Link>
      </Button>
    </Box>
  );
};

export default BlogCardWithImage;
