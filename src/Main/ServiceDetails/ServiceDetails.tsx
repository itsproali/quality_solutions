import {
  Box,
  Button,
  capitalize,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Head from "next/head";
import ViewDetails from "../../components/Reused/ViewDetails/ViewDetails";
import { useRecommendedServices } from "../../hooks/useRecommendedServices";
import { IService } from "../../Interfaces/Service.interface";
import SingleServiceCard from "../Home/PopularService/SingleServiceCard";
import Link from "next/link";
import RelatedItemCard from "../../components/Reused/ViewDetails/RelatedItemCard";

const ServiceDetails = ({ data }: { data: IService }) => {
  const { data: recommendedServices } = useRecommendedServices({
    id: data?._id,
    page: 1,
  });

  return (
    <Box>
      <Head>
        <title>{capitalize(data?.type)}</title>
      </Head>

      <Container fixed sx={{ py: 16 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={9}>
            <ViewDetails singleData={data} type="service" />
          </Grid>
          <Grid item xs={12} lg={3}>
            {recommendedServices?.total > 0 && (
              <>
                <Typography sx={{ fontWeight: 800, fontSize: 16 }} variant="h4">
                  Related Services
                </Typography>

                <Grid container spacing={2} sx={{ mt: 1.5 }}>
                  {recommendedServices?.data
                    ?.slice(0, 4)
                    ?.map((service: IService) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={12}
                        key={service?._id}
                      >
                        {/* <SingleServiceCard service={service} /> */}
                        <RelatedItemCard
                          item={service}
                          link={`/services/${service?._id}`}
                        />
                      </Grid>
                    ))}
                </Grid>

                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 2,
                    color: "text.secondary",
                    fontWeight: 600,
                  }}
                >
                  <Link href="/services">See More</Link>
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ServiceDetails;
