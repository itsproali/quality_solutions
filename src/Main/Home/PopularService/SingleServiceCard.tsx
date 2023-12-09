import { Box, Button, Grid, Typography } from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";
import { IService } from "../../../Interfaces/Service.interface";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const SingleServiceCard = ({ service }: { service: IService }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        maxWidth: { xl: 400, lg: 320 },
        mx: "auto",
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
          p: 2,
        }}
      >
        <Box>
          <CardMedia
            component="img"
            sx={{
              aspectRatio: "300/200",
              objectFit: "contain",
              borderRadius: 3,
            }}
            image={service?.image}
            alt="Service Image"
          />
          <CardContent sx={{ my: 1.5 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "text.secondary",
              }}
            >
              {service?.title}
            </Typography>
          </CardContent>
        </Box>
        <CardActions sx={{ mt: 1, justifyContent: "flex-end" }}>
          <Button
            variant="text"
            color="primary"
            endIcon={<ChevronRightIcon />}
            sx={{ textTransform: "none", fontSize: 16 }}
          >
            <Link href={"/services/" + service?._id}>View Details</Link>
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default SingleServiceCard;
