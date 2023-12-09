import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import { useBooks } from "../../hooks/useBooks";
import BookCard from "./BookCard";
import { IBook } from "../../Interfaces/Book.interface";
import CardLoading from "../../components/Reused/CardLoading";
import EmptyUI from "../../components/Reused/EmptyUI";
import { useCategory } from "../../hooks/useCategory";
import { useState } from "react";
import CategoryFilter from "../../components/Reused/CategoryFilter/CategoryFilter";

const Books = () => {
  const [category, setCategory] = useState("all");
  const {
    data: books,
    error,
    isLoading,
  } = useBooks({ category: category === "all" ? null : category });
  const { bookCategory } = useCategory();

  return (
    <Container fixed sx={{ my: 20, minHeight: "70vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: "18px", lg: "32px" },
            width: "100%",
          }}
          variant="h3"
        >
          Books Collection
        </Typography>

        <CategoryFilter
          category={category}
          setCategory={setCategory}
          categories={bookCategory}
        />
      </Box>

      <Box sx={{ mt: 5 }}>
        {isLoading ? (
          <CardLoading row={3} />
        ) : !books?.data?.length ? (
          <EmptyUI title="There's no book available!" />
        ) : (
          <Grid container spacing={2}>
            {books?.data?.map((book: IBook) => (
              <Grid item lg={4} sm={6} xs={12} key={book?._id}>
                <BookCard book={book} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Books;
