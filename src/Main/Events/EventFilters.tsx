import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const AccordionWrapper = ({ children, title, id }) => {
  return (
    <Accordion
      sx={{
        border: "1px solid",
        borderColor: "primary.lighter",
        width: "100%",
        bgcolor: "white",
        boxShadow: (theme) => `0 1px 2px ${theme.palette.primary.lighter}`,
        "&.MuiAccordion-root": {
          borderRadius: 3,
        },
      }}
      disableGutters
      square={false}
    >
      <AccordionSummary
        sx={{
          borderBottom: `2px solid`,
          borderColor: "primary.lighter",
          py: 0,
          fontSize: 18,
          "& .MuiAccordionSummary-expandIconWrapper": {
            color: "primary.darker",
          },
        }}
        expandIcon={<KeyboardArrowDown />}
        id={id}
      >
        <Typography
          variant="body1"
          sx={{ width: "100%", fontWeight: 700, color: "text.secondary" }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export const DateFilter = ({ date, setDate }) => {
  return (
    <>
      <AccordionWrapper title="Date" id="date-filter">
        <Box sx={{ maxWidth: "100%", mx: "auto" }}>
          <DayPicker
            mode="range"
            selected={date}
            onSelect={setDate}
            style={{
              width: "100%", // Ensure it takes up 100% width of its container
              maxWidth: "300px", // Adjust the maximum width as needed
              margin: "0 auto", // Center the DayPicker horizontally
            }}
          />
        </Box>
      </AccordionWrapper>
    </>
  );
};

export const PriceFilter = ({ priceRange, setPriceRange }) => {
  const ranges = [
    {
      value: "free",
      label: "Free",
    },
    {
      value: "500-1000",
      label: "500 to 1000",
    },
    {
      value: "1000-2000",
      label: "1000 to 2000",
    },
    {
      value: "2000-1000",
      label: "Above 2000",
    },
  ];

  const handleSetPriceRange = (value: string) => {
    setPriceRange(value);
  };
  return (
    <>
      <AccordionWrapper title="Price" id="price-filter">
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          sx={{ gap: 2 }}
        >
          {ranges?.map((range) => (
            <Chip
              key={range.value}
              label={range.label}
              clickable
              onClick={() => handleSetPriceRange(range.value)}
              color={range.value === priceRange ? "primary" : "default"}
              sx={{
                color: range.value === priceRange ? "white" : "text.primary",
                bgcolor:
                  range.value === priceRange
                    ? "primary.main"
                    : "primary.lighter",
              }}
            />
          ))}
        </Stack>
      </AccordionWrapper>
    </>
  );
};

export const PlaceFilter = ({ places, setPlaces }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (places.includes(event.target.name)) {
      setPlaces(places.filter((place) => place !== event.target.name));
    } else {
      setPlaces([...places, event.target.name]);
    }
  };
  return (
    <>
      <AccordionWrapper title="Place" id="place-filter">
        {/* Online and offline checkboxes */}
        <FormControl
          component="fieldset"
          variant="standard"
          sx={{ width: "100%" }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={places.includes("online")}
                  onChange={handleChange}
                  name="online"
                />
              }
              label="Online"
              labelPlacement="start"
              sx={{
                width: "100%",
                justifyContent: "space-between",
                "&.MuiFormLabel-root": {
                  fontWeight: 700,
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={places.includes("offline")}
                  onChange={handleChange}
                  name="offline"
                />
              }
              labelPlacement="start"
              label="Offline"
              sx={{
                width: "100%",
                justifyContent: "space-between",
                "&.MuiFormLabel-root": {
                  fontWeight: 700,
                },
              }}
            />
          </FormGroup>
        </FormControl>
      </AccordionWrapper>
    </>
  );
};
