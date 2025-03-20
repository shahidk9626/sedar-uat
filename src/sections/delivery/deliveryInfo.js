import SnackbarProvider from "@/components/snackbar";
import { OrderSummarySection } from "@/modules/orderSummary";
import useCartContext from "@/provider/cart/cartContext";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Shipment from "./shipment";

const DeliveryInfo = ({ updateShippingPrice }) => {
  const { deliveryData } = useSelector((state) => state.delivery);
  const { cartState } = useCartContext();
  const { cart, deliveryCount } = cartState;

  useEffect(() => {
    if (cart && (cart?.header_info || cart?.complete)) {
      setTimeout(() => {
        GoogleAnalytics && GoogleAnalytics.deliverInfo(
          cart?.header_info || {},
          cart?.complete || {}
        );
      }, 1000);
    }
  }, [cart]);
  return (
    <>
      <Stack direction="row">
        <Box
          width={{ lg: "58%", md: "58%", sm: "80%", xs: "100%", xxs: "100%" }}
          sx={(theme) => ({ backgroundColor: theme.palette.grey[4200] })}
        >
          <Shipment
            data={deliveryData}
            updateShippingPrice={updateShippingPrice}
            deliveryCount={deliveryCount}
          />
        </Box>
        <Box
          width="38%"
          display={{
            lg: "block",
            md: "block",
            sm: "block",
            xs: "none",
            xxs: "none",
          }}
        >
          <SnackbarProvider>
            <OrderSummarySection isDelivery={true} />
          </SnackbarProvider>
        </Box>
      </Stack>
    </>
  );
};

export default DeliveryInfo;
