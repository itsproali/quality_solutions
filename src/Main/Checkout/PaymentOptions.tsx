import {
  Box,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Image from "next/image";

type IProps = {
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
};

const PaymentOptions = ({ paymentMethod, setPaymentMethod }: IProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod((event.target as HTMLInputElement).value);
  };
  return (
    <>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: "1px 2px 5px 1px rgba(0,0,0,0.1)",
          p: { xs: 2, md: 4 },
          mt: 3,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Payment Options
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        <RadioGroup
          name="payment_method"
          value={paymentMethod}
          onChange={handleChange}
        >
          <FormControlLabel
            value="amar_pay"
            control={<Radio />}
            label={
              <Image
                src="/images/amar_pay.png"
                alt="amar_pay"
                width={300}
                height={50}
              />
            }
          />
          <FormControlLabel
            sx={{ mt: 3 }}
            value="ssl_commerz"
            control={<Radio />}
            label={
              <Image
                src="/images/ssl_commerz.png"
                alt="ssl_commerz"
                width={300}
                height={50}
              />
            }
          />
        </RadioGroup>
      </Box>
    </>
  );
};

export default PaymentOptions;
