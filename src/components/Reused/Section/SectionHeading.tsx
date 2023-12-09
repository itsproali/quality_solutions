import { Box, Typography, Button, ButtonProps } from "@mui/material";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type IProps = {
  title: string;
  rightSide?: boolean;
  color?: "white" | "primary";
  buttonVariant?: ButtonProps["variant"];
  buttonLink?: string | object;
  buttonText?: string;
};

const SectionHeading = ({
  title,
  color = "primary",
  rightSide = false,
  buttonVariant,
  buttonLink,
  buttonText,
}: IProps) => {
  return (
    <Box
      sx={{
        display: !rightSide ? "inherit" : "flex",
        alignItems: "center",
        justifyContent: !rightSide ? "flex-start" : "space-between",
      }}
    >
      <Box
        sx={{
          position: "relative",
          textAlign: { xs: !rightSide ? "center" : "inherit", md: "inherit" },
        }}
      >
        <Box
          component="div"
          sx={{
            width: !rightSide ? { xs: 60, md: 3 } : 3,
            height: !rightSide ? { xs: 3, md: 50 } : 50,
            bgcolor: color === "white" ? "white" : "primary.main",
            position: "absolute",
            top: !rightSide ? { xs: 50, md: "50%" } : "50%",
            left: !rightSide ? { xs: "50%", md: -26 } : -26,
            right: !rightSide ? { xs: "50%", md: "auto" } : "auto",
            transform: !rightSide
              ? {
                  xs: "translateX(-50%)",
                  md: "translateY(-50%)",
                }
              : "translateY(-50%)",
          }}
        />
        <Typography
          variant="h4"
          sx={{
            color: color === "white" ? "white" : "text.secondary",
            fontSize: {
              xs: 22,
              sm: 35,
              lg: 42,
            },
            fontWeight: 800,
          }}
        >
          {title}
        </Typography>
      </Box>

      {rightSide && (
        <Button
          variant={buttonVariant}
          sx={{ fontSize: 16, textTransform: "capitalize" }}
          endIcon={<ChevronRightIcon />}
        >
          <Link href={buttonLink || "/"}>{buttonText || "View All"}</Link>
        </Button>
      )}
    </Box>
  );
};

export default SectionHeading;
