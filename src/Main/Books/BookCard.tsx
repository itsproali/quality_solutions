import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IBook } from "../../Interfaces/Book.interface";
import Link from "next/link";

const BookCard = ({ book }: { book: IBook }) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <CardMedia
          component="img"
          sx={{
            aspectRatio: "300/200",
            objectFit: "contain",
          }}
          image={book?.thumbnail}
          alt={book?.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            sx={{
              fontSize: { md: "16px", xs: "14px" },
              fontWeight: 600,
            }}
          >
            {book?.title}
          </Typography>
        </CardContent>
      </Box>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 1,
          pb: 2,
        }}
      >
        <Typography
          sx={{ fontSize: { xl: "18px", lg: "16px" }, fontWeight: "bold" }}
        >
          {book?.price_usd ? (
            `$${book.price_usd} or ৳${book.price_bdt}`
          ) : (
            <Box
              role="free_text"
              component="span"
              sx={{ px: 2, py: 1, bgcolor: "#e0bf48", borderRadius: "10px" }}
            >
              Free
            </Box>
          )}
        </Typography>
        <Link href={"/books/" + book?._id}>
          <Button size="small" variant="contained" color="primary">
            View Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default BookCard;
