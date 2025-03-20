import SnackbarProvider from "@/components/snackbar";
import { OrderSummarySection } from "@/modules/orderSummary";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Shipment from "./shipment";
import useCartContext from "@/provider/cart/cartContext";


const DeliveryInfo = ({ updateShippingPrice }) => {
  const { deliveryData, deliveryError } = useSelector(
    (state) => state.delivery
  );

  const { cartState } = useCartContext();
  const { cart } = cartState;

  return (
    <>
      <Grid container justifyContent="center">
        <Grid
          p={{ lg: 3, md: 3, sm: 1, xs: 1, xxs: 1 }}
          item
          lg={6}
          md={6}
          sm={12}
          xs={12}
          xxs={12}
          sx={(theme) => ({ backgroundColor: theme.palette.grey[4200] })}
        >
          <Shipment
            data={deliveryData}
            updateShippingPrice={updateShippingPrice}
          />
        </Grid>
        <Grid
          item
          lg={5}
          md={5}
          sm={12}
          xs={12}
          xxs={12}
          display={{
            lg: "block",
            md: "block",
            sm: "none",
            xs: "none",
            xxs: "none",
          }}
        >
          <SnackbarProvider>
            {cartState && cart && cart?.cart_count?.QTY ? <OrderSummarySection data={deliveryData} /> : ''}
          </SnackbarProvider>
        </Grid>
      </Grid>
    </>
  );
};

export default DeliveryInfo;
