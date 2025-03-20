import { useAuthContext } from "@/auth/useAuthContext";
import MuiCustomButton from "@/components/button/customButton";
import { NextFillImage } from "@/components/image";
import { CustomLink } from "@/components/link";
import SnackbarProvider from "@/components/snackbar";
import useResponsive from "@/hooks/useResponsive";
import AddressListForm from "@/modules/form/addressListForm";
import { OrderSummarySection } from "@/modules/orderSummary";
import useCartContext from "@/provider/cart/cartContext";
import { getProfileAddress } from "@/redux/slices/auth/profile";
import { getShippingAddressList } from "@/redux/slices/shippingAddressList";
import { useDispatch, useSelector } from "@/redux/store";
import {
  CartPageAccordionHeading,
  CartPageAddressDetails,
  CartPageAddressName,
} from "@/styles/cartPage";
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
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { debounce } from "lodash";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import CartDynamicBreadcrumb from "../cart/dynamicBreadcrumb";


const ShoppingForm = () => {
  const isSmallScreen = useResponsive("down", "sm");
  const router = useRouter();
  const { push } = router;
  const dispatch = useDispatch();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { user, JWTAuthToken, USER_ID, cniso } = cookies || {};
  const { shippingAddressList } = useSelector((state) => state.shippingAdress);
  const { t: translate } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [expanded, setExpanded] = React.useState(false);
  const { cartState } = useCartContext();
  const { cart, shipping_price } = cartState;
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const getAddressId =
    (
      shippingAddressList.result &&
      shippingAddressList.result?.length > 0 &&
      shippingAddressList.result.find((item) => item?.cad_default_yn == "Y")
    )?.cad_id || cart?.shipping_info?.cad_id;
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
  const setDefaultAddress = (id) => {
    if (user) {
      dispatch(
        apiDataService.post(
          `dashboard/default_address_update/${id}/${USER_ID}`,
          {
            cust_user_id: user?.cust_email_id,
            auth_token: JWTAuthToken,
            cad_default_yn: "Y",
          }
        )
      )
        .then((response) => {
          if (response.status === 200) {
            updateShippingPrice(id, shipping_price, false, false);
            dispatch(
              getShippingAddressList({
                id: USER_ID,
                cust_user_id: user.cust_email_id,
                auth_token: JWTAuthToken,
                CNISO: cniso,
              })
            );
            dispatch(
              getProfileAddress({
                USER_ID: USER_ID,
                cust_user_id: user.cust_email_id,
                auth_token: JWTAuthToken,
              })
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  React.useEffect(() => {
    const debounceCallback = debounce(() => {
      if (getAddressId) {
        updateShippingPrice(getAddressId, shipping_price, false, false);
      }
    }, 300);
    debounceCallback();
    return () => {
      debounceCallback.cancel();
    };
  }, [cart?.shipping_info, shipping_price, getAddressId]);

  React.useEffect(() => {
    if (shippingAddressList?.result?.length > 0) {
      setExpanded("panel1");
    }
  }, [shippingAddressList?.result]);

  return (
    <Box
      p={{ lg: 4, md: 4, sm: 1, xs: 0, xxs: 0 }}
      sx={{ position: "sticky", top: 0 }}
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
            sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
            alt="Image"
            objectFit="contain"
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
              {expanded === "panel3"
                ? `${translate("Hide_Order_Summary")}`
                : `${translate("Show_Order_Summary")}`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: { xs: "0px", xxs: "0px" } }}>
            <SnackbarProvider>
              <OrderSummarySection />
            </SnackbarProvider>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box my={4} ml={2} mr={1}>
        <CartDynamicBreadcrumb />
      </Box>
      <Box p={1}>
        {user?.cust_cr_uid != "GUEST-USER" &&
          shippingAddressList?.result?.length > 0 && (
            <>
              <Accordion
                sx={(theme) => ({
                  "& .MuiAccordionSummary-root": {
                    background: theme.palette.common.white,
                    border: `0px solid ${theme.palette.grey[2100]}`,
                  },
                })}
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={(theme) => ({
                    "& .MuiAccordionSummary-content": {
                      flexDirection: "column",
                    },
                    backgroundColor:
                      expanded === "panel1"
                        ? theme.palette.grey[7400]
                        : theme.palette.grey[0],
                  })}
                >
                  <CartPageAccordionHeading>
                    {translate("MyAddresses")}
                  </CartPageAccordionHeading>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {shippingAddressList &&
                      shippingAddressList?.result &&
                      shippingAddressList?.result?.length > 0 &&
                      shippingAddressList?.result.map((item, index) => {
                        return (
                          <Grid
                            item
                            lg={6}
                            md={6}
                            sm={12}
                            xs={12}
                            xxs={12}
                            key={`MY-ADDRESS-LIST-${index}`}
                          >
                            <Card
                              onClick={() => {
                                if (item?.cad_default_yn != "Y") {
                                  let shipping_id = item.cad_id
                                    ? item.cad_id
                                    : false;

                                  let ship_price = shipping_price
                                    ? shipping_price
                                    : 0;

                                  setDefaultAddress(item.cad_id);
                                  updateShippingPrice(
                                    shipping_id,
                                    ship_price,
                                    false,
                                    false
                                  );
                                }
                              }}
                              variant="outlined"
                              sx={{
                                cursor: "pointer",
                                borderRadius: "4px",
                                ...(item?.cad_default_yn == "Y" && {
                                  border: (theme) =>
                                    `1px solid ${theme.palette.primary.main}`,
                                }),
                                "&:hover": {
                                  border: (theme) =>
                                    `1px solid ${theme.palette.primary.main}`,
                                },
                                borderRadius: "1px",
                              }}
                            >
                              <CardContent>
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  justifyContent={"space-between"}
                                >
                                  <Box>
                                    <FormControlLabel
                                      value="male"
                                      control={
                                        <Radio
                                          checked={item?.cad_default_yn == "Y"}
                                        />
                                      }
                                      label={
                                        <>
                                          <CartPageAddressName>
                                            {item?.cad_first_name}{" "}
                                            {item?.cad_last_name}
                                          </CartPageAddressName>
                                        </>
                                      }
                                    />
                                  </Box>
                                  <Box>
                                    <Chip
                                      color="primary"
                                      label={translate(item?.cad_address_type)}
                                      variant="outlined"
                                      sx={{ height: "23px", cursor: "pointer", fontFamily: (theme) => theme.fontFaces.helveticaNeue }}
                                    />
                                  </Box>
                                </Stack>
                                <Box mt={2} pl={3}>
                                  <CartPageAddressDetails>
                                    {item?.cad_building_name_no},
                                    {item?.cad_state_desc},{item?.cad_country},
                                    {item?.cad_floor_no}
                                  </CartPageAddressDetails>
                                  <CartPageAddressDetails>
                                    {item?.cad_nearest_landmark}
                                  </CartPageAddressDetails>
                                  <CartPageAddressDetails>
                                    {item?.cad_postal_code}
                                  </CartPageAddressDetails>
                                </Box>

                                <Box pl={3}>
                                  <CartPageAddressDetails>
                                    {translate("Landmark")}:{" "}
                                    {item?.cad_nearest_landmark}{" "}
                                  </CartPageAddressDetails>
                                </Box>
                                <Box pl={3}>
                                  <CartPageAddressDetails>
                                    {translate("Mobile")} :
                                    {item?.cad_contact_number}
                                  </CartPageAddressDetails>
                                  <CartPageAddressDetails>
                                    {translate("Email")} : {user?.cust_email_id}
                                  </CartPageAddressDetails>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={(theme) => ({
                  "& .MuiAccordionSummary-root": {
                    background: (theme) => theme.palette.common.white,
                    border: `0px solid ${theme.palette.grey[2100]}`,
                  },
                })}
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={(theme) => ({
                    "& .MuiAccordionSummary-content": {
                      flexDirection: "column",
                    },
                    backgroundColor:
                      expanded === "panel2"
                        ? theme.palette.grey[7400]
                        : theme.palette.grey[0],
                  })}
                >
                  <CartPageAccordionHeading>
                    {translate("AddNewAddress")}
                  </CartPageAccordionHeading>
                </AccordionSummary>
                <AccordionDetails>
                  <SnackbarProvider>
                    <AddressListForm
                      textAlign={{
                        lg: "end",
                        md: "end",
                        sm: "center",
                        xs: "center",
                        xxs: "center",
                      }}
                      updateShippingPrice={updateShippingPrice}
                      newAddress={{ id: "new" }}
                      submitButtonName={
                        user?.cust_cr_uid === "GUEST-USER"
                          ? translate("Continue")
                          : shippingAddressList?.result?.length > 0
                            ? translate("Save_and_continue")
                            : translate("Save")
                      }
                      type="SHIPPING"
                    />
                  </SnackbarProvider>
                </AccordionDetails>
              </Accordion>
            </>
          )}

        {user?.cust_cr_uid != "GUEST-USER" &&
          shippingAddressList?.result?.length > 0 && (
            <Box
              my={2}
              textAlign={{
                lg: "end",
                md: "end",
                sm: "end",
                xs: "end",
                xxs: "end",
              }}
              sx={{
                display: expanded === "panel2" ? "none" : "block",
                width: "100%",
              }}
              position="sticky"
              bottom={0}
            >
              <MuiCustomButton
                buttonSx={(theme) => ({
                  "&.MuiButton-root": {
                    [theme.breakpoints.up("lg")]: {
                      width: "100%", // Adjust the width as per your requirement for large screens
                    },
                    [theme.breakpoints.between("md", "lg")]: {
                      width: "100%", // Adjust the width as per your requirement for medium screens
                    },
                    [theme.breakpoints.down("md")]: {
                      width: "100%", // Adjust the width as per your requirement for small screens
                    },
                    borderRadius: "0px!important",
                    padding: "1rem!important",
                    background: (theme) => theme.palette.primary.light,
                    ":hover": {
                      background: (theme) =>
                        `${theme.palette.primary.light}!important`,
                    },
                    color: `${theme.palette.grey[4900]}!important`,
                    fontSize: "20px",
                    fontFamily: theme.fontFaces.helveticaNeue,
                  },
                })}
                title={translate("Continue")}
                fullWidth={isSmallScreen ? true : false}
                onClick={() => {
                  if (getAddressId) {
                    router.push("/cart/delivery");
                  } else {
                    enqueueSnackbar("Please Select Your address.", {
                      variant: "error",
                      autoHideDuration: 4000
                    });
                  }
                }}
              />
            </Box>
          )}

        {(!shippingAddressList?.result ||
          shippingAddressList?.result?.length <= 0 ||
          user?.cust_cr_uid == "GUEST-USER") && (
            <Card variant="outlined" sx={{ borderRadius: "5px" }}>
              <CardContent>
                <SnackbarProvider>
                  <AddressListForm
                    updateShippingPrice={updateShippingPrice}
                    newAddress={{
                      id: "new",
                    }}
                    submitButtonName={
                      user?.cust_cr_uid === "GUEST-USER"
                        ? translate("Continue")
                        : shippingAddressList?.result?.length > 0
                          ? translate("Save")
                          : translate("Save_and_continue")
                    }
                    type="SHIPPING"
                  />
                </SnackbarProvider>
              </CardContent>
            </Card>
          )}
      </Box>
    </Box>
  );
};

export default ShoppingForm;
