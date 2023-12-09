import { Paper, SxProps, Typography } from "@mui/material";
import Image from "next/image";

type IProps = {
  title: string;
  img?: string;
  sx?: SxProps;
};

const EmptyUI = ({ title, img, sx }: IProps) => {
  return (
    <Paper
      sx={{
        ...sx,
        p: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 5,
        boxShadow: "none",
      }}
    >
      <Image
        src={img || "/images/empty-box.png"}
        alt="empty"
        width={150}
        height={150}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 400,
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        {title || "No data found"}
      </Typography>
    </Paper>
  );
};

export default EmptyUI;
