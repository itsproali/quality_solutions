import { Container } from "@mui/material";
import React from "react";
import { usePurchaseDocuments } from "../../hooks/useProducts";
import { useRouter } from "next/router";
import PDFReader from "../../components/Reused/PDFReader/PDFReader";

const MyDocumentDetails = () => {
  const router = useRouter();

  const { data, isLoading, isFetching, error } = usePurchaseDocuments(
    router?.query?.id as string
  );

  return (
    <Container
      fixed
      sx={{
        minHeight: "60vh",
        mt: 20,
        mb: 15,
      }}
    >
      <PDFReader data={data} />
    </Container>
  );
};

export default MyDocumentDetails;
