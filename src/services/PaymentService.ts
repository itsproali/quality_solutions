import authFetch from "./AxiosCommon";

export class PaymentService {
  static async makePayment(token: string, id: string) {
    return authFetch.get(`/api/v1/payment?orderId=${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  }
}
