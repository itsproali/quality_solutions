import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Button, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";
import { IProduct } from "../../../Interfaces/Product.interface";
import { IService } from "../../../Interfaces/Service.interface";

type IProps = {
  item: IService | IProduct;
  link: string;
  type?: "service" | "document";
};

const RelatedItemCard = ({ item, link, type = "service" }: IProps) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        maxWidth: { xl: 400, lg: 320 },
        mx: "auto",
        height: "100%",
        boxShadow: 0,
        border: "1px solid lightgray",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          p: 1.5,
        }}
      >
        <Box>
          <CardMedia
            component="img"
            sx={{
              aspectRatio: "300/200",
              objectFit: "contain",
              borderRadius: 2,
            }}
            image={item?.image}
            alt="Item Image"
          />
          <CardContent sx={{ p: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "text.secondary",
                fontSize: 16,
                my: 1,
              }}
            >
              {item?.title}
            </Typography>

            {type === "document" && (
              <Stack
                direction="row"
                alignItems="flex-end"
                spacing={1}
                sx={{ mt: 2 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 800,
                    color: "primary.dark_hover",
                  }}
                >
                  BDT
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    lineHeight: 1.2,
                    fontSize: 24,
                    fontWeight: 800,
                    color: "primary.dark_hover",
                  }}
                >
                  {item?.price_bdt}
                </Typography>
              </Stack>
            )}
          </CardContent>
        </Box>
        <CardActions sx={{ p: 0, m: 0 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            endIcon={<ChevronRightIcon />}
            sx={{ textTransform: "none", fontSize: 16 }}
          >
            <Link href={link}>View Details</Link>
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default RelatedItemCard;
