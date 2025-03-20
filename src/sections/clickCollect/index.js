import SnackbarProvider from "@/components/snackbar";
import { OrderSummarySection } from "@/modules/orderSummary";
import useCartContext from "@/provider/cart/cartContext";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React from "react";
import ClickCollectForm from "./clickCollectForm";


const ClickCollectSection = () => {
  const { cartState } = useCartContext();
  const { cart } = cartState;
  React.useEffect(() => {
    if (cart) {
      setTimeout(() => {
        GoogleAnalytics && GoogleAnalytics.addShippingInfo(cart.header_info, cart.complete);
      }, 1200);
    }
  }, [cart]);
  return (
    <>
      <Stack direction="row">
        <Box
          width={{ lg: "58%", md: "58%", sm: "80%", xs: "100%", xxs: "100%" }}
          sx={(theme) => ({ backgroundColor: theme.palette.grey[4200] })}
        >
          <SnackbarProvider>
            <ClickCollectForm />
          </SnackbarProvider>
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
            <OrderSummarySection />
          </SnackbarProvider>
        </Box>
      </Stack>
    </>
  );
};

export default ClickCollectSection;
