import useCartContext from "@/provider/cart/cartContext";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import React from "react";
import PaymentInfo from "./paymentInfo";


const PaymentSection = () => {
  const { cartState } = useCartContext();
  const { cart } = cartState;
  React.useEffect(() => {
    if (cart) {
      setTimeout(() => {
        GoogleAnalytics && GoogleAnalytics.addShippingInfo(
          cart?.header_info,
          cart?.complete
        );
      }, 1200);
    }
  }, [cart]);
  return <PaymentInfo />;
};

export default PaymentSection;
