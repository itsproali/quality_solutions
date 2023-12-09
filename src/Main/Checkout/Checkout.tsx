import { Button, Container, Grid, CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IAddress } from "../../Interfaces/Account.interface";
import OrderSummary from "../../components/Reused/OrderSummary/OrderSummary";
import { useCart } from "../../hooks/useCart";
import { useSingleUser } from "../../hooks/useUser";
import authFetch from "../../services/AxiosCommon";
import CheckoutForm from "./CheckoutForm";
import PaymentOptions from "./PaymentOptions";

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [loader, setLoader] = useState(false);
  const [checked, setChecked] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("ssl_commerz");

  const { data: cartItems } = useCart();
  const { data: userData } = useSingleUser();

  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (userData) {
      setUserInfo({
        name: userData?.name,
        email: userData?.email,
        phone: userData?.phone,
      });
    }
  }, [userData]);

  // handle field change
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  // handle place order
  const handlePlaceOrder = async () => {
    if (!userInfo?.name || !userInfo?.email || !userInfo?.phone) {
      toast.error("Please fill up all the fields");
      return;
    }
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }
    if (!checked) {
      toast.error(
        "Please agree to our terms and conditions, privacy policy and refund policy"
      );
      return;
    }

    const newOrderInfo = {
      email: userInfo?.email,
      name: userInfo?.name,
      phone: userInfo?.phone,
      // paymentMethod,
      address: selectedAddress?.address,
      city: selectedAddress?.city,
      postalCode: selectedAddress?.postalCode,
      orderItems: cartItems,
      orderType: cartItems[0]?.type,
      user: session?.user?._id,
    };

    try {
      setLoader(true);
      const response = await authFetch.post("/api/v1/order", newOrderInfo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (response) {
        queryClient.invalidateQueries({ queryKey: ["order"] });
        toast.success("Order placed successfully");
        router.push("/make-payment");
      }
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.msg);
    } finally {
      setLoader(false);
    }
  };

  return (
    <Container fixed sx={{ minHeight: "65vh", mt: 15, mb: 11 }}>
      <Grid container spacing={2}>
        <Grid item lg={7} xs={12}>
          <CheckoutForm
            checked={checked}
            setChecked={setChecked}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            handleFieldChange={handleFieldChange}
            userInfo={userInfo}
          />
        </Grid>
        <Grid item lg={5} xs={12}>
          <OrderSummary
            title="Checkout Summary"
            items={cartItems}
            sx={{ borderRadius: 3 }}
          />

          {/* <PaymentOptions
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          /> */}

          <Button
            fullWidth
            type="submit"
            size="large"
            variant="contained"
            sx={{ mt: 4, px: 4 }}
            onClick={handlePlaceOrder}
            startIcon={loader ? <CircularProgress size={20} /> : null}
            disabled={loader}
          >
            Place Order
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
