import { Container, NoSsr, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div>
      <Head>
        <title>Privacy & Policy</title>
      </Head>

      <Container fixed sx={{ my: 14 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Privacy Policy
        </Typography>
        <Typography variant="body1" sx={{ mt: 4 }}>
          At One Quality Solutions Ltd., we are committed to protecting the
          privacy of our customers and website visitors. This Privacy Policy
          explains our practices regarding the collection, use, and disclosure
          of personal information that we collect through our website, products,
          and services.
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3 }}>
          Collection of Personal Information
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          We may collect personal information from you when you use our website,
          products, or services. This information may include your name, email
          address, phone number, and other contact information. We may also
          collect information about your use of our website and products, such
          as the pages you visit and the features you use.
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3 }}>
          Use of Personal Information
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          We use the personal information we collect to provide you with the
          products and services you request, to communicate with you about our
          products and services, and to improve our website and products. We may
          also use your personal information to send you marketing materials,
          such as email newsletters or promotional offers.
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3 }}>
          Disclosure of Personal Information
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          We will not disclose your personal information to any third parties
          without your consent, except as required by law or to protect our
          rights and property.
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3 }}>
          Security of Personal Information
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          We take reasonable measures to protect the personal information we
          collect from unauthorized access, use, or disclosure.{" "}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3 }}>
          Changes to this Privacy Policy
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          We may change this Privacy Policy from time to time. If we make any
          changes, we will post the revised Privacy Policy on our website. We
          encourage you to review the Privacy Policy whenever you visit our
          website to stay informed about our information practices and the ways
          you can help protect your privacy.
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <Link href="mailto:info@1qualitysolutions.com">
            <a style={{ color: "#0000FF" }}>info@1qualitysolutions.com</a>
          </Link>{" "}
          or <strong>+8801886861037</strong>.
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          This Privacy Policy was last updated on 18 Jan 2023.
        </Typography>
        <Typography variant="body1" sx={{ mt: 5 }}>
          By using our website, products, and services, you consent to the
          collection, use, and disclosure of your personal information as
          described in this Privacy Policy.
        </Typography>
      </Container>
    </div>
  );
};

export default PrivacyPolicyPage;
