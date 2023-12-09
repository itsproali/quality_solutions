import { Box, SxProps } from "@mui/material";

type IProps = {
  children: React.ReactNode;
  sx?: SxProps;
  id?: string;
};

const SectionBG = ({ children, sx, id }: IProps) => {
  return (
    <Box
      sx={{
        // minHeight: "100vh",
        // py: { xs: 8, md: 16 },
        bgcolor: "background.secondary",
        color: "white",
        position: "relative",
        backgroundImage: "url(/images/bg_element_1.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        ...sx,
      }}
      id={id}
    >
      {children}
    </Box>
  );
};

export default SectionBG;
