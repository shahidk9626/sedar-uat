import { SubmitButton } from "@/components/button";
import { NextFillImage } from "@/components/image";
import { CustomLink } from "@/components/link";
import { OrderSummarySection } from "@/modules/orderSummary";
import { CartPageShipment, CartPageShipmentDelivery } from "@/styles/cartPage";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "@/redux/store";
import { useRouter } from "next/router";
import MuiCustomButton from "@/components/button/customButton";
import { find } from "lodash";
import dynamic from "next/dynamic";
import { setShippingPrice } from "@/redux/slices/cartPage";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import OutOfCoverageArea from "@/modules/outOfCoverageArea";
import useCartContext from "@/provider/cart/cartContext";
import SnackbarProvider from "@/components/snackbar";
import CartDynamicBreadcrumb from "../dynamicBreadcrumb";


const Shipment = ({ data, updateShippingPrice }) => {
  const dispatch = useDispatch();
  const { cartState } = useCartContext();
  const { cart, cartPopupData } = cartState;
  const [shipping_price, setShipping_price] = useState(0);
  const { deliveryData, countryInfo } = useSelector((state) => state.delivery);
  const { address, addressError } = useSelector(
    (state) => state.profileSetting
  );
  const [expanded, setExpanded] = useState(false);
  const { t: translate } = useTranslation();
  const router = useRouter();

  const addressCadId =
    address &&
    address?.result?.length > 0 &&
    find(address?.result, { cad_default_yn: "Y" })?.cad_id;

  let shipping_id = addressCadId;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const deliveryTypeFun = async (key, val, shipment_data = false) => {
    if (
      deliveryData &&
      deliveryData?.shipping_price?.ARAMEX_FEES &&
      deliveryData?.shipping_price?.ARAMEX_FEES > 0
    ) {
      let ship_price = deliveryData?.shipping_price?.ARAMEX_FEES
        ? deliveryData?.shipping_price?.ARAMEX_FEES
        : 0;

      setShipping_price(ship_price);

      if (shipment_data && shipment_data.length > 0) {
        updateShippingPrice(shipping_id, ship_price, shipment_data, "DO04");
      }
    } else if (
      ["delivery_with_installation"].indexOf(key) >= 0 &&
      val == "DO02"
    ) {
      let ship_price = deliveryData?.shipping_price?.DS_INSTALLATION_ZONE_FEES
        ? deliveryData?.shipping_price?.DS_INSTALLATION_ZONE_FEES
        : 0;
      setShipping_price(ship_price);

      if (shipment_data && shipment_data.length > 0) {
        updateShippingPrice(shipping_id, ship_price, shipment_data, "DO02");
      }
    } else if (deliveryData && val == "DO01") {
      let ship_price = deliveryData?.shipping_price?.DS_DELIVERY_ZONE_FEES
        ? deliveryData?.shipping_price?.DS_DELIVERY_ZONE_FEES
        : 0;
      setShipping_price(ship_price);
      if (shipment_data && shipment_data.length > 0) {
        updateShippingPrice(shipping_id, ship_price, shipment_data, "DO01");
      }
    } else {
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (
        deliveryData?.shipping_price &&
        deliveryData?.shipping_price.ARAMEX_FEES &&
        deliveryData?.shipping_price.ARAMEX_FEES > 0
      ) {
        deliveryTypeFun("delivery_only", "DO04");
      }
      deliveryData?.shipping_price &&
        Object.keys(deliveryData?.shipment_list) &&
        Object.keys(deliveryData?.shipment_list).map((delivery_days, i) => {
          if (
            deliveryData?.shipping_price &&
            deliveryData?.shipment_list[delivery_days]
              .delivery_with_installation &&
            deliveryData?.shipment_list[delivery_days]
              .delivery_with_installation.length > 0
          ) {
            deliveryTypeFun("delivery_with_installation", "DO02");
          } else if (
            deliveryData?.shipping_price &&
            deliveryData?.shipment_list[delivery_days].delivery_only &&
            deliveryData?.shipment_list[delivery_days].delivery_only.length > 0
          ) {
            deliveryTypeFun("delivery_only", "DO01");
          } else {
          }
        });
    }, 500);
  }, [deliveryData, cart, address?.result]);

  useEffect(() => {
    if (shipping_id && shipping_price && address?.result) {
      setTimeout(() => {
        updateShippingPrice(shipping_id, shipping_price);
      }, 100);
    }
  }, [shipping_price, shipping_id, address?.result]);

  return (
    <>
      <Box p={{ lg: 5, md: 5, sm: 0, xs: 0, xxs: 0 }}>
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
              alt="sedarLogo"
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
        <Box my={4} ml={1} mr={1}>
          <CartDynamicBreadcrumb />
        </Box>

        {data &&
          data?.shipment_list &&
          Object.keys(data?.shipment_list)?.length > 0 &&
          Object.keys(data?.shipment_list)?.map(
            (delivery_days, deliverDayIndex) => {
              let business_day = 1;

              if (delivery_days > 1 && delivery_days < 5) {
                business_day = delivery_days - 1;
              } else if (delivery_days >= 5) {
                business_day = delivery_days - 2;
              } else {
                business_day = delivery_days;
              }
              return (
                <Box
                  my={2}
                  key={`SHIPMENT-DELIFER-${deliverDayIndex + 3}`}
                  ml={5}
                  mr={5}
                >
                  {Object.keys(data?.shipment_list[delivery_days]) &&
                    Object.keys(data?.shipment_list[delivery_days])?.length >
                    0 &&
                    Object.keys(data?.shipment_list[delivery_days]).map(
                      (shipment_type, index) => {
                        return (
                          <Grid
                            key={`DELIVERY-ITEM-${index}`}
                            container
                            my={1}
                            spacing={2}
                          >
                            <Grid xs={12} xxs={12}>
                              <Box>
                                <CartPageShipment>{`${translate("Shipment", {
                                  shipment_no: deliverDayIndex + 1,
                                })}`}</CartPageShipment>
                              </Box>
                            </Grid>
                            {data?.shipment_list[delivery_days][
                              shipment_type
                            ] &&
                              data?.shipment_list[delivery_days][shipment_type]
                                ?.length > 0 &&
                              data?.shipment_list[delivery_days][
                                shipment_type
                              ].map((item, subIndex) => {
                                let imagePath = item.SOL_IMAGE_PATH
                                  ? `${item.IMAGE_PATH}${item.SOL_IMAGE_PATH}`
                                  : "";
                                return (
                                  <Grid
                                    item
                                    lg={2}
                                    md={2}
                                    sm={12}
                                    xs={12}
                                    xxs={12}
                                    key={`ITEMS)ABCFGT-${subIndex}`}
                                  >
                                    <NextLazyLoadImage
                                      src={imagePath}
                                      alt={item.SFP_TITLE}
                                      width="400"
                                      height="300"
                                      placeholder="blur"
                                      loading="lazy"
                                      sx={{
                                        width: "100%!important",
                                        height: "100%!important",
                                        objectFit: "cover!important",
                                        "&.MuiCard-root": {
                                          borderRadius: 0,
                                          boxShadow: "none",
                                          position: "relative!important",
                                        },
                                      }}
                                      sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                                    />
                                  </Grid>
                                );
                              })}
                            <Grid xs={12} xxs={12}>
                              <Box p={2}>
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  defaultValue={
                                    data?.shipment_list[delivery_days][
                                      shipment_type
                                    ][0]?.SOL_CARRIER_CODE
                                  }
                                  onChange={(event) => {
                                    deliveryTypeFun(
                                      shipment_type,
                                      event.target.value,
                                      data?.shipment_list[delivery_days][
                                      shipment_type
                                      ]
                                    );
                                  }}
                                >
                                  <Stack
                                    direction={{
                                      lg: "row",
                                      md: "row",
                                      sm: "column",
                                      xs: "column",
                                      xxs: "column",
                                    }}
                                    spacing={{
                                      lg: 4,
                                      md: 4,
                                      sm: 1,
                                      xs: 1,
                                      xxs: 1,
                                    }}
                                  >
                                    <FormControlLabel
                                      control={<Radio />}
                                      label={
                                        <CartPageShipmentDelivery>
                                          {translate("Delivery")}
                                        </CartPageShipmentDelivery>
                                      }
                                      value="DO01"
                                    />

                                    {data?.shipment_list[delivery_days][
                                      shipment_type
                                    ][0].SOL_CARRIER_CODE == "DO04" && (
                                        <FormControlLabel
                                          control={<Radio />}
                                          label={
                                            <CartPageShipmentDelivery>
                                              {translate("Aramex_Delivery")}
                                            </CartPageShipmentDelivery>
                                          }
                                          value="DO04"
                                          defaultValue={
                                            data?.shipment_list[delivery_days][
                                              shipment_type
                                            ][0]?.SOL_CARRIER_CODE == "DO01"
                                              ? true
                                              : false
                                          }
                                        />
                                      )}

                                    <FormControlLabel
                                      disabled={
                                        ["delivery_with_installation"].indexOf(
                                          shipment_type
                                        ) == -1
                                          ? true
                                          : false
                                      }
                                      control={<Radio />}
                                      value="DO02"
                                      label={
                                        <>
                                          <CartPageShipmentDelivery
                                            sx={(theme) => ({
                                              fontSize:
                                                theme.typography.typography18,
                                              fontFamily:
                                                theme.fontFaces.helveticaNeue,
                                            })}
                                          >
                                            {translate(
                                              "Delivery_With_Installation"
                                            )}
                                          </CartPageShipmentDelivery>
                                          {[
                                            "delivery_with_installation",
                                          ].indexOf(shipment_type) == -1 && (
                                              <Typography
                                                sx={(theme) => ({
                                                  ...theme.typography.caption,
                                                  color:
                                                    theme.palette.primary.main,
                                                })}
                                              >
                                                {translate(
                                                  "Installation_not_available"
                                                )}
                                              </Typography>
                                            )}
                                        </>
                                      }
                                    />
                                  </Stack>
                                </RadioGroup>
                              </Box>
                              <Stack direction={"row"} spacing={2} my={1}>
                                <Box
                                  width={{
                                    lg: 15,
                                    md: 15,
                                    sm: "10%",
                                    xs: "10%",
                                    xxs: "10%",
                                  }}
                                >
                                  <NextFillImage
                                    src="/assets/delivery/mover-truck.png"
                                    alt="home"
                                    sizes="(min-width: 0px) and (max-width: 1920px) 400vw"
                                    objectFit="contain"
                                    sx={{
                                      width: "auto!important",
                                      height: "auto!important",
                                      objectFit: "contain",
                                      backgroundSize: "contain",
                                      "&.MuiCard-root": {
                                        borderRadius: 0,
                                        boxShadow: "none",
                                        position: "relative!important",
                                        width: "max-content!important",
                                        height: "100%!important",
                                      },
                                    }}
                                  />
                                </Box>
                                {countryInfo &&
                                  countryInfo?.SCN_DEL_PROMPT_MSG_YN == "Y" &&
                                  countryInfo?.SCN_DEL_PROMPT_MSG ? (
                                  <Box component="div">
                                    <Typography
                                      component="p"
                                      variant="typography16"
                                      pt={2}
                                      letterSpacing={0}
                                      color="primary"
                                      fontFamily={(theme) =>
                                        theme.fontFaces.helveticaNeue
                                      }
                                    >
                                      {parse(countryInfo.SCN_DEL_PROMPT_MSG)}
                                    </Typography>
                                  </Box>
                                ) : (
                                  ""
                                )}
                                <Box>
                                  <Typography
                                    fontFamily={(theme) =>
                                      theme.fontFaces.helveticaNeueLight
                                    }
                                  >
                                    {translate("Plannedshipping", {
                                      business_day: business_day,
                                      delivery_days: delivery_days,
                                    })}
                                  </Typography>
                                </Box>
                              </Stack>
                            </Grid>
                          </Grid>
                        );
                      }
                    )}
                </Box>
              );
            }
          )}

        <Box my={4} sx={{ textAlign: "left", width: "100%" }}>
          {cartPopupData?.complete?.length > 0 &&
            Object.keys(data?.shipment_list || {})?.length > 0 &&
            shipping_price ? (
            <CustomLink
              link={`/modification/shipping?head_sys_id=${cart?.header_info?.SOH_SYS_ID}`}
            >
              <Button
                fullWidth={false}
                variant="contained"
                color="dark"
                sx={{
                  color: "common.white",
                  "&.MuiButton-root": {
                    color: "common.white",
                    padding: "10px 32px",
                    width: "150px",
                    borderRadius: "0px!important",
                    fontSize: "16px",
                    fontFamily: (theme) => theme.fontFaces.helveticaNeue,
                    fontWeight: 300,
                  },
                }}
              >
                {translate("Back")}
              </Button>
            </CustomLink>
          ) : (
            <OutOfCoverageArea href="/cartPage" />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Shipment;
