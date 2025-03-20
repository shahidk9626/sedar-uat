import { NextFillImage } from "@/components/image";
import { CustomLink } from "@/components/link";
import { OrderSummarySection } from "@/modules/orderSummary";
import { useDispatch, useSelector } from "@/redux/store";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@/styles/payment";
import { apiDataService } from "@/utils/apiDataService";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";
import ModificationAddressListForm from "./modificationAddressListForm";
import ReadOnlyAddress from "./readOnlyAddress";
import useCartContext from "@/provider/cart/cartContext";
import SnackbarProvider from "@/components/snackbar";
import CartDynamicBreadcrumb from "../dynamicBreadcrumb";

const ShoppingForm = () => {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.profileSetting);
  const { t: translate } = useTranslation();
  const [expanded, setExpanded] = React.useState(false);
  const { cartState } = useCartContext();
  const { cart, shipping_price } = cartState;
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
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
      };
      try {
        await dispatch(
          apiDataService.post("shipping/updateShippingPrice", data)
        );
      } catch (error) {
        console.log("SHIPPING UPDATE ERROR", error);
      }
    } else {
      push("/cart/shippingAddress");
    }
  };


  React.useEffect(() => {
    if (cart?.shipping_info?.cad_id) {
      updateShippingPrice(cart?.shipping_info?.cad_id, shipping_price);
    }
  }, [cart?.shipping_info]);

  React.useEffect(() => {
    if (address?.result?.length > 0) {
      setExpanded("panel1");
    }
  }, [address?.result]);

  return (
    <Box p={{ lg: 4, md: 4, sm: 1, xs: 1, xxs: 1 }}>
      <Box
        width={170}
        sx={{
          display: {
            lg: "block",
            md: "block",
            sm: "none",
            xs: "none",
            xxs: "none",
          },
        }}
      >
        <CustomLink link="/">
          <NextFillImage
            src={"/assets/shoppingAddress/smalllogo.webp"}
            sx={{
              width: "100%!important",
              height: "100%!important",
              objectFit: "contain",
              backgroundSize: "contain",
              "&.MuiCard-root": {
                borderRadius: 0,
                boxShadow: "none",
                position: "relative!important",
                width: "100%!important",
                height: "100%!important",
              },
            }}
            alt='Image'
            sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
            objectFit="contain"
          />
        </CustomLink>
      </Box>
      <Box
        sx={{
          display: {
            lg: "none",
            md: "none",
            sm: "block",
            xs: "block",
            xxs: "block",
          },
        }}
      >
        <Accordion
          sx={() => ({
            "& .MuiAccordionSummary-root": {
              background: (theme) => theme.palette.common.white,
            },
          })}
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMore color="primary" />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              sx={(theme) => ({
                flexShrink: 0,
                fontSize: theme.typography.typography45,
                fontFamily: theme.fontFaces.helveticaNeue,
                color: theme.palette.primary.main,
              })}
            >
              {expanded === false
                ? `${translate("Show_Order_Summary")}`
                : `${translate("Hide_Order_Summary")}`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SnackbarProvider>
              {cartState && cart && cart?.cart_count?.QTY ? <OrderSummarySection /> : ''}
            </SnackbarProvider>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box my={4} ml={2} mr={1}>
        <CartDynamicBreadcrumb />
      </Box>
      <Box>
        {cart?.header_info && cart?.header_info?.SOH_CARRIER_CODE == "DO03" ? (
          <ReadOnlyAddress />
        ) : (
          <Card variant="outlined" sx={{ borderRadius: "5px" }}>
            <CardContent>
              <SnackbarProvider>
                <ModificationAddressListForm newAddress={{ id: "new" }} />
              </SnackbarProvider>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default ShoppingForm;
