import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

import Link from "next/link";

const ReturnRefundPolicy = () => {
  return (
    <Box>
      <Head>
        <title>Return & Refund Policy</title>
      </Head>

      <Container fixed sx={{ my: 14 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Return and Refund Policy
        </Typography>
        <Typography variant="body1" sx={{ mt: 4 }}>
          Thank you for considering our consulting services, training programs,
          and publications. We strive to provide high-quality products and
          services that meet our customer{"&apos"}s needs. However, we
          understand that there may be occasions where a return or refund is
          necessary. Please read our policy below to understand our return and
          refund process.
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3 }}>
          Consulting Services:
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          We do not offer returns or refunds for consulting services. Once the
          consulting service has been rendered, the payment for the service is
          considered final.
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3 }}>
          Online & On-Site Training:
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          We do not offer refunds for on-site training. In case of online
          training, if the file is corrupted or not accessible, you can claim a
          refund within 7 days of the purchase date. Once verified, we will
          issue a refund for the purchase price within 10 days. However, access
          failure from your end due to your hardware or software issue and
          failure to participate in webinar/Live training on-time will not be
          eligible for refund.
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3 }}>
          Electronic book & GxP Documents:
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          We do not offer refunds for electronic books or Gxp documents. Once
          access to the electronic file has been given, the payment for the
          product is considered final. However, if the file is corrupted or not
          accessible, you can claim a refund within 7 days of the purchase date.
          Once verified, we will issue a refund for the purchase price within 10
          days. Access failure to electronic files from your end due to your
          hardware or software issue will not be eligible for refund.
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3 }}>
          Hard Copy Book & GxP Documents:
        </Typography>

        <Typography variant="body1" sx={{ mt: 1 }}>
          If you are not satisfied with the hard copy book or GxP document due
          to any physical damage of the package, we accept returns within 7 days
          of the purchase date. The book must be in its original condition and
          packaging. Once we receive the returned book, we will issue a refund
          for the purchase price within 10 days.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Please note that we reserve the right to refuse a return or refund if
          the product has been damaged or altered in any way.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          If you have any questions or concerns about our return and refund
          policy, please contact us at{" "}
          <Link href="mailto:info@1qualitysolutions.com">
            <a style={{ color: "#0000FF" }}>info@1qualitysolutions.com</a>
          </Link>{" "}
          or <strong>+8801886861037</strong>. We appreciate your business and
          look forward to serving you.
        </Typography>
      </Container>
    </Box>
  );
};

export default ReturnRefundPolicy;
