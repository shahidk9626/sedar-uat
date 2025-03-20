import SnackbarProvider from "@/components/snackbar";
import { OrderSummarySection } from "@/modules/orderSummary";
import Grid from "@mui/material/Grid";
import ShoppingForm from "./shoppingForm";
import useCartContext from "@/provider/cart/cartContext";

const ShopingInfo = () => {

  const { cartState } = useCartContext();
  const { cart } = cartState;

  return (
    <Grid container justifyContent="center">
      <Grid
        item
        lg={6}
        md={6}
        sm={12}
        xs={12}
        xxs={12}
        sx={(theme) => ({ backgroundColor: theme.palette.grey[4200] })}
      >
        <SnackbarProvider>
          <ShoppingForm />
        </SnackbarProvider>
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
          {cartState && cart && cart?.cart_count?.QTY ? <OrderSummarySection /> : ''}
        </SnackbarProvider>
      </Grid>
    </Grid>
  );
};

export default ShopingInfo;
