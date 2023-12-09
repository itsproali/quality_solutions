import {
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Head from "next/head";

const TermsPage = () => {
  return (
    <Box>
      <Head>
        <title>Terms & Conditions</title>
      </Head>

      <Container fixed sx={{ my: 14 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Terms and Conditions
        </Typography>
        <Typography variant="body1" sx={{ mt: 4 }}>
          Welcome to One Quality Solutions Ltd. By using our website, products,
          and services, you agree to be bound by these terms and conditions. If
          you do not agree to these terms, please do not use our website or
          purchase our products or services.
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3 }}>
          Product and Service Delivery
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          We will make every effort to deliver products within the following
          timeframes:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon
                sx={{
                  fontSize: 16,
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Inside Dhaka: 5 business days" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon
                sx={{
                  fontSize: 16,
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Outside Dhaka in Bangladesh: 7 business days" />
          </ListItem>
        </List>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Digital products (ebooks and documents) and services will be delivered
          instantly or within a maximum of 7 days from order confirmation.
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Online live training and webinars will be planned in advance and you
          can register online.
        </Typography>

        <Typography variant="body1" sx={{ mt: 1 }}>
          In case of online live training or webinars, we may change the date &
          time. Changed date and time will be communicated to the customer in
          advance.
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Recorded or video training access will be given instantly.
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          On site training will be delivered as per mutual agreement through
          work order from customers considering participants, training duration
          and venue.
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          You can read our ebook and documents on the website. Our ebook and
          documents can not be downloaded or printed.
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Our ebook, GxP documents and training are for educational purposes. Do
          not consider the ebook, GxP documents and training for specific cases.
          For specific cases, relevant data must be evaluated. You are
          responsible to check updated guidelines or reference documents cited
          in the ebook, GxP documents and training materials.
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          You are legally obligated to follow copyright laws. Thus, you are not
          allowed to share our ebook, documents, training materials to other
          people in any way unless authorized by One Quality Solutions Ltd.
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3 }}>
          Changes to These Terms and Conditions
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          We reserve the right to make changes to these terms and conditions at
          any time. We will post any changes on our website, and your continued
          use of our website, products, or services will constitute your
          acceptance of the new terms.
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          If you have any questions about this terms and conditions, please
          contact us at{" "}
          <Link href="mailto:info@1qualitysolutions.com">
            <a style={{ color: "#0000FF" }}>info@1qualitysolutions.com</a>
          </Link>{" "}
          or <strong>+8801886861037</strong>.
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          This terms and conditions was last updated on 21 March 2023.
        </Typography>
        <Typography variant="body1" sx={{ mt: 5 }}>
          By using our website, products, and services, you consent to the
          collection, use, and disclosure of your personal information as
          described in this terms and conditions.
        </Typography>
      </Container>
    </Box>
  );
};

export default TermsPage;
