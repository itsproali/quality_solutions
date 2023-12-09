import { Box, Typography } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import htmlToPlainText from "../../../utils/htmlToPlainText";

const BlogCard = ({ blog }) => {
  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme?.palette?.primary?.light}`,
        p: 2,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 700, color: "primary.main" }}
      >
        {blog?.date ? moment(blog?.date).format("DD MMM YYYY") : "--"}
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          color: "text.secondary",
          mt: 1,
        }}
      >
        {blog?.title?.rendered?.length > 50
          ? blog?.title?.rendered?.slice(0, 50) + "..."
          : blog?.title?.rendered}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          my: 1,
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
  );
};

export default BlogCard;
