import { Container } from "@mui/material";
import { IBook } from "../../Interfaces/Book.interface";
import { SingleDetails } from "../../components/Reused/Details";

const BookDetails = ({ data }: { data: IBook }) => {
  return (
    <>
      <Container fixed sx={{ py: 10 }}>
        <SingleDetails singleData={data} type="book" />
      </Container>
    </>
  );
};

export default BookDetails;
