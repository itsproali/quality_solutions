import {
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IEvent } from "../../Interfaces/Event.interface";

const TabPanel = ({ value, index, children, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`event-tabpanel-${index}`}
      aria-labelledby={`event-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const EventDetails = ({ singleData }: { singleData: IEvent }) => {
  const [tabValue, setTabValue] = useState(0);
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const router = useRouter();
  return (
    <Container fixed sx={{ py: 12, minHeight: "80vh" }}>
      <Box
        sx={{
          borderRadius: "10px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          aspectRatio: "1085/414",
          position: "relative",
          objectFit: "contain",
        }}
      >
        <Image
          src={singleData?.image}
          alt={singleData?.title}
          layout="fill"
          blurDataURL={singleData?.image}
          placeholder="blur"
        />
      </Box>

      <Box sx={{ mx: { xs: 2, md: 4 }, my: 4 }}>
        {/* title and buttons */}
        <Stack
          spacing={2}
          alignItems="flex-start"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row" }}
          sx={{ pb: 2, borderBottom: "1px solid #ccc" }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: 22, lg: 28 },
              fontWeight: 800,
              maxWidth: "xl",
            }}
          >
            {singleData?.title}
          </Typography>

          <Button
            sx={{
              fontWeight: 600,
              px: { xs: 2, md: 4 },
              py: { xs: 1, md: 1.5 },
            }}
            variant="contained"
            color="primary"
            onClick={() =>
              window.open(`${singleData?.registrationLink}`, "_blank")
            }
          >
            Register Now
          </Button>
        </Stack>

        {/* Date and time */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ mt: 2, mb: 4 }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Date of Event:
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {singleData?.date
                ? moment(singleData?.date).format("DD MMM YYYY")
                : "--"}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ gap: 2, cursor: "pointer" }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
              Share:
            </Typography>

            <Link href={singleData?.registrationLink}>
              <Image
                src="/icons/facebook.png"
                alt="facebook"
                width={30}
                height={30}
              />
            </Link>

            <Link href={singleData?.registrationLink}>
              <Image
                src="/icons/linkedin_icon.png"
                alt="facebook"
                width={30}
                height={30}
              />
            </Link>
          </Stack>
        </Stack>

        {/* Tabs and Description */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab
              label="About"
              id={`events_tab_0`}
              sx={{ fontWeight: 700, textTransform: "capitalize" }}
            />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Box
            sx={{
              mt: 5,
              fontSize: "1rem",
              textAlign: "justify",
              "& a": {
                color: "primary.main",
              },
            }}
            dangerouslySetInnerHTML={{ __html: singleData?.description }}
          />
        </TabPanel>
      </Box>
    </Container>
  );
};

export default EventDetails;
