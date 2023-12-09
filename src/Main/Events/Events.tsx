import { Box, Container, Grid, Typography } from "@mui/material";
import { IEvent } from "../../Interfaces/Event.interface";
import CardLoading from "../../components/Reused/CardLoading";
import EmptyUI from "../../components/Reused/EmptyUI";
import { useEvents } from "../../hooks/useEvents";
import EventCard from "./EventCard";
import { DateFilter, PlaceFilter, PriceFilter } from "./EventFilters";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

export default function Events() {
  const pastMonth = new Date(2020, 10, 15);
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };
  const [date, setDate] = useState<DateRange | undefined>(defaultSelected);
  const [priceRange, setPriceRange] = useState<string | undefined>(undefined);
  const [places, setPlaces] = useState<string[]>([]);

  const { data: events, isLoading } = useEvents();

  return (
    <Box sx={{ py: 10, bgcolor: "#FCFDFF" }}>
      <Box
        sx={{
          height: 180,
          width: "100%",
          display: "grid",
          placeContent: "center",
          background: "linear-gradient(to left, #01337E, #0451C5)",
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: 30, md: 38 }, fontWeight: 800, color: "white" }}
        >
          Events
        </Typography>
      </Box>

      <Container fixed sx={{ py: 10, minHeight: "57vh" }}>
        <Grid container spacing={3}>
          {/* Filters */}
          <Grid item xs={0} md={3.5}>
            <Box sx={{ display: { xs: "none", md: "inherit" } }}>
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: 700, mb: 2 }}
              >
                Filters
              </Typography>

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12}>
                  <DateFilter date={date} setDate={setDate} />
                </Grid>
                <Grid item xs={12}>
                  <PriceFilter
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PlaceFilter places={places} setPlaces={setPlaces} />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* All Events */}
          <Grid item xs={12} md={8.5}>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: 700, mb: 2 }}
              >
                Events
              </Typography>

              {isLoading ? (
                <CardLoading row={3} />
              ) : !events?.total ? (
                <EmptyUI title="There's no events published yet" img="/icons/empty_event.png" />
              ) : (
                <Grid container spacing={2}>
                  {events?.results?.map((event: IEvent) => (
                    <EventCard key={event?._id} event={event} />
                  ))}
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
