import React from "react";
import FreeDocument from "../../src/components/Reused/FreeDocument/FreeDocument";
import { privateRoute } from "../../src/utils/utils";

const FreeDocuments = () => {
  return <FreeDocument />;
};

export default FreeDocuments;

FreeDocuments.getInitialProps = async (context: any) => privateRoute(context);
