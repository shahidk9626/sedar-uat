import { useAuthContext } from "@/auth/useAuthContext";
import useCartContext from "@/provider/cart/cartContext";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/router";
import DeliveryInfo from "./deliveryInfo";

const ModificationDeliverySection = () => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { cartState } = useCartContext();
  const { cart } = cartState;
  const { header_info } = cart || {};
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
      push(
        `/modification?head_sys_id=${header_info && header_info.SOH_SYS_ID ? header_info.SOH_SYS_ID : 0
        }`
      );
    }
  };

  return <DeliveryInfo updateShippingPrice={updateShippingPrice} />;
};

export default ModificationDeliverySection;
