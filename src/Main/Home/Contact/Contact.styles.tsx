// import { styled } from "@mui/system";

import { Box, Stack, SxProps, Typography, styled } from "@mui/material";
import theme from "../../../components/theme";

const themeLight = theme.palette.primary.light;

export const ContactSubHeading = ({
  icon,
  text,
  sx,
}: {
  icon: string;
  text: string;
  sx?: SxProps;
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      spacing={2}
      sx={{
        ...sx,
      }}
    >
      <Box
        component="img"
        src={icon}
        alt="icon"
        height={20}
        width={20}
        sx={{
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
        }}
      />
      <Typography variant="h6" sx={{ color: "white", fontWeight: 500 }}>
        {text}
      </Typography>
    </Stack>
  );
};

export const ContactFormInput = styled("input")({
  backgroundColor: "transparent",
  color: themeLight,
  border: `1px solid ${themeLight}`,
  padding: "20px 15px",
  borderRadius: "5px",
  outline: "none",
  width: "350px",
  fontSize: "16px",
  "@media(max-width:900px)": {
    width: "100%",
  },
  "&::placeholder": {
    color: themeLight,
  },
  "&:-webkit-autofill": {
    "WebkitTextFillColor": themeLight,
  },
});

export const ContactFormTextArea = styled("textarea")({
  backgroundColor: "transparent",
  color: themeLight,
  border: `1px solid ${themeLight}`,
  padding: "12px 15px",
  borderRadius: "5px",
  outline: "none",
  width: "350px",
  fontFamily: "Manrope",
  minHeight: "150px",
  fontSize: "16px",
  "&::placeholder": {
    color: themeLight,
  },
  "@media(max-width:900px)": {
    width: "100%",
  },
});
