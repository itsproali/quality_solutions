import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Box } from "@mui/material";

export default function CustomCard({ image, title, id }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          // height="240"
          image={image}
          alt={title}
          sx={{
            width: "100%",
            // height: "100%",
            objectFit: "contain",
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontSize: { xs: "14px", md: "16px" },
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </Box>
      <CardActions ml={5}>
        <Link href={"/blogs/" + id}>
          <a>
            <Button size="small" variant="contained">
              Read blog
            </Button>
          </a>
        </Link>
      </CardActions>
    </Card>
  );
}
