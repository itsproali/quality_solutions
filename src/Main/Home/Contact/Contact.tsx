import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import {
  ContactFormInput,
  ContactFormTextArea,
  ContactSubHeading,
} from "./Contact.styles";
import { useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import authFetch from "../../../services/AxiosCommon";
import SectionBG from "../WhatWeProvide/SectionBG";

const LocalPhoneIcon = dynamic(() => import("@mui/icons-material/LocalPhone"), {
  ssr: false,
});

const EmailIcon = dynamic(() => import("@mui/icons-material/Email"), {
  ssr: false,
});

const CheckCircleIcon = dynamic(
  () => import("@mui/icons-material/CheckCircle"),
  {
    ssr: false,
  }
);

type EmailInfo = {
  email?: string;
  subject?: string;
  text?: string;
};

const Contact = () => {
  const [emailInfo, setEmailInfo] = useState<EmailInfo>({});

  const handleChange = (e) => {
    const newMailInfo = { ...emailInfo };
    newMailInfo[e.target.name] = e.target.value;
    setEmailInfo(newMailInfo);
  };

  const { mutate, isLoading } = useMutation(
    (data: EmailInfo) => {
      return authFetch.post("/send-mail", data);
    },
    {
      onSuccess: (data) => {
        toast.success("Email sent successfully");
        setEmailInfo({ email: "", subject: "", text: "" });
      },
      onError: (error) => {
        toast.error("Something went wrong");
      },
    }
  );

  const handleSubmit = () => {
    mutate(emailInfo);
  };

  return (
    <Container
      fixed
      sx={{
        py: 10,
        borderLeft: {
          xs: 0,
          lg: `1px solid #E8E8E8`,
        },
      }}
      id="contact"
    >
      <SectionBG
        sx={{
          borderRadius: 5,
          minHeight: "50vh",
          p: { xs: 2, sm: 5, md: 10 },
          py: 0,
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={7}>
            <Typography
              variant="h4"
              sx={{
                fontSize: {
                  xs: 25,
                  sm: 30,
                  lg: 35,
                },
                fontWeight: 600,
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: { xs: "100%", md: 400 },
                lineHeight: 1.4,
                mt: 3,
              }}
            >
              Please contact us if you have any query. We will reply you soon.
            </Typography>

            <Box sx={{ mt: 4 }}>
              <ContactSubHeading
                icon="/icons/location.png"
                text="Address"
                sx={{ mb: 0.75 }}
              />
              <Typography variant="body2" sx={{ maxWidth: 350 }}>
                35, Kamal Ataturk Ave, Abedin Tower (Level 5), Banani C/A,
                Dhaka-1213
              </Typography>

              <ContactSubHeading
                icon="/icons/phone.png"
                text="Phone"
                sx={{ mt: 3, mb: 0.75 }}
              />
              <Typography variant="body2" sx={{ maxWidth: 350 }}>
                +88 01886861037
              </Typography>

              <ContactSubHeading
                icon="/icons/message.png"
                text="Email"
                sx={{ mt: 3, mb: 0.75 }}
              />

              <Typography variant="body2" sx={{ maxWidth: 350 }}>
                info@1qualitysolutions.com
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={5} xs={12}>
            <Box
              sx={{
                width: { xs: "100%", md: "450px" },
                ml: { lg: "auto", xs: 0 },
                mx: { md: "auto", lg: 0 },
                mt: { xs: 5, md: 0 },
              }}
            >
              <Box
                sx={{
                  p: { xs: 0, md: 3 },
                  // boxShadow: "0 0 5px lightgray",
                  borderRadius: "10px",
                  width: { xs: "100%", md: "400px" },
                  mx: { lg: "auto", xs: "0" },
                }}
              >
                <Box>
                  <ContactFormInput
                    type="email"
                    name="email"
                    placeholder="Enter Your email"
                    value={emailInfo?.email}
                    onChange={handleChange}
                  />
                </Box>
                <Box sx={{ my: 3 }}>
                  <ContactFormInput
                    type="text"
                    name="subject"
                    placeholder="Enter Subject"
                    value={emailInfo?.subject}
                    onChange={handleChange}
                  />
                </Box>
                <Box sx={{ my: 3 }}>
                  <ContactFormTextArea
                    name="text"
                    onChange={handleChange}
                    value={emailInfo?.text}
                    rows={4}
                    cols={50}
                    placeholder="Tell us your thoughts..."
                  />
                </Box>
                <Button
                  size="large"
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={
                    isLoading ||
                    !emailInfo?.email ||
                    !emailInfo?.subject ||
                    !emailInfo?.text
                  }
                  sx={{
                    "&:disabled": {
                      color: "primary.light",
                      backgroundColor: "primary.dark",
                      textTransform: "capitalize",
                    },
                  }}
                >
                  {isLoading ? "Loading..." : "Send"}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </SectionBG>
    </Container>
  );
};

export default Contact;
