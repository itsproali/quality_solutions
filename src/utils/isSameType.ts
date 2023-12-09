import { toast } from "react-toastify";

const isSameType = (cartItems: any, productType: string) => {
  if (cartItems.length === 0) {
    return true;
  } else if (cartItems[0].type === productType) {
    return true;
  } else {
    toast.info("Please add one type of product at a time to the cart");
    return false;
  }
};

export default isSameType;
