import SnackbarProvider from "@/components/snackbar";
import { OrderSummarySection } from "@/modules/orderSummary";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ShoppingForm from "./shoppingForm";



const ShoppingInfo = () => {
  return (
    <Stack direction='row' width="100%">
      <Box width={{ lg: "58%", md: '58%', sm: '80%', xs: '100%', xxs: '100%' }} sx={(theme) => ({ backgroundColor: theme.palette.grey[4200] })}>
        <SnackbarProvider>
          <ShoppingForm />
        </SnackbarProvider>
      </Box>
      <Box width='38%' display={{ lg: "block", md: 'block', sm: 'block', xs: 'none', xxs: 'none' }}>
        <SnackbarProvider>
          <OrderSummarySection />
        </SnackbarProvider>
      </Box>
    </Stack>
  );
};

export default ShoppingInfo;
