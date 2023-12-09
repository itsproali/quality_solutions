import { useRouter } from "next/router";
import React from "react";
import { useProduct } from "../../../hooks/useProducts";
import { Container } from "@mui/material";
import PDFReader from "../PDFReader/PDFReader";

const FreeDocument = () => {
  const router = useRouter();

  const { data, isLoading } = useProduct(router?.query?.id as string);

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

export default FreeDocument;
