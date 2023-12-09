import { Box, Button, Grid, Typography } from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";
import moment from "moment";

const EventCard = ({ event }) => {
  return (
    <Grid item lg={4} sm={6} xs={12}>
      <Card
        sx={{
          mx: "auto",
          height: "100%",
          boxShadow: (theme) => `2px 2px 10px ${theme.palette.primary.lighter}`,
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
          <Box>
            <CardMedia
              component="img"
              sx={{
                objectFit: "contain",
                aspectRatio: "300/200",
              }}
              image={event?.image}
              alt="event Image"
            />
            <CardContent>
              <Typography
                sx={{
                  fontSize: {
                    md: "16px",
                    xs: "14px",
                  },
                  fontWeight: 600,
                }}
              >
                {event?.title?.length > 30
                  ? event?.title?.slice(0, 30) + "..."
                  : event?.title}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontSize: 14 }}>
                  {event.date ? moment(event.date).format("YYYY-MM-DD") : null}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>{event?.time}</Typography>
              </Box>
            </CardContent>
          </Box>

          <CardActions sx={{ p: 1 }}>
            <Link href={"/events/" + event?._id}>
              <a
                style={{
                  width: "100%",
                }}
              >
                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  View Details
                </Button>
              </a>
            </Link>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
};

export default EventCard;
