import { useAuthContext } from "@/auth/useAuthContext";
import useCartContext from "@/provider/cart/cartContext";
import axiosInstance from "@/utils/axios";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import { useRouter } from "next/router";
import React from "react";
import DeliveryInfo from "./deliveryInfo";

const DeliverySection = () => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { push } = useRouter();
  const {
    langName,
    site,
    countryName,
    cniso,
    visitorId,
    detect_country,
    CCYCODE,
    CCYDECIMALS,
    USER_ID,
  } = cookies || {};
  const updateShippingPrice = async (
    shipping_id,
    shipping_price,
    shipment_data = false,
    delivery_type = false
  ) => {
    if (shipping_id) {
      let data = {
        shipping_price: shipping_price,
        shipping_address_id: shipping_id,
        shipment_data: shipment_data,
        delivery_type: delivery_type,
        site: site,
        lang: langName,
        country: countryName,
        visitorId: visitorId,
        currency: CCYCODE,
        ccy_decimal: CCYDECIMALS,
        cn_iso: cniso,
        detect_country: detect_country,
        userId: USER_ID,
      };
      await axiosInstance
        .post(
          "shipping/updateShippingPrice",
          JSON.parse(JSON.stringify(data)),
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => { })
        .catch((error) => {
          console.log("SHIPPING UPDATE ERROR", error);
        });
    } else {
      push("/cart/shippingAddress");
    }
  };

  const { cartState } = useCartContext();
  const { cart } = cartState;
  React.useEffect(() => {
    if (cart) {
      setTimeout(() => {
        GoogleAnalytics && GoogleAnalytics.addShippingInfo(cart?.header_info || {}, cart?.complete || {});
      }, 1200);
    }
  }, [cart]);

  return <DeliveryInfo updateShippingPrice={updateShippingPrice} />;
};

export default DeliverySection;
