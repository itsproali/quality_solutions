import { Box, Typography } from "@mui/material";

type IProps = {
  title: string;
  description: string;
};

const TopBanner = ({ title, description }: IProps) => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "primary.lighter",
          py: 6,
          borderRadius: "12px",
          textAlign: "center",
          border: "2px solid",
          borderColor: "primary.main",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: 38, md: 48 }, fontWeight: 800, mb: 4 }}
        >
          {title}
        </Typography>

        <Typography
          variant="h5"
          sx={{ fontWeight: 500, maxWidth: 800, mx: "auto" }}
        >
          {description}
        </Typography>
      </Box>
    </>
  );
};

export default TopBanner;
