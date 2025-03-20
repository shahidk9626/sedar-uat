import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import SnackbarProvider from "@/components/snackbar";
import { OrderSummarySection } from "@/modules/orderSummary";
import useCartContext from "@/provider/cart/cartContext";
import { useDispatch } from "@/redux/store";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import { apiDataService } from "@/utils/apiDataService";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import CartDynamicBreadcrumb from "../cart/dynamicBreadcrumb";
import PaymentAccordion from "./paymentAccordion";

const PaymentDetail = ({ formik }) => {
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [expanded, setExpanded] = React.useState(false);
  const { t: translate } = useTranslation();
  const { cartState } = useCartContext();
  const { cart, shipping_price } = cartState;
  let total_price = cart
    ? Number(cart?.total_price?.SOL_GROSS_VALUE) + Number(shipping_price)
    : 0 + Number(shipping_price);
  const router = useRouter();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleSubmitProceedOrder = async () => {
    await dispatch(apiDataService.post(`payment/tmpToMain`))
      .then((response) => {
        let res_data = response.data;
        GoogleAnalytics && GoogleAnalytics.addPaymentInfo(
          cart?.header_info,
          cart?.complete,
          "No Card"
        );
        //
        if (
          res_data.return_status == 0 &&
          res_data.error_message == "Success"
        ) {
          if (Number(cart.total_price.SOL_VALUE) > 0) {
            router.push(
              "/" + locale + "/payment/success?orderId=" + res_data.order_id
            );
          } else {
            router.push(
              "/" + locale + "/payment/sample?orderId=" + res_data.order_id
            );
          }
        } else {
          enqueueSnackbar(
            res_data.error_message || `${translate("SomethingWentWrong")}`,
            {
              variant: "error",
              autoHideDuration: 4000
            }
          );
        }
      })
      .catch((e) => {
        enqueueSnackbar(e.message || `${translate("SomethingWentWrong")}`, {
          variant: "error",
          autoHideDuration: 4000
        });
      });
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (cart?.total_price && Number(cart?.total_price.SOL_GROSS_VALUE) > 0) {
        GoogleAnalytics && GoogleAnalytics.addPaymentInfo(cart?.header_info, cart?.complete, "");
      }
    }, 1000);
  }, []);

  return (
    <>
      <Box
        p={{ lg: 5, md: 5, sm: 1, xs: 0, xxs: 0 }}
        sx={{
          position: "sticky",
          top: 0,
        }}
      >
        <Box
          p={1}
          width={170}
          sx={{
            display: {
              lg: "block",
              md: "block",
              sm: "block",
              xs: "none",
              xxs: "none",
            },
          }}
        >
          <CustomLink link="/">
            <NextLazyLoadImage
              src={"/assets/shoppingAddress/smalllogo.webp"}
              alt="SedarLogo"
              width={170}
              height={77}
              sx={{
                width: "100%!important",
                height: "100%!important",
                objectFit: "cover!important",
              }}
              sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
              objectFit="contain"
              upLgWidth={170}
              downLgWidth={170}
              downMdWidth={170}
              downSmWidth={170}
              downXsWidth={170}
            />
          </CustomLink>
        </Box>
        <Box
          sx={{
            display: {
              lg: "none",
              md: "none",
              sm: "none",
              xs: "block",
              xxs: "block",
            },
          }}
        >
          <Accordion
            sx={(theme) => ({
              "& .MuiAccordionSummary-root": {
                background: (theme) => theme.palette.common.white,
              },
            })}
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              sx={{ padding: 2 }}
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
                <OrderSummarySection />
              </SnackbarProvider>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box p={2}>
          <CartDynamicBreadcrumb />
        </Box>
        {total_price > 0 ? (
          <Box
            m={2}
            sx={(theme) => ({
              border: `1px solid ${theme.palette.primary.main}`,
            })}
          >
            <PaymentAccordion formik={formik} />
          </Box>
        ) : (
          <Box my={2}>
            <Button
              fullWidth
              variant="contained"
              color="warning"
              sx={(theme) => ({
                fontWeight: 400,
                borderRadius: 0,
                height: "auto",
                px: { md: "3rem", sm: "2.5rem", xs: "2rem", xxs: "2rem" },
                py: "0.81rem",
                ...theme.typography.typography15,
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                color: theme.palette.common.black,
              })}
              onClick={() => handleSubmitProceedOrder()}
            >
              {translate("Proceed_to_order")}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default PaymentDetail;
