import MyDocumentDetails from "../../src/Main/MyDocuments/MyDocumentDetails";
import { privateRoute } from "../../src/utils/utils";

const MyDocumentDetailsPage = () => {
  return <MyDocumentDetails />;
};

export default MyDocumentDetailsPage;

MyDocumentDetailsPage.getInitialProps = async (context: any) =>
  privateRoute(context);
