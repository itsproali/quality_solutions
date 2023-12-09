import { Box, Container, Grid, NoSsr, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { scroller } from "react-scroll";
import {
  FooterLink,
  FooterLinks,
  footerLinks,
} from "../../../staticData/footerLinks";

const Footer = () => {
  const router = useRouter();
  const isHome = router.pathname === "/";

  const scrollTarget = (target: string) =>
    scroller.scrollTo(target, { smooth: true });

  const scrollToPage = async (target: string) => {
    if (router.pathname !== "/") {
      await router.push("/");
    }
    scrollTarget(target);
  };

  // Get the current year
  const currentYear = new Date().getFullYear();
  return (
    <Container
      fixed
      sx={{
        p: { xs: 1, md: 5 },
        textAlign: { xs: "center", md: "left" },
        // borderTop: "1px solid lightgray",
        borderLeft: {
          xs: 0,
          lg: isHome ? `1px solid #E8E8E8` : 0,
        },
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} lg={2}>
          <Box
            component="img"
            src="/images/logo.png"
            alt="1 Quality Solutions"
            sx={{
              width: "90%",
              mt: 2,
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
          />
        </Grid>

        {footerLinks?.map((item: FooterLinks, index: number) => (
          <Grid item xs={12} sm={6} lg={2.5} key={index}>
            <Typography variant="body1" sx={{ fontWeight: 600, mt: 2 }}>
              {item?.title}
            </Typography>

            {item?.links?.map((link: FooterLink, index: number) => (
              <Typography
                variant="body1"
                sx={{ mt: 2, cursor: "pointer", textAlign: "left" }}
                key={index}
                onClick={() =>
                  link?.scrollTo ? scrollToPage(link.scrollTo) : null
                }
              >
                {link?.scrollTo ? (
                  link.name
                ) : (
                  <NoSsr>
                    <Link href={link?.url}>
                      <Stack direction="row" alignItems="center">
                        {link?.icon && (
                          <Box
                            sx={{
                              mr: 1,
                            }}
                          >
                            <Image
                              src={link?.icon}
                              alt={link?.name}
                              width={20}
                              height={20}
                            />
                          </Box>
                        )}
                        {link?.name}
                      </Stack>
                    </Link>
                  </NoSsr>
                )}
              </Typography>
            ))}
          </Grid>
        ))}
      </Grid>
      <Stack
        sx={{
          mt: 5,
        }}
      >
        <Box
          sx={{
            aspectRatio: "768/30",
            position: "relative",
          }}
        >
          <Image
            src="/images/sslcommerzPayments.png"
            alt="sslcommerz"
            layout="fill"
          />
        </Box>
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        mt={5}
      >
        <Typography
          variant="body1"
          sx={{ fontWeight: 300, color: "text.secondary" }}
        >
          Trade License: TRAD/DNCC/113709/2022
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontWeight: 500, color: "text.secondary" }}
        >
          {`© ${currentYear} One Quality Solutions Ltd. All right reserved`}
        </Typography>
      </Stack>
    </Container>
  );
};

export default Footer;
