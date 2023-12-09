import { Box, Button, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import authFetch from "../../../services/AxiosCommon";
import isSameType from "../../../utils/isSameType";
import { useCart } from "../../../hooks/useCart";

type IProps = {
  singleData: any;
  type: "document" | "service";
  price_usd?: number | string;
  price_bdt?: number | string;
  isPurchased?: boolean;
};

const TabPanel = ({ value, index, children, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`description-tabpanel-${index}`}
      aria-labelledby={`description-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const ViewDetails = ({
  singleData,
  type,
  price_usd,
  price_bdt,
  isPurchased = false,
}: IProps) => {
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const router = useRouter();
  const { data: cartItems } = useCart();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle add to cart
  const handleAddToCart = async (item) => {
    if (session?.accessToken) {
      const cartItem = {
        user: session?.user._id,
        product: type === "document" ? item._id : undefined,
        // book: type === "book" ? item._id : undefined,
        price: item.price,
        type: type,
      };

      if (!isSameType(cartItems, type)) {
        return;
      }

      try {
        setLoading(true);
        const response = await authFetch.post("/api/v1/cart", cartItem, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        if (response.status === 201) {
          toast.success("Added to cart");
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please login first");
    }
  };
  return (
    <>
      <Box
        sx={{
          position: "relative",
          aspectRatio: "794/390",
          objectFit: "cover",
          "& img": {
            borderRadius: 3,
          },
        }}
      >
        <Image
          src={singleData?.image}
          alt={singleData?.title}
          layout="fill"
          placeholder="blur"
          blurDataURL={singleData?.image}
        />
      </Box>

      <Box sx={{ mx: { xs: 2, md: 4 }, my: 4 }}>
        {/* title and buttons */}
        <Stack
          spacing={2}
          alignItems="flex-start"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row" }}
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: 22, lg: 28 }, fontWeight: 800 }}
            >
              {singleData.title}
            </Typography>
            <Typography
              my={1.5}
              sx={{
                fontSize: { sm: "20px", xs: "16px" },
              }}
            >
              {singleData?.category?.title}
            </Typography>
          </Box>

          <Box>
            {!singleData?.shouldContact && (
              <>
                {!singleData?.isFree ? (
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      fontSize: 22,
                      mb: 1,
                      textAlign: "center",
                    }}
                  >
                    ${price_usd || singleData?.price_usd} or ৳
                    {price_bdt || singleData?.price_bdt}
                  </Typography>
                ) : (
                  <Typography
                    variant="h6"
                    px={2}
                    sx={{
                      fontWeight: 800,
                      fontSize: 22,
                      mb: 1,
                      textAlign: "center",
                    }}
                  >
                    Free
                  </Typography>
                )}
              </>
            )}
            {singleData?.shouldContact ? (
              <Button
                sx={{
                  fontWeight: 600,
                  px: { xs: 2, md: 4 },
                  py: { xs: 1, md: 1.5 },
                }}
                variant="contained"
                color="primary"
                onClick={() =>
                  window.open(`mailto:info@1qualitysolutions.com`, "_blank")
                }
              >
                Contact Us
              </Button>
            ) : isPurchased ? (
              <Button
                variant="contained"
                color="primary"
                disabled={true}
                sx={{
                  cursor: "not-allowed",
                  px: { xs: 2, md: 4 },
                  py: { xs: 1, md: 1.5 },
                }}
              >
                Purchased
              </Button>
            ) : singleData?.isFree ? (
              <Button
                variant="contained"
                color="primary"
                sx={{ px: { xs: 2, md: 4 }, py: { xs: 1, md: 1.5 } }}
                onClick={() =>
                  router.push(`/free-documents/${singleData?._id}`)
                }
              >
                Read Now
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleAddToCart({
                    _id: singleData?._id,
                    price: singleData?.price_bdt,
                  });
                }}
                disabled={loading}
                sx={{
                  opacity: loading ? 0.5 : 1,
                  px: { xs: 2, md: 4 },
                  py: { xs: 1, md: 1.5 },
                }}
              >
                Add to Cart
              </Button>
            )}
          </Box>
        </Stack>

        {/* description and reviews tabs */}
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Description"
                id={`details_tab_0`}
                sx={{ fontWeight: 700, textTransform: "capitalize" }}
              />
              <Tab
                label={`Reviews(0)`}
                id={`details_tab_1`}
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
      </Box>
    </>
  );
};

export default ViewDetails;
