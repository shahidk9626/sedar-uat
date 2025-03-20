import TabbySkeleton from "@/components/skeleton/productDetails/productDetailsSection/tabbySkeleton";
import useCartContext from "@/provider/cart/cartContext";
import { useProgressRouter } from "@/provider/router/useProgressRouter";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import PayFortInstallmentsMerchantPage from "./InstallmentsMerchantpage";
import TabbyPayment from "./TabbyPayment";
import TamaraPayment from "./TamaraPayment";

const InstallmentAccordion = () => {
  const { isLoading } = useProgressRouter();
  const { cartState } = useCartContext();
  const { cart } = cartState;

  return (
    <>
      <Stack spacing={1.5}>
        {["AED", "SAR"].indexOf(cart?.header_info?.SOH_CCY_CODE) >= -1 ? (
          <>
            {isLoading ? <TabbySkeleton /> :
              <>
                <TabbyPayment />
              </>
            }
            {["AED", "SAR"].indexOf(cart?.header_info?.SOH_CCY_CODE) >= -1 && (
              <>
                {cart?.total_price?.SOL_GROSS_VALUE < 2000 &&
                  <>
                    {isLoading ? <TabbySkeleton /> :
                      <TamaraPayment />
                    }
                  </>
                }
              </>
            )}
          </>
        ) : (
          ""
        )}
        <Box p={1}>
          {cart?.header_info &&
            ["AED", "SAR"].indexOf(cart?.header_info?.SOH_CCY_CODE) >= 0 &&
            cart.header_info.SOH_NET_VALUE >= 500 ? (
            <>
              <Divider color="lightgrey" />
              <PayFortInstallmentsMerchantPage />
            </>
          ) : (
            ""
          )}
        </Box>
      </Stack>
    </>
  );
};

export default InstallmentAccordion;
