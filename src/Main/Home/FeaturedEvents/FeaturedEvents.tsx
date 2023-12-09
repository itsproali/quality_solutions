import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import SectionHeading from "../../../components/Reused/Section/SectionHeading";
import { useFeaturedEvents } from "../../../hooks/useEvents";

import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { IEvent } from "../../../Interfaces/Event.interface";

const FeaturedEvents = () => {
  const { data: featuredEvents, isLoading } = useFeaturedEvents();
  const swiperRef = useRef<SwiperCore>();

  const htmlToPlainText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  return (
    <>
      {featuredEvents?.total > 0 && (
        <Container
          fixed
          sx={{
            py: { xs: 8, md: 16 },
            borderLeft: {
              xs: 0,
              lg: `1px solid #E8E8E8`,
            },
          }}
        >
          <SectionHeading
            title="Featured Events"
            rightSide={true}
            buttonVariant="text"
            buttonLink="/events"
          />

          <Box sx={{ my: 7 }}>
            <Swiper
              slidesPerView={1}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              loop={true}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
            >
              {featuredEvents.results.map((event: IEvent, index: number) => (
                <SwiperSlide key={index}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Image
                        src={event?.image}
                        alt="event"
                        width={500}
                        height={350}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: { xs: 14, md: 18 },
                          color: "primary.main",
                        }}
                      >
                        {event?.date
                          ? moment(event?.date).format("dddd, DD MMM YYYY")
                          : "--"}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: { xs: 18, lg: 32 },
                          color: "text.secondary",
                          fontWeight: 700,
                          my: 2,
                        }}
                      >
                        {event?.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          whiteSpace: "pre-line",
                        }}
                      >
                        {htmlToPlainText(
                          event?.description?.slice(0, 400) || ""
                        )}{" "}
                        <Box
                          sx={{
                            color: "primary.main",
                            display: "inline",
                            cursor: "pointer",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          <Link href={`/events/${event?._id}`}>Read More</Link>
                        </Box>
                      </Typography>
                    </Grid>
                  </Grid>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>

          {/* Custom Buttons */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              onClick={() => swiperRef?.current?.slidePrev()}
              color="primary"
              size="large"
              sx={{
                border: "1px solid #0065FF",
                display: "grid",
                placeContent: "center",
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>

            <IconButton
              onClick={() => swiperRef?.current?.slideNext()}
              color="primary"
              size="large"
              sx={{
                border: "1px solid #0065FF",
                display: "grid",
                placeContent: "center",
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Stack>
        </Container>
      )}
    </>
  );
};

export default FeaturedEvents;
