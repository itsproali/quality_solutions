import Link from "next/link";
import React, { useEffect } from "react";
import { PaymentService } from "../src/services/PaymentService";
import { useSession } from "next-auth/react";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";

const Payment = () => {
  const [successSession, setSuccessSession] = React.useState<any>(false);
  const [redirectUrl, setRedirectUrl] = React.useState<any>("");
  const [failed, setFailed] = React.useState<any>(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!session?.accessToken || !id) return;
    PaymentService.makePayment(session?.accessToken, id as string).then(
      (res) => {
        if (res?.data.status === "SUCCESS") {
          setSuccessSession(true);
          setRedirectUrl(res?.data.redirectGatewayURL);
        } else {
          setFailed(true);
        }
      }
    );
  }, [session?.accessToken, id]);
  return (
    <div>
      {successSession
        ? (window.location = redirectUrl)
        : "Payment is being processed..."}
      {failed ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <h1>Payment Failed</h1>
          <p>Payment failed due to some reason. Please try again later.</p>
          <Link href="/cart">
            <a>
              <Button variant="contained" color="primary">
                Go to order
              </Button>
            </a>
          </Link>
        </Box>
      ) : (
        ""
      )}
    </div>
  );
};

export default Payment;
