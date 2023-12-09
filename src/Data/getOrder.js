import { setOrder } from "../Redux/orderSlice";

export const getOrder = async (dispatch) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order`, {
    method: 'GET',
    headers: {
      "content-type":"application/json"
    }
  })
  const res = await response.json();
  if(response.ok) {
    dispatch(setOrder(res));
  }
}